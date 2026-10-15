/**
 * Web Audio API Recorder utility with real-time audio volume visualizer
 */

export interface RecordedAudioResult {
  base64: string;
  mimeType: string;
  durationMs: number;
  blob: Blob;
}

export class AudioRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private stream: MediaStream | null = null;
  private audioCtx: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private animFrameId: number | null = null;
  private startTime: number = 0;

  public isRecording: boolean = false;

  public async startRecording(
    onAudioLevel?: (level: number) => void
  ): Promise<void> {
    this.audioChunks = [];
    this.startTime = Date.now();

    // Request microphone access
    this.stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      },
    });

    // Setup AudioContext for live volume meter
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.audioCtx = new AudioCtx();
      const source = this.audioCtx.createMediaStreamSource(this.stream);
      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 256;
      source.connect(this.analyser);

      if (onAudioLevel) {
        const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
        const updateLevel = () => {
          if (!this.isRecording || !this.analyser) return;
          this.analyser.getByteFrequencyData(dataArray);
          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i];
          }
          const average = sum / dataArray.length;
          // Normalized 0 to 1
          onAudioLevel(Math.min(1, average / 128));
          this.animFrameId = requestAnimationFrame(updateLevel);
        };
        updateLevel();
      }
    } catch (e) {
      console.warn("AudioContext visualization not available:", e);
    }

    // Determine supported mime type
    let mimeType = "audio/webm";
    if (MediaRecorder.isTypeSupported("audio/webm;codecs=opus")) {
      mimeType = "audio/webm;codecs=opus";
    } else if (MediaRecorder.isTypeSupported("audio/mp4")) {
      mimeType = "audio/mp4";
    }

    this.mediaRecorder = new MediaRecorder(this.stream, { mimeType });

    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        this.audioChunks.push(event.data);
      }
    };

    this.mediaRecorder.start(100); // 100ms slice
    this.isRecording = true;
  }

  public async stopRecording(): Promise<RecordedAudioResult> {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder) {
        reject(new Error("Recorder not active"));
        return;
      }

      this.isRecording = false;
      if (this.animFrameId) {
        cancelAnimationFrame(this.animFrameId);
        this.animFrameId = null;
      }

      this.mediaRecorder.onstop = async () => {
        const durationMs = Date.now() - this.startTime;
        const mimeType = this.mediaRecorder?.mimeType || "audio/webm";
        const audioBlob = new Blob(this.audioChunks, { type: mimeType });

        // Cleanup stream tracks
        if (this.stream) {
          this.stream.getTracks().forEach((track) => track.stop());
          this.stream = null;
        }
        if (this.audioCtx) {
          this.audioCtx.close().catch(() => {});
          this.audioCtx = null;
        }

        // Convert blob to base64
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          const base64 = result.split(",")[1];
          resolve({
            base64,
            mimeType,
            durationMs,
            blob: audioBlob,
          });
        };
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(audioBlob);
      };

      this.mediaRecorder.stop();
    });
  }

  public cancel(): void {
    this.isRecording = false;
    if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
    if (this.mediaRecorder && this.mediaRecorder.state !== "inactive") {
      try {
        this.mediaRecorder.stop();
      } catch (_) {}
    }
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }
    if (this.audioCtx) {
      this.audioCtx.close().catch(() => {});
      this.audioCtx = null;
    }
  }
}

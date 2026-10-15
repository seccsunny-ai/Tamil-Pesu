/**
 * Audio Player utility for Gemini TTS WAV playback and fallback
 */

class AudioPlaybackService {
  private currentAudio: HTMLAudioElement | null = null;
  private currentUrl: string | null = null;

  /**
   * Play base64 WAV/MP3 audio with controllable speed
   */
  public async playBase64Audio(
    base64Data: string,
    mimeType: string = "audio/wav",
    playbackRate: number = 1.0,
    onEnded?: () => void
  ): Promise<void> {
    this.stop();

    try {
      const audioSrc = `data:${mimeType};base64,${base64Data}`;
      const audio = new Audio(audioSrc);
      audio.playbackRate = playbackRate;
      this.currentAudio = audio;

      return new Promise((resolve, reject) => {
        audio.onended = () => {
          if (onEnded) onEnded();
          resolve();
        };
        audio.onerror = (e) => {
          console.error("Audio playback error:", e);
          reject(new Error("Failed to play audio"));
        };
        audio.play().catch(reject);
      });
    } catch (err) {
      console.error("Playback setup failed:", err);
      throw err;
    }
  }

  /**
   * Synthesize and play phrase from the server API
   */
  public async speakPhrase(
    text: string,
    playbackRate: number = 1.0,
    voiceName: string = "Kore"
  ): Promise<{ audioBase64: string; mimeType: string }> {
    const response = await fetch("/api/speak-tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        voiceName,
        speakerStyle: "Clear native South Indian Tamil speaker, warm and authentic tone",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to fetch speech audio");
    }

    const data = await response.json();
    await this.playBase64Audio(data.audioBase64, data.mimeType, playbackRate);
    return data;
  }

  /**
   * Browser SpeechSynthesis fallback if offline or no key
   */
  public speakFallback(text: string, rate: number = 0.9): Promise<void> {
    return new Promise((resolve) => {
      if (!("speechSynthesis" in window)) {
        resolve();
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate;
      // Try to find a Tamil or Indian English voice if available
      const voices = window.speechSynthesis.getVoices();
      const indianVoice =
        voices.find((v) => v.lang.includes("ta") || v.lang.includes("IN")) ||
        voices[0];
      if (indianVoice) utterance.voice = indianVoice;

      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();
      window.speechSynthesis.speak(utterance);
    });
  }

  public stop(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
    if (this.currentUrl) {
      URL.revokeObjectURL(this.currentUrl);
      this.currentUrl = null;
    }
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const audioPlayer = new AudioPlaybackService();

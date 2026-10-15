import React, { useState, useRef, useEffect } from "react";
import { MODULES, VoicePracticeItem } from "../data/curriculum";
import { audioPlayer } from "../utils/audioPlayer";
import { AudioRecorder, RecordedAudioResult } from "../utils/audioRecorder";
import { AudioWaveVisualizer } from "./AudioWaveVisualizer";
import {
  Mic,
  Square,
  Volume2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Play,
  Lightbulb,
  Award,
  ChevronRight,
  Flame,
} from "lucide-react";

interface VoiceEvaluationResult {
  score: number;
  spokenTranscript: string;
  accuracyRating: "Excellent" | "Good" | "Needs Practice";
  phonemeFeedback: {
    sound: string;
    status: "perfect" | "acceptable" | "needs_work";
    note: string;
  }[];
  praise: string;
  coachingTip: string;
}

interface VoiceLabProps {
  initialPhrase?: {
    tamilPhonetic: string;
    english: string;
    soundTip?: string;
    context?: string;
  } | null;
  onRecordSuccess?: (score: number) => void;
}

export const VoiceLab: React.FC<VoiceLabProps> = ({
  initialPhrase,
  onRecordSuccess,
}) => {
  // Aggregate all voice practice items from modules
  const allPhrases: VoicePracticeItem[] = React.useMemo(() => {
    return MODULES.flatMap((m) => m.voicePractice);
  }, []);

  const [selectedPhrase, setSelectedPhrase] = useState<VoicePracticeItem>(
    allPhrases[0]
  );

  useEffect(() => {
    if (initialPhrase) {
      const match = allPhrases.find(
        (p) => p.tamilPhonetic === initialPhrase.tamilPhonetic
      );
      if (match) {
        setSelectedPhrase(match);
      } else {
        setSelectedPhrase({
          id: "custom-" + Date.now(),
          tamilPhonetic: initialPhrase.tamilPhonetic,
          english: initialPhrase.english,
          phoneticBreakdown: initialPhrase.tamilPhonetic,
          keyPhonemes: ["Colloquial cadence", "Native vowels"],
          soundTip: initialPhrase.soundTip || "Speak naturally with relaxed jaw.",
          context: initialPhrase.context || "Dialogue practice",
        });
      }
    }
  }, [initialPhrase, allPhrases]);

  const [isRecording, setIsRecording] = useState(false);
  const [recordingLevel, setRecordingLevel] = useState(0);
  const [isPlayingReference, setIsPlayingReference] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [userRecording, setUserRecording] = useState<RecordedAudioResult | null>(null);
  const [isPlayingUserAudio, setIsPlayingUserAudio] = useState(false);
  const [evaluation, setEvaluation] = useState<VoiceEvaluationResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const recorderRef = useRef<AudioRecorder | null>(null);

  useEffect(() => {
    return () => {
      if (recorderRef.current) recorderRef.current.cancel();
      audioPlayer.stop();
    };
  }, []);

  // Listen to reference audio
  const handlePlayReference = async () => {
    try {
      setIsPlayingReference(true);
      setErrorMsg(null);
      await audioPlayer.speakPhrase(selectedPhrase.tamilPhonetic, playbackRate);
    } catch (err: any) {
      console.warn("TTS fallback used in VoiceLab:", err);
      await audioPlayer.speakFallback(selectedPhrase.tamilPhonetic, playbackRate);
    } finally {
      setIsPlayingReference(false);
    }
  };

  // Start microphone recording
  const handleStartRecord = async () => {
    try {
      setErrorMsg(null);
      setEvaluation(null);
      setUserRecording(null);

      const recorder = new AudioRecorder();
      recorderRef.current = recorder;

      await recorder.startRecording((level) => {
        setRecordingLevel(level);
      });

      setIsRecording(true);
    } catch (err: any) {
      console.error("Microphone access failed:", err);
      setErrorMsg(
        err.name === "NotAllowedError"
          ? "Microphone access was denied. Please allow microphone permissions in your browser."
          : "Could not access microphone: " + (err.message || "Unknown error")
      );
      setIsRecording(false);
    }
  };

  // Stop recording and send to Gemini audio evaluation API
  const handleStopRecord = async () => {
    if (!recorderRef.current || !isRecording) return;

    try {
      setIsRecording(false);
      setIsEvaluating(true);
      setRecordingLevel(0);

      const recordingResult = await recorderRef.current.stopRecording();
      setUserRecording(recordingResult);

      // Call server evaluation API
      const response = await fetch("/api/evaluate-speech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          audioBase64: recordingResult.base64,
          mimeType: recordingResult.mimeType,
          targetPhrase: selectedPhrase.tamilPhonetic,
          expectedPhonetics: selectedPhrase.phoneticBreakdown,
          context: selectedPhrase.context,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to analyze speech");
      }

      const evalData: VoiceEvaluationResult = await response.json();
      setEvaluation(evalData);

      if (onRecordSuccess && evalData.score) {
        onRecordSuccess(evalData.score);
      }
    } catch (err: any) {
      console.error("Speech evaluation failed:", err);
      setErrorMsg(
        err.message || "Failed to evaluate speech. Please try recording again."
      );
    } finally {
      setIsEvaluating(false);
    }
  };

  // Play user's recorded audio
  const handlePlayUserAudio = () => {
    if (!userRecording) return;
    try {
      setIsPlayingUserAudio(true);
      const url = URL.createObjectURL(userRecording.blob);
      const audio = new Audio(url);
      audio.onended = () => {
        setIsPlayingUserAudio(false);
        URL.revokeObjectURL(url);
      };
      audio.onerror = () => setIsPlayingUserAudio(false);
      audio.play();
    } catch (e) {
      setIsPlayingUserAudio(false);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-stone-900 to-amber-950 text-white rounded-2xl shadow-sm space-y-2">
        <div className="flex items-center gap-2 text-xs font-medium text-amber-400">
          <Sparkles className="w-4 h-4" />
          <span>Gemini Multimodal Audio Analysis</span>
          <span>·</span>
          <span>South Indian Pronunciation Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display">
          Spoken Tamil Voice Lab
        </h1>
        <p className="text-sm text-stone-300 max-w-2xl leading-relaxed">
          Practice authentic spoken Tamil cadence. Our AI audio model assesses your 
          retroflex tongue position (`zh`, `l`, `n`), vowel elongation, and gemination in real time.
        </p>
      </div>

      {/* Main Studio Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Active Practice Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
            {/* Phrase Display */}
            <div>
              <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>Target Phrase</span>
                <span className="text-stone-400 font-normal normal-case">
                  {selectedPhrase.context}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display leading-tight">
                {selectedPhrase.tamilPhonetic}
              </h2>
              <p className="text-sm text-stone-600 mt-1 italic">
                "{selectedPhrase.english}"
              </p>
            </div>

            {/* Syllable Breakdown */}
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/80 space-y-2">
              <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Syllable Breakdown
              </div>
              <div className="text-base font-mono font-medium text-amber-950 tracking-wide">
                {selectedPhrase.phoneticBreakdown}
              </div>
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {selectedPhrase.keyPhonemes.map((ph, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-100/70 text-amber-900 border border-amber-200"
                  >
                    {ph}
                  </span>
                ))}
              </div>
            </div>

            {/* Sound Coach Tip */}
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/50 text-xs text-amber-950">
              <Lightbulb className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Pronunciation Key: </span>
                <span>{selectedPhrase.soundTip}</span>
              </div>
            </div>

            {/* Reference Audio Player Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-stone-100/70 border border-stone-200">
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePlayReference}
                  disabled={isPlayingReference || isRecording}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm shadow-xs transition-all ${
                    isPlayingReference
                      ? "bg-amber-600 text-white animate-pulse"
                      : "bg-white text-stone-900 hover:bg-stone-50 border border-stone-300"
                  }`}
                >
                  <Volume2 className="w-4 h-4 text-amber-700" />
                  <span>{isPlayingReference ? "Speaking..." : "Native Reference"}</span>
                </button>
              </div>

              {/* Speed Controller */}
              <div className="flex items-center gap-1 text-xs text-stone-500">
                <span className="font-medium mr-1">Speed:</span>
                {[0.75, 1.0, 1.25].map((speed) => (
                  <button
                    key={speed}
                    onClick={() => setPlaybackRate(speed)}
                    className={`px-2 py-1 rounded text-xs font-mono transition-colors ${
                      playbackRate === speed
                        ? "bg-amber-800 text-white font-bold"
                        : "bg-white text-stone-700 hover:bg-stone-200 border border-stone-200"
                    }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            </div>

            {/* Live Audio Visualizer */}
            <div className="space-y-3">
              <AudioWaveVisualizer
                isRecording={isRecording}
                level={recordingLevel}
              />
            </div>

            {/* Microphone Action Control */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              {!isRecording ? (
                <button
                  onClick={handleStartRecord}
                  disabled={isEvaluating}
                  className="w-full sm:w-auto min-w-[200px] h-14 px-8 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-base shadow-md hover:shadow-lg flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
                >
                  <Mic className="w-5 h-5 text-white" />
                  <span>Tap to Record Voice</span>
                </button>
              ) : (
                <button
                  onClick={handleStopRecord}
                  className="w-full sm:w-auto min-w-[200px] h-14 px-8 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-bold text-base shadow-md flex items-center justify-center gap-3 transition-all animate-pulse"
                >
                  <Square className="w-5 h-5 text-red-500 fill-current" />
                  <span>Stop &amp; Analyze</span>
                </button>
              )}

              {userRecording && !isRecording && (
                <button
                  onClick={handlePlayUserAudio}
                  disabled={isPlayingUserAudio}
                  className="w-full sm:w-auto h-12 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium text-xs flex items-center justify-center gap-2 transition-colors border border-stone-200"
                >
                  <Play className="w-4 h-4 text-stone-600" />
                  <span>{isPlayingUserAudio ? "Playing You..." : "Listen to My Voice"}</span>
                </button>
              )}
            </div>

            {/* Loading Status */}
            {isEvaluating && (
              <div className="flex items-center justify-center gap-3 py-6 text-sm font-medium text-amber-800 animate-pulse bg-amber-50/50 rounded-xl">
                <Sparkles className="w-5 h-5 text-amber-600 animate-spin" />
                <span>Gemini is evaluating your pronunciation accuracy &amp; retroflex sounds...</span>
              </div>
            )}

            {/* Error Message */}
            {errorMsg && (
              <div className="flex items-start gap-2.5 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* EVALUATION RESULT CARD */}
            {evaluation && !isEvaluating && (
              <div className="border border-stone-200 rounded-2xl p-6 bg-stone-50/50 space-y-5 animate-in fade-in duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-mono font-bold text-xl shadow-xs ${
                        evaluation.score >= 85
                          ? "bg-emerald-600"
                          : evaluation.score >= 70
                          ? "bg-amber-600"
                          : "bg-orange-600"
                      }`}
                    >
                      {evaluation.score}%
                    </div>
                    <div>
                      <div className="text-xs text-stone-500 font-medium uppercase tracking-wider">
                        Accuracy Rating
                      </div>
                      <div className="text-lg font-bold text-stone-900 font-display">
                        {evaluation.accuracyRating}
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-stone-600 italic bg-white p-3 rounded-xl border border-stone-200 sm:max-w-xs">
                    "{evaluation.praise}"
                  </div>
                </div>

                {/* Transcribed Student Speech */}
                <div>
                  <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
                    What Gemini Heard:
                  </div>
                  <div className="text-sm font-mono p-3 bg-white rounded-lg border border-stone-200 text-stone-800">
                    {evaluation.spokenTranscript || "(Could not clearly parse words)"}
                  </div>
                </div>

                {/* Detailed Phoneme Breakdown */}
                {evaluation.phonemeFeedback && evaluation.phonemeFeedback.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                      Phonetic Analysis Breakdown
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {evaluation.phonemeFeedback.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start justify-between gap-3 p-3 bg-white rounded-lg border border-stone-200 text-xs"
                        >
                          <div>
                            <span className="font-bold text-stone-900 block">
                              {item.sound}
                            </span>
                            <span className="text-stone-600 mt-0.5 block">
                              {item.note}
                            </span>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase shrink-0 ${
                              item.status === "perfect"
                                ? "bg-emerald-100 text-emerald-800"
                                : item.status === "acceptable"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-rose-100 text-rose-800"
                            }`}
                          >
                            {item.status.replace("_", " ")}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Coaching Tip */}
                <div className="p-4 rounded-xl bg-amber-100/60 border border-amber-200 text-xs text-amber-950 space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-amber-900">
                    <Award className="w-4 h-4 text-amber-700" />
                    <span>Native Speaker Coaching Advice</span>
                  </div>
                  <p className="leading-relaxed">{evaluation.coachingTip}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Col: Phrase Library Picker */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs">
            <h3 className="text-base font-bold text-stone-900 font-display mb-1">
              Practice Phrasebook
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              Select any core phrase from the curriculum to practice:
            </p>

            <div className="space-y-2 max-h-[560px] overflow-y-auto pr-1">
              {allPhrases.map((phrase) => {
                const isSelected = selectedPhrase.id === phrase.id;
                return (
                  <button
                    key={phrase.id}
                    onClick={() => {
                      setSelectedPhrase(phrase);
                      setEvaluation(null);
                      setUserRecording(null);
                      setErrorMsg(null);
                    }}
                    className={`w-full p-3 rounded-xl text-left transition-all border ${
                      isSelected
                        ? "bg-amber-50 border-amber-500 shadow-2xs"
                        : "bg-stone-50/60 hover:bg-stone-100 border-stone-200/80"
                    }`}
                  >
                    <div className="text-xs font-semibold text-stone-900 font-display line-clamp-1">
                      {phrase.tamilPhonetic}
                    </div>
                    <div className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                      {phrase.english}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import { ModuleData, DialogueLine, DrillItem } from "../data/curriculum";
import { audioPlayer } from "../utils/audioPlayer";
import {
  ArrowLeft,
  Volume2,
  Mic,
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  Sparkles,
  BookA,
  Lightbulb,
} from "lucide-react";

interface LessonDetailProps {
  module: ModuleData;
  initialSection?: "dialogue" | "drills" | "conversions";
  onBack: () => void;
  onOpenVoiceLab: (phrase: {
    tamilPhonetic: string;
    english: string;
    soundTip?: string;
    context?: string;
  }) => void;
  onDrillComplete: (drillId: string) => void;
}

export const LessonDetail: React.FC<LessonDetailProps> = ({
  module,
  initialSection = "dialogue",
  onBack,
  onOpenVoiceLab,
  onDrillComplete,
}) => {
  const [activeTab, setActiveTab] = useState<"dialogue" | "drills" | "conversions">(
    initialSection
  );
  const [playingLineId, setPlayingLineId] = useState<string | null>(null);
  const [drillAnswers, setDrillAnswers] = useState<Record<string, string>>({});
  const [drillFeedback, setDrillFeedback] = useState<
    Record<string, { isCorrect: boolean; showExplanation: boolean }>
  >({});
  const [ttsSpeed, setTtsSpeed] = useState<number>(1.0);

  // Play dialogue line audio using Gemini TTS
  const handlePlayLine = async (line: DialogueLine) => {
    try {
      setPlayingLineId(line.id);
      await audioPlayer.speakPhrase(line.tamilPhonetic, ttsSpeed);
    } catch (err) {
      console.warn("TTS fallback used for line:", line.id);
      await audioPlayer.speakFallback(line.tamilPhonetic, ttsSpeed);
    } finally {
      setPlayingLineId(null);
    }
  };

  const handleSelectDrillOption = (drillId: string, selectedOption: string) => {
    setDrillAnswers((prev) => ({ ...prev, [drillId]: selectedOption }));
  };

  const handleCheckDrill = (drill: DrillItem) => {
    const selected = drillAnswers[drill.id];
    if (!selected) return;

    const isCorrect = selected === drill.correctAnswer;
    setDrillFeedback((prev) => ({
      ...prev,
      [drill.id]: { isCorrect, showExplanation: true },
    }));

    if (isCorrect) {
      onDrillComplete(drill.id);
    }
  };

  const handleResetDrill = (drillId: string) => {
    setDrillAnswers((prev) => {
      const copy = { ...prev };
      delete copy[drillId];
      return copy;
    });
    setDrillFeedback((prev) => {
      const copy = { ...prev };
      delete copy[drillId];
      return copy;
    });
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Top Header & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-lg bg-white border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-colors shadow-2xs"
            aria-label="Back to all modules"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-800 font-semibold">
              <span>Module {module.number}</span>
              <span>·</span>
              <span className="text-stone-500 font-normal">{module.badge}</span>
            </div>
            <h1 className="text-2xl font-bold text-stone-900 font-display">
              {module.title}
            </h1>
          </div>
        </div>

        {/* Playback speed toggle */}
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-stone-200 text-xs text-stone-600">
          <span className="font-medium text-stone-500">Audio Speed:</span>
          {[0.75, 1.0, 1.25].map((speed) => (
            <button
              key={speed}
              onClick={() => setTtsSpeed(speed)}
              className={`px-2 py-0.5 rounded text-xs font-mono transition-colors ${
                ttsSpeed === speed
                  ? "bg-amber-800 text-white font-semibold"
                  : "text-stone-600 hover:bg-stone-100"
              }`}
            >
              {speed}x
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1 bg-stone-100/80 rounded-xl border border-stone-200/80">
        <button
          onClick={() => setActiveTab("dialogue")}
          className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
            activeTab === "dialogue"
              ? "bg-white text-stone-900 shadow-xs"
              : "text-stone-600 hover:text-stone-900"
          }`}
        >
          Situational Dialogue
        </button>

        <button
          onClick={() => setActiveTab("drills")}
          className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
            activeTab === "drills"
              ? "bg-white text-stone-900 shadow-xs"
              : "text-stone-600 hover:text-stone-900"
          }`}
        >
          Interactive Drills ({module.drills.length})
        </button>

        <button
          onClick={() => setActiveTab("conversions")}
          className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
            activeTab === "conversions"
              ? "bg-white text-stone-900 shadow-xs"
              : "text-stone-600 hover:text-stone-900"
          }`}
        >
          Spoken Rules ({module.conversions.length})
        </button>
      </div>

      {/* TAB 1: DIALOGUE VIEW */}
      {activeTab === "dialogue" && (
        <div className="space-y-6">
          <div className="p-4 sm:p-5 bg-amber-50/60 rounded-xl border border-amber-200/60">
            <h2 className="text-base font-bold text-stone-900 font-display flex items-center gap-2">
              <span>{module.dialogueTitle}</span>
            </h2>
            <p className="text-xs text-stone-600 mt-1">
              {module.dialogueContext} Listen to native spoken pronunciation and practice each line.
            </p>
          </div>

          <div className="space-y-4">
            {module.dialogue.map((line, index) => {
              const isPlaying = playingLineId === line.id;
              return (
                <div
                  key={line.id}
                  className="bg-white rounded-xl border border-stone-200/80 p-5 shadow-2xs hover:border-amber-300 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl" role="img" aria-label={line.speaker}>
                        {line.avatar}
                      </span>
                      <div>
                        <div className="text-xs font-semibold text-stone-500">
                          {line.speaker}
                        </div>
                        <div className="text-lg font-bold text-stone-900 font-display">
                          {line.tamilPhonetic}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handlePlayLine(line)}
                        disabled={isPlaying}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          isPlaying
                            ? "bg-amber-600 text-white animate-pulse"
                            : "bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-amber-900"
                        }`}
                        title="Listen to native voice"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>{isPlaying ? "Playing..." : "Listen"}</span>
                      </button>

                      <button
                        onClick={() =>
                          onOpenVoiceLab({
                            tamilPhonetic: line.tamilPhonetic,
                            english: line.english,
                            soundTip: line.pronunciationTip,
                            context: `${module.title}: ${line.speaker}'s line`,
                          })
                        }
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200/60 transition-colors"
                        title="Practice speaking with AI scoring"
                      >
                        <Mic className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Score Mic</span>
                      </button>
                    </div>
                  </div>

                  <div className="text-sm text-stone-600 pl-10 border-l-2 border-amber-200/70">
                    {line.english}
                  </div>

                  {line.breakdown && (
                    <div className="text-xs font-mono text-stone-500 bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                      <span className="font-semibold text-amber-800">Grammar Anatomy: </span>
                      {line.breakdown}
                    </div>
                  )}

                  {line.pronunciationTip && (
                    <div className="flex items-start gap-2 text-xs text-amber-900 bg-amber-50/70 p-2.5 rounded-lg border border-amber-200/40">
                      <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{line.pronunciationTip}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: INTERACTIVE DRILLS */}
      {activeTab === "drills" && (
        <div className="space-y-6">
          <div className="p-4 sm:p-5 bg-stone-100 rounded-xl border border-stone-200">
            <h2 className="text-base font-bold text-stone-900 font-display">
              Textbook Pattern Drills &amp; Substitution Training
            </h2>
            <p className="text-xs text-stone-600 mt-1">
              Directly based on CIIL and Shanmugam Pillai drill methodologies. Test and consolidate your spoken grammar reflex.
            </p>
          </div>

          <div className="space-y-6">
            {module.drills.map((drill, index) => {
              const selectedAnswer = drillAnswers[drill.id];
              const feedback = drillFeedback[drill.id];

              return (
                <div
                  key={drill.id}
                  className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs space-y-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">
                        Drill {index + 1} · {drill.type}
                      </div>
                      <div className="text-sm font-semibold text-stone-800">
                        {drill.instruction}
                      </div>
                    </div>
                  </div>

                  {/* Base Sentence and Prompt Cue */}
                  <div className="bg-stone-50 p-3 rounded-lg border border-stone-200/70 space-y-1">
                    <div className="text-xs text-stone-500 font-medium">Model Sentence:</div>
                    <div className="text-base font-bold text-stone-900 font-display">
                      {drill.baseSentence}
                    </div>
                    {drill.promptCue && (
                      <div className="text-xs text-amber-800 font-medium pt-1">
                        Cue: {drill.promptCue}
                      </div>
                    )}
                  </div>

                  {/* Options */}
                  {drill.options && (
                    <div className="space-y-2">
                      <div className="text-xs font-medium text-stone-500">
                        Choose the correct spoken Tamil form:
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {drill.options.map((opt) => {
                          const isSelected = selectedAnswer === opt;
                          return (
                            <button
                              key={opt}
                              onClick={() => handleSelectDrillOption(drill.id, opt)}
                              className={`p-3 rounded-lg text-left text-sm font-medium transition-all border flex items-center justify-between ${
                                isSelected
                                  ? "bg-amber-50 border-amber-600 text-amber-950 font-semibold"
                                  : "bg-white border-stone-200 hover:border-stone-300 text-stone-800"
                              }`}
                            >
                              <span>{opt}</span>
                              <div
                                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                  isSelected
                                    ? "border-amber-600 bg-amber-600 text-white"
                                    : "border-stone-300"
                                }`}
                              >
                                {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Controls & Feedback */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => handleCheckDrill(drill)}
                      disabled={!selectedAnswer}
                      className="px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs disabled:opacity-40 transition-colors"
                    >
                      Check Answer
                    </button>
                    {feedback && (
                      <button
                        onClick={() => handleResetDrill(drill.id)}
                        className="p-2 text-stone-500 hover:text-stone-800 transition-colors"
                        title="Retry drill"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Result Banner */}
                  {feedback && (
                    <div
                      className={`p-4 rounded-lg text-xs leading-relaxed space-y-1 ${
                        feedback.isCorrect
                          ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
                          : "bg-rose-50 text-rose-900 border border-rose-200"
                      }`}
                    >
                      <div className="font-bold flex items-center gap-1.5">
                        {feedback.isCorrect ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                            <span>Correct! Nallā sonnīnga!</span>
                          </>
                        ) : (
                          <>
                            <HelpCircle className="w-4 h-4 text-rose-700" />
                            <span>Keep practicing! Correct answer: {drill.correctAnswer}</span>
                          </>
                        )}
                      </div>
                      <p className="mt-1">{drill.explanation}</p>
                      <div className="text-[11px] font-medium text-stone-600 pt-1">
                        Meaning: "{drill.englishMeaning}"
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: CONVERSIONS & SPOKEN RULES */}
      {activeTab === "conversions" && (
        <div className="space-y-6">
          <div className="p-4 sm:p-5 bg-stone-100 rounded-xl border border-stone-200">
            <h2 className="text-base font-bold text-stone-900 font-display">
              Literary Tamil to Spoken Tamil Conversions
            </h2>
            <p className="text-xs text-stone-600 mt-1">
              Directly synthesized from Dr. Renganathan's "Conversion: Written &gt; Spoken" appendix and Prof. Shanmugam Pillai's grammar notes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {module.conversions.map((rule, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs space-y-3"
              >
                <div className="text-xs font-bold text-amber-800 uppercase tracking-wide">
                  Rule {idx + 1}: {rule.ruleName}
                </div>

                <div className="grid grid-cols-2 gap-2 bg-stone-50 p-2.5 rounded-lg border border-stone-200/60 text-xs">
                  <div>
                    <span className="text-[10px] text-stone-400 font-mono block">WRITTEN / LITERARY</span>
                    <span className="font-semibold text-stone-700">{rule.literaryForm}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-amber-700 font-mono block">COLLOQUIAL SPOKEN</span>
                    <span className="font-bold text-amber-900">{rule.spokenForm}</span>
                  </div>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed">
                  {rule.explanation}
                </p>

                <div className="bg-amber-50/50 p-2.5 rounded-lg border border-amber-100 text-xs">
                  <div className="font-semibold text-stone-900">{rule.exampleSentence}</div>
                  <div className="text-stone-500 italic mt-0.5">{rule.englishMeaning}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

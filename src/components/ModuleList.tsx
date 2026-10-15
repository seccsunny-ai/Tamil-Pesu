import React from "react";
import { MODULES, ModuleData } from "../data/curriculum";
import { ChevronRight, Play, CheckCircle2, Mic, ArrowRight, BookOpen, Sparkles } from "lucide-react";

interface ModuleListProps {
  onSelectModule: (moduleId: string, section?: "dialogue" | "drills" | "conversions") => void;
  onOpenVoiceLabForPhrase: (phrase: any) => void;
  completedModules: string[];
}

export const ModuleList: React.FC<ModuleListProps> = ({
  onSelectModule,
  onOpenVoiceLabForPhrase,
  completedModules,
}) => {
  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner / Introduction */}
      <div className="relative rounded-2xl bg-gradient-to-r from-amber-950 via-stone-900 to-amber-900 text-white p-6 sm:p-10 shadow-md overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-medium">
            <span>Authoritative Academic Pedagogy</span>
            <span>·</span>
            <span>Renganathan &amp; Shanmugam Pillai &amp; CIIL</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
            Speak Spoken Tamil Like a Native South Indian
          </h1>

          <p className="text-stone-300 text-base sm:text-lg leading-relaxed font-body">
            Master colloquial, everyday Tamil spoken on the streets of Chennai, Madurai, and Coimbatore. 
            Trained with Romanized phonetic transliteration for immediate conversational fluency and real-time AI pronunciation feedback.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onSelectModule(MODULES[0].id, "dialogue")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm shadow-sm transition-all"
            >
              <span>Start Module 1</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="text-xs text-stone-400 flex items-center gap-2">
              <span>6 Progressive Scenarios</span>
              <span>·</span>
              <span>50+ Interactive Drills</span>
              <span>·</span>
              <span>Gemini Audio AI Coach</span>
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum Path Section */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-stone-900 font-display">
              Situational Learning Journey
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              Follow this structured sequence to build natural colloquial speech patterns step by step.
            </p>
          </div>
          <div className="text-xs font-mono text-stone-500 bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-200">
            Progress: {completedModules.length} / {MODULES.length} Modules Completed
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODULES.map((module: ModuleData) => {
            const isCompleted = completedModules.includes(module.id);
            return (
              <div
                key={module.id}
                className="flex flex-col justify-between bg-white rounded-xl border border-stone-200/90 shadow-xs hover:shadow-md transition-all p-6 group"
              >
                <div>
                  {/* Top Meta */}
                  <div className="flex items-center justify-between gap-2 text-xs text-stone-500 mb-3">
                    <span className="font-semibold text-amber-800">
                      Module {module.number}
                    </span>
                    <span className="text-stone-300">·</span>
                    <span className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded text-[11px] font-medium">
                      {module.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-stone-900 group-hover:text-amber-800 transition-colors font-display mb-1.5">
                    {module.title}
                  </h3>

                  <p className="text-xs font-medium text-amber-900/80 mb-3">
                    {module.tagline}
                  </p>

                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-3 mb-4">
                    {module.description}
                  </p>

                  {/* Textbook provenance note */}
                  <div className="text-[11px] font-mono text-stone-500 border-t border-stone-100 pt-2 mb-4">
                    Source: {module.textbookRef}
                  </div>
                </div>

                <div className="space-y-2 border-t border-stone-100 pt-4">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onSelectModule(module.id, "dialogue")}
                      className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-stone-500" />
                      <span>Dialogue</span>
                    </button>

                    <button
                      onClick={() => onSelectModule(module.id, "drills")}
                      className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors border border-amber-200/60"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" />
                      <span>Drills ({module.drills.length})</span>
                    </button>
                  </div>

                  <button
                    onClick={() => onSelectModule(module.id, "dialogue")}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-stone-600 hover:text-amber-800 hover:bg-amber-50/50 rounded-lg transition-colors group/btn"
                  >
                    <span>Practice Pronunciation</span>
                    <ChevronRight className="w-4 h-4 text-stone-400 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

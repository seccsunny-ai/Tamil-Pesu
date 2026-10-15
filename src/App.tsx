import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { ModuleList } from "./components/ModuleList";
import { LessonDetail } from "./components/LessonDetail";
import { VoiceLab } from "./components/VoiceLab";
import { RoleplayView } from "./components/RoleplayView";
import { SandhiGuide } from "./components/SandhiGuide";
import { PhrasebookView } from "./components/PhrasebookView";
import { MODULES, ModuleData } from "./data/curriculum";
import { BookOpen, Mic, MessageSquare, BookA, Volume2, Sparkles, Trophy } from "lucide-react";

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>("modules");
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [lessonInitialSection, setLessonInitialSection] = useState<
    "dialogue" | "drills" | "conversions"
  >("dialogue");

  // Selected phrase passed to Voice Lab from lesson or phrasebook
  const [voiceLabTargetPhrase, setVoiceLabTargetPhrase] = useState<{
    tamilPhonetic: string;
    english: string;
    soundTip?: string;
    context?: string;
  } | null>(null);

  // Persistence in localStorage
  const [completedModules, setCompletedModules] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("tamizh_completed_modules") || "[]");
    } catch {
      return [];
    }
  });

  const [completedDrills, setCompletedDrills] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("tamizh_completed_drills") || "[]");
    } catch {
      return [];
    }
  });

  const [streakCount, setStreakCount] = useState<number>(() => {
    try {
      return parseInt(localStorage.getItem("tamizh_streak_days") || "3", 10);
    } catch {
      return 3;
    }
  });

  const [bestScore, setBestScore] = useState<number>(() => {
    try {
      return parseInt(localStorage.getItem("tamizh_best_voice_score") || "0", 10);
    } catch {
      return 0;
    }
  });

  const selectedModule: ModuleData | undefined = MODULES.find(
    (m) => m.id === selectedModuleId
  );

  const handleSelectModule = (
    moduleId: string,
    section: "dialogue" | "drills" | "conversions" = "dialogue"
  ) => {
    setSelectedModuleId(moduleId);
    setLessonInitialSection(section);
  };

  const handleBackToModules = () => {
    setSelectedModuleId(null);
  };

  const handleOpenVoiceLab = (phrase: {
    tamilPhonetic: string;
    english: string;
    soundTip?: string;
    context?: string;
  }) => {
    setVoiceLabTargetPhrase(phrase);
    setCurrentTab("voicelab");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDrillComplete = (drillId: string) => {
    if (!completedDrills.includes(drillId)) {
      const next = [...completedDrills, drillId];
      setCompletedDrills(next);
      localStorage.setItem("tamizh_completed_drills", JSON.stringify(next));

      // Check if all drills in current module are complete
      if (selectedModule) {
        const allDrillIds = selectedModule.drills.map((d) => d.id);
        const hasFinishedAll = allDrillIds.every((id) => next.includes(id));
        if (hasFinishedAll && !completedModules.includes(selectedModule.id)) {
          const nextMods = [...completedModules, selectedModule.id];
          setCompletedModules(nextMods);
          localStorage.setItem(
            "tamizh_completed_modules",
            JSON.stringify(nextMods)
          );
        }
      }
    }
  };

  const handleRecordSuccess = (score: number) => {
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem("tamizh_best_voice_score", score.toString());
    }
  };

  const mobileTabs = [
    { id: "modules", label: "Lessons", icon: BookOpen },
    { id: "voicelab", label: "Voice Lab", icon: Mic },
    { id: "roleplay", label: "Roleplay", icon: MessageSquare },
    { id: "sandhi", label: "Spoken Rules", icon: BookA },
    { id: "phrasebook", label: "Phrases", icon: Volume2 },
  ];

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-stone-900 flex flex-col font-body">
      {/* Top Bar Contract Header */}
      <Header
        currentTab={selectedModuleId ? "modules" : currentTab}
        onSelectTab={(tab) => {
          setSelectedModuleId(null);
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        streakCount={streakCount}
        completedDrillsCount={completedDrills.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24 md:pb-12">
        {selectedModuleId && selectedModule ? (
          <LessonDetail
            module={selectedModule}
            initialSection={lessonInitialSection}
            onBack={handleBackToModules}
            onOpenVoiceLab={handleOpenVoiceLab}
            onDrillComplete={handleDrillComplete}
          />
        ) : (
          <>
            {currentTab === "modules" && (
              <ModuleList
                onSelectModule={handleSelectModule}
                onOpenVoiceLabForPhrase={handleOpenVoiceLab}
                completedModules={completedModules}
              />
            )}

            {currentTab === "voicelab" && (
              <VoiceLab
                initialPhrase={voiceLabTargetPhrase}
                onRecordSuccess={handleRecordSuccess}
              />
            )}

            {currentTab === "roleplay" && <RoleplayView />}

            {currentTab === "sandhi" && <SandhiGuide />}

            {currentTab === "phrasebook" && (
              <PhrasebookView onOpenVoiceLab={handleOpenVoiceLab} />
            )}
          </>
        )}
      </main>

      {/* Fixed Mobile Bottom Tab Bar (Pattern 1 from Mobile Touch Guidelines) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/90 pb-safe">
        <div className="grid grid-cols-5 items-center h-16">
          {mobileTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive =
              (selectedModuleId ? "modules" : currentTab) === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setSelectedModuleId(null);
                  setCurrentTab(tab.id);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-colors ${
                  isActive
                    ? "text-amber-800 font-bold"
                    : "text-stone-500 hover:text-stone-800"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-amber-700" : "text-stone-400"}`} />
                <span className="text-[10px] tracking-tight mt-1 truncate max-w-[56px]">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

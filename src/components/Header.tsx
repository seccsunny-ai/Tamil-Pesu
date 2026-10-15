import React from "react";
import { Mic, BookOpen, MessageSquare, BookA, Sparkles, Volume2, Menu, X } from "lucide-react";

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  streakCount: number;
  completedDrillsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  streakCount,
  completedDrillsCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: "modules", label: "Modules", icon: BookOpen },
    { id: "voicelab", label: "Voice Lab", icon: Mic },
    { id: "roleplay", label: "Roleplay", icon: MessageSquare },
    { id: "sandhi", label: "Spoken Rules", icon: BookA },
    { id: "phrasebook", label: "Phrasebook", icon: Volume2 },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-[#E8E1D5] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Wordmark */}
          <a
            href="#modules"
            onClick={(e) => {
              e.preventDefault();
              onSelectTab("modules");
            }}
            className="flex items-center gap-2 group text-decoration-none"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">
              த
            </div>
            <span className="text-xl font-bold tracking-tight text-stone-900 font-display">
              Tamizhppēcu
            </span>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`flex items-center gap-1.5 py-1.5 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                    isActive
                      ? "text-amber-800 border-amber-700 font-semibold"
                      : "text-stone-600 hover:text-stone-900 border-transparent hover:border-stone-300"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-amber-700" : "text-stone-400"}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action & Quick Stats */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-stone-600 bg-amber-100/70 border border-amber-200/80 px-2.5 py-1 rounded-md">
              <span className="text-amber-800 font-semibold">🔥 {streakCount}d streak</span>
              <span className="text-stone-300">·</span>
              <span className="text-stone-700">{completedDrillsCount} drills</span>
            </div>

            <button
              onClick={() => onSelectTab("voicelab")}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-white bg-amber-800 hover:bg-amber-900 rounded-lg shadow-sm transition-all active:scale-[0.98] whitespace-nowrap shrink-0"
            >
              <Mic className="w-3.5 h-3.5" />
              <span>Voice Lab</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-600 hover:text-stone-900 rounded-md focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E8E1D5] bg-[#FBF9F5] px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                  isActive
                    ? "bg-amber-100/80 text-amber-900 font-semibold"
                    : "text-stone-600 hover:bg-stone-100"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-amber-700" : "text-stone-400"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};

import React from "react";

interface AudioWaveVisualizerProps {
  isRecording: boolean;
  level: number; // 0 to 1
}

export const AudioWaveVisualizer: React.FC<AudioWaveVisualizerProps> = ({
  isRecording,
  level,
}) => {
  const bars = 16;

  return (
    <div className="flex items-center justify-center gap-1 h-10 px-4 bg-amber-50/80 dark:bg-stone-900/80 rounded-xl border border-amber-200/60 dark:border-amber-900/40">
      {Array.from({ length: bars }).map((_, i) => {
        // Calculate dynamic height based on sound level and bar position
        const centerOffset = Math.abs(i - bars / 2) / (bars / 2);
        const dynamicHeight = isRecording
          ? Math.max(
              12,
              Math.min(
                36,
                Math.round(level * 36 * (1 - centerOffset * 0.5) + Math.sin(Date.now() / 200 + i) * 6)
              )
            )
          : 6;

        return (
          <div
            key={i}
            className={`w-1 rounded-full transition-all duration-75 ${
              isRecording
                ? "bg-amber-600 dark:bg-amber-400"
                : "bg-amber-300/60 dark:bg-stone-700"
            }`}
            style={{
              height: `${dynamicHeight}px`,
            }}
          />
        );
      })}
    </div>
  );
};

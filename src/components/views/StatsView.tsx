import React from "react";
import type { Class } from "../../types";
import { StatsCard } from "../ui/StatsCard";
import { getCardClass, theme } from "../../theme";

interface StatsViewProps {
  classes: Class[];
  deleteClass: (classId: number) => Promise<void>;
  calculateStats: (classId: number) => {
    present: number;
    total: number;
    percentage: string;
  };
  calculateOverallStats: () => {
    present: number;
    total: number;
    percentage: string;
  };
}

export const StatsView: React.FC<StatsViewProps> = ({
  classes,
  deleteClass,
  calculateStats,
  calculateOverallStats,
}) => {
  const overallStats = calculateOverallStats();

  return (
    <div className="pb-20">
      <div className={`p-4 md:p-6 border-b ${theme.colors.border}`}>
        <h1 className="text-2xl md:text-3xl font-light">Statistics</h1>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-4">
        <div className={`${getCardClass()} p-6 mb-6`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-light">Overall Attendance</h3>
            <span className="text-4xl font-light">
              {overallStats.percentage}%
            </span>
          </div>
          <div className={`flex gap-4 text-sm ${theme.colors.textMuted} mb-3`}>
            <span>Present: {overallStats.present}</span>
            <span>Total: {overallStats.total}</span>
          </div>
          <div className="h-2 bg-neutral-500 overflow-hidden">
            <div
              className={`h-full ${theme.colors.primary} transition-all duration-300`}
              style={{ width: `${overallStats.percentage}%` }}
            ></div>
          </div>
        </div>

        <div className="space-y-3">
          {classes.map((cls) => {
            const stats = calculateStats(cls.id);
            return (
              <StatsCard
                key={cls.id}
                className={cls.name}
                present={stats.present}
                total={stats.total}
                percentage={stats.percentage}
                onDelete={() => {
                  if (confirm(`Delete ${cls.name}?`)) {
                    deleteClass(cls.id);
                  }
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

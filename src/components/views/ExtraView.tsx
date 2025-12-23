import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import type { Class, AttendanceStatus } from "../../types";
import { ClassCard } from "../ui/ClassCard";
import { getCardClass, theme } from "../../theme";

interface ExtraViewProps {
  classes: Class[];
  markAttendance: (classId: number, status: AttendanceStatus) => void;
  getAttendanceStatus: (classId: number) => string | null;
  calculateStats: (classId: number) => {
    present: number;
    total: number;
    percentage: string;
  };
}

export const ExtraView: React.FC<ExtraViewProps> = ({
  classes,
  markAttendance,
  getAttendanceStatus,
  calculateStats,
}) => {
  const [selectedClassId, setSelectedClassId] = useState<number | "">("");

  const selectedClass = classes.find((c) => c.id === selectedClassId);

  return (
    <div className="pb-20">
      <div className={`p-4 md:p-6 border-b border-${theme.colors.border}`}>
        <h1 className="text-2xl md:text-3xl font-light">Extra Class</h1>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-6">
        <div className={`${getCardClass()} mb-6`}>
          <label
            className={`block text-xs text-${theme.colors.textMuted} mb-2 uppercase tracking-widest`}
          >
            Select Class to Log
          </label>
          <select
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(Number(e.target.value))}
            className={`w-full bg-${theme.colors.background} border border-${theme.colors.border} p-3 text-sm focus:outline-none text-${theme.colors.text}`}
          >
            <option value="">-- Choose a Class --</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.name}
              </option>
            ))}
          </select>
        </div>

        {selectedClass ? (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <ClassCard
              className={selectedClass.name}
              present={calculateStats(selectedClass.id).present}
              total={calculateStats(selectedClass.id).total}
              percentage={calculateStats(selectedClass.id).percentage}
              status={getAttendanceStatus(selectedClass.id)}
              onMarkAttendance={(status) =>
                markAttendance(selectedClass.id, status)
              }
            />
            <p
              className={`mt-4 text-xs text-center text-${theme.colors.textMuted}`}
            >
              Marking an extra class adds it to today's attendance records.
            </p>
          </div>
        ) : (
          <div className={`text-center py-20 text-${theme.colors.textMuted}`}>
            <PlusCircle size={40} className="mx-auto mb-4 opacity-20" />
            <p>Pick a class above to log an unscheduled session</p>
          </div>
        )}
      </div>
    </div>
  );
};

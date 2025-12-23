import React from "react";
import type { Class, Schedule, AttendanceStatus } from "../../types";
import { DateSelector } from "../ui/DateSelector";
import { ClassCard } from "../ui/ClassCard";
import { theme } from "../../theme";

interface TodayViewProps {
  selectedDate: Date;
  days: string[];
  classes: Class[];
  schedule: Schedule;
  changeDate: (days: number) => void;
  setShowCalendar: (show: boolean) => void;
  setCurrentView: (view: any) => void;
  markAttendance: (classId: number, status: AttendanceStatus) => void;
  getAttendanceStatus: (classId: number) => string | null;
  calculateStats: (classId: number) => {
    present: number;
    total: number;
    percentage: string;
  };
}

export const TodayView: React.FC<TodayViewProps> = ({
  selectedDate,
  days,
  classes,
  schedule,
  changeDate,
  setShowCalendar,
  setCurrentView,
  markAttendance,
  getAttendanceStatus,
  calculateStats,
}) => {
  const currentDay = days[selectedDate.getDay()];
  const todayClassIds = schedule[currentDay] || [];
  const todaysClasses = classes.filter((cls) => todayClassIds.includes(cls.id));

  return (
    <div className="pb-20">
      <div
        className={`p-4 md:p-6 flex justify-start items-center gap-2 border-b border-[#c5c2c2]`}
      >
        <img className="size-7" src="/favicon.svg" alt="" />
        <h1 className="text-2xl md:text-3xl font-light">BunkHelp</h1>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-4">
        <DateSelector
          selectedDate={selectedDate}
          currentDay={currentDay}
          onPrevDay={() => changeDate(-1)}
          onNextDay={() => changeDate(1)}
          onCalendarClick={() => setShowCalendar(true)}
        />

        {todaysClasses.length === 0 ? (
          <div className={`text-center py-16 ${theme.colors.textMuted}`}>
            <img src="/fuji.svg" className="mx-auto max-w-64 max-h-64" />
            <p className="mb-2">No classes scheduled for {currentDay}</p>
            <button
              onClick={() => setCurrentView("schedule")}
              className={`text-sm ${theme.colors.text} hover:text-neutral-400 underline`}
            >
              Set up your schedule
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {todaysClasses.map((cls) => {
              const stats = calculateStats(cls.id);
              const status = getAttendanceStatus(cls.id);

              return (
                <ClassCard
                  key={cls.id}
                  className={cls.name}
                  present={stats.present}
                  total={stats.total}
                  percentage={stats.percentage}
                  status={status}
                  onMarkAttendance={(status) => markAttendance(cls.id, status)}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { theme } from "../../theme";

interface DateSelectorProps {
  selectedDate: Date;
  currentDay: string;
  onPrevDay: () => void;
  onNextDay: () => void;
  onCalendarClick: () => void;
}

export const DateSelector: React.FC<DateSelectorProps> = ({
  selectedDate,
  currentDay,
  onPrevDay,
  onNextDay,
  onCalendarClick,
}) => {
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      className={`flex items-center justify-between p-3 mb-6 border border-[#c5c2c2] __border-transparent bg-transparent/40 rounded-4xl`}
    >
      <button
        onClick={onPrevDay}
        className={`p-2 rounded-full border border-rose-500 bg-rose-500 text-white`}
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={onCalendarClick}
        className={`flex items-center gap-2 hover:${theme.colors.textMuted} transition`}
      >
        <div className="text-center">
          <div className="text-sm md:text-base">{formatDate(selectedDate)}</div>
          <div className={`text-xs ${theme.colors.textMuted}`}>
            {currentDay}
          </div>
        </div>
      </button>
      <button
        onClick={onNextDay}
        className={`p-2 rounded-full border border-rose-500 bg-rose-500 text-white`}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

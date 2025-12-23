import React from "react";
import { X } from "lucide-react";
import { getCardClass, theme } from "../../theme";

interface CalendarModalProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  onClose: () => void;
}

export const CalendarModal: React.FC<CalendarModalProps> = ({
  selectedDate,
  setSelectedDate,
  onClose,
}) => {
  const getDaysInMonth = (): (Date | null)[] => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysArray: (Date | null)[] = [];

    for (let i = 0; i < firstDay.getDay(); i++) {
      daysArray.push(null);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      daysArray.push(new Date(year, month, i));
    }

    return daysArray;
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  return (
    <div
      className={`fixed inset-0 ${theme.colors.background} bg-opacity-95 flex items-center justify-center z-50 p-4`}
    >
      <div className={`${getCardClass()} p-6 max-w-md w-full`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-light">
            {selectedDate.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </h3>
          <button onClick={onClose} className="hover:text-neutral-400">
            <X size={20} />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-2 text-center text-sm">
          {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
            <div
              key={day}
              className={`${theme.colors.textMuted} font-light py-2`}
            >
              {day}
            </div>
          ))}
          {getDaysInMonth().map((date, i) => (
            <button
              key={i}
              onClick={() => {
                if (date) {
                  setSelectedDate(date);
                  onClose();
                }
              }}
              className={`p-2 hover:${theme.colors.hover.bg} hover:${theme.colors.hover.text} transition ${
                date && isToday(date) ? `border ${theme.colors.border}` : ""
              } ${
                date && date.toDateString() === selectedDate.toDateString()
                  ? `${theme.colors.active.bg} ${theme.colors.active.text}`
                  : ""
              }`}
              disabled={!date}
            >
              {date ? date.getDate() : ""}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

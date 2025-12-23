import React, { useState } from "react";
import { Plus } from "lucide-react";
import type { Class, Schedule } from "../../types";
import { getCardClass, theme } from "../../theme";
import { storageUtils } from "../../utils/storage";

interface ScheduleViewProps {
  classes: Class[];
  schedule: Schedule;
  setSchedule: (schedule: Schedule) => void;
  days: string[];
  addClass: (name: string) => Promise<void>;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({
  classes,
  schedule,
  setSchedule,
  days,
  addClass,
}) => {
  const [showAddClass, setShowAddClass] = useState<boolean>(false);
  const [newClassName, setNewClassName] = useState<string>("");

  const handleAddClass = async () => {
    await addClass(newClassName);
    setNewClassName("");
    setShowAddClass(false);
  };

  const toggleClassInSchedule = async (day: string, classId: number) => {
    const newSchedule = { ...schedule };
    if (!newSchedule[day]) newSchedule[day] = [];

    if (newSchedule[day].includes(classId)) {
      newSchedule[day] = newSchedule[day].filter((id) => id !== classId);
    } else {
      newSchedule[day] = [...newSchedule[day], classId];
    }

    setSchedule(newSchedule);
    await storageUtils.saveSchedule(newSchedule);
  };

  return (
    <div className="pb-20">
      <div className={`p-4 md:p-6 border-b ${theme.colors.border}`}>
        <h1 className="text-2xl md:text-3xl font-light">Schedule</h1>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-4">
        {showAddClass ? (
          <div className={`${getCardClass()} mb-6`}>
            <div className="flex gap-2">
              <input
                type="text"
                value={newClassName}
                onChange={(e) => setNewClassName(e.target.value)}
                placeholder="Class name"
                className={`flex-1 ${theme.colors.background} border-b ${theme.colors.border} px-3 py-2 text-sm focus:outline-none focus:border-b-2 mr-3 ${theme.colors.text}`}
                onKeyPress={(e) => e.key === "Enter" && handleAddClass()}
                autoFocus
              />
              <button
                onClick={handleAddClass}
                className={`px-4 py-2 ${theme.colors.secondary} transition text-sm`}
              >
                Add
              </button>
              <button
                onClick={() => {
                  setShowAddClass(false);
                  setNewClassName("");
                }}
                className={`px-4 py-2 ${theme.colors.secondary} transition text-sm`}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowAddClass(true)}
            className={`w-full py-3 border rounded-4xl ${theme.colors.border} bg-rose-200 transition flex items-center justify-center gap-2 text-sm mb-6`}
          >
            <Plus size={18} />
            Add New Class
          </button>
        )}

        {classes.length === 0 ? (
          <div className={`text-center py-16 ${theme.colors.textMuted}`}>
            <img
              src="/class.svg"
              className="max-w-64 max-h-64 mx-auto"
              alt=""
            />
            <p className="mb-4">No classes added yet</p>
            <p className="text-xs">Add classes above to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {days.map((day) => (
              <div key={day} className={getCardClass()}>
                <h3 className="text-sm font-medium mb-3">{day}</h3>
                <div className="grid grid-cols-3 gap-2">
                  {classes.map((cls) => (
                    <button
                      key={cls.id}
                      onClick={() => toggleClassInSchedule(day, cls.id)}
                      className={`w-full px-3 py-2 text-sm border transition text-center rounded-2xl ${
                        schedule[day]?.includes(cls.id)
                          ? `${theme.colors.active.bg} ${theme.colors.active.text}`
                          : `border-[#c5c2c2]`
                      }`}
                    >
                      {cls.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

import React from "react";
import { Calendar, Menu, BarChart2, Plus } from "lucide-react";
import type { View } from "../../types";
import { getNavItemClass, theme } from "../../theme";

interface BottomNavProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentView,
  setCurrentView,
}) => {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 ${theme.colors.background} border-t border-[#c5c2c2]`}
    >
      <div className="max-w-4xl mx-auto flex">
        {/* today */}
        <button
          onClick={() => setCurrentView("today")}
          className={getNavItemClass(currentView === "today")}
        >
          <Calendar size={22} />
          <span className="text-xs font-medium">Today</span>
        </button>

        {/* extra class */}
        <button
          onClick={() => setCurrentView("extra")}
          className={getNavItemClass(currentView === "extra")}
        >
          <Plus size={22} />
          <span className="text-xs font-medium">Extra</span>
        </button>

        {/* schedule */}
        <button
          onClick={() => setCurrentView("schedule")}
          className={getNavItemClass(currentView === "schedule")}
        >
          <Menu size={22} />
          <span className="text-xs font-medium">Schedule</span>
        </button>

        {/* statics */}
        <button
          onClick={() => setCurrentView("stats")}
          className={getNavItemClass(currentView === "stats")}
        >
          <BarChart2 size={22} />
          <span className="text-xs font-medium">Stats</span>
        </button>
      </div>
    </div>
  );
};

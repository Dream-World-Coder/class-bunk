import React from "react";
import { Trash2 } from "lucide-react";
import { getCardClass, theme } from "../../theme";

interface StatsCardProps {
  className: string;
  present: number;
  total: number;
  percentage: string;
  onDelete: () => void;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  className,
  present,
  total,
  percentage,
  onDelete,
}) => {
  return (
    <div className={getCardClass()}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-light">{className}</h3>
            <button
              onClick={onDelete}
              className="p-2 hover:text-red-500 transition"
            >
              <Trash2 size={16} />
            </button>
          </div>
          <div className="text-sm text-neutral-500 mt-1">
            {present}/{total} classes attended
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 bg-neutral-500 overflow-hidden">
          <div
            className={`h-full ${theme.colors.primary} transition-all duration-300`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <span className="text-xl font-light w-16 text-right">
          {percentage}%
        </span>
      </div>
    </div>
  );
};

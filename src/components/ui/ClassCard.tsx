import React from "react";
import type { AttendanceStatus } from "../../types";
import { getCardClass, getButtonClass } from "../../theme";

interface ClassCardProps {
  className: string;
  present: number;
  total: number;
  percentage: string;
  status: string | null;
  onMarkAttendance: (status: AttendanceStatus) => void;
}

export const ClassCard: React.FC<ClassCardProps> = ({
  className,
  present,
  total,
  percentage,
  status,
  onMarkAttendance,
}) => {
  return (
    <div className={getCardClass()}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-lg md:text-xl font-normal">{className}</h3>
          <div className="text-sm text-neutral-500 mt-1">
            {present}/{total} • {percentage}%
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => onMarkAttendance("present")}
          className={`${getButtonClass(status === "present")} rounded-xl`}
        >
          Present
        </button>
        <button
          onClick={() => onMarkAttendance("absent")}
          className={`${getButtonClass(status === "absent")} rounded-xl`}
        >
          Absent
        </button>
        <button
          onClick={() => onMarkAttendance("noclass")}
          className={`${getButtonClass(status === "noclass")} rounded-xl`}
        >
          No Class
        </button>
      </div>
    </div>
  );
};

import { useState } from "react";
import type { Attendance, AttendanceStatus } from "../types";
import { storageUtils } from "../utils/storage";

export const useAttendance = () => {
  const [attendance, setAttendance] = useState<Attendance>({});

  const markAttendance = async (
    date: Date,
    classId: number,
    status: AttendanceStatus,
  ) => {
    const dateKey = date.toISOString().split("T")[0];
    const newAttendance = {
      ...attendance,
      [dateKey]: {
        ...attendance[dateKey],
        [classId]: status,
      },
    };
    setAttendance(newAttendance);
    await storageUtils.saveAttendance(newAttendance);
  };

  const getAttendanceStatus = (date: Date, classId: number): string | null => {
    const dateKey = date.toISOString().split("T")[0];
    return attendance[dateKey]?.[classId] || null;
  };

  const calculateStats = (classId: number) => {
    let present = 0,
      total = 0;
    Object.values(attendance).forEach((day) => {
      if (day[classId] === "present") present++;
      if (day[classId] !== "noclass" && day[classId]) total++;
    });
    return {
      present,
      total,
      percentage: total > 0 ? ((present / total) * 100).toFixed(1) : "0",
    };
  };

  const calculateOverallStats = () => {
    let present = 0,
      total = 0;
    Object.values(attendance).forEach((day) => {
      Object.values(day).forEach((status) => {
        if (status === "present") present++;
        if (status !== "noclass" && status) total++;
      });
    });
    return {
      present,
      total,
      percentage: total > 0 ? ((present / total) * 100).toFixed(1) : "0",
    };
  };

  return {
    attendance,
    setAttendance,
    markAttendance,
    getAttendanceStatus,
    calculateStats,
    calculateOverallStats,
  };
};

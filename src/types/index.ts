export interface Class {
  id: number;
  name: string;
}

export interface Schedule {
  [day: string]: number[];
}

export interface Attendance {
  [date: string]: {
    [classId: number]: "present" | "absent" | "noclass";
  };
}

export type View = "today" | "schedule" | "stats" | "extra";

export type AttendanceStatus = "present" | "absent" | "noclass";

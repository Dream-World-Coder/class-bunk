import type { Class, Schedule, Attendance } from "../types";

export const storageUtils = {
  async loadClasses(): Promise<Class[]> {
    try {
      const data = localStorage.getItem("classes");
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error loading classes:", error);
      return [];
    }
  },

  async loadSchedule(): Promise<Schedule> {
    try {
      const data = localStorage.getItem("schedule");
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error("Error loading schedule:", error);
      return {};
    }
  },

  async loadAttendance(): Promise<Attendance> {
    try {
      const data = localStorage.getItem("attendance");
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error("Error loading attendance:", error);
      return {};
    }
  },

  async saveClasses(classes: Class[]): Promise<void> {
    try {
      localStorage.setItem("classes", JSON.stringify(classes));
    } catch (error) {
      console.error("Error saving classes:", error);
    }
  },

  async saveSchedule(schedule: Schedule): Promise<void> {
    try {
      localStorage.setItem("schedule", JSON.stringify(schedule));
    } catch (error) {
      console.error("Error saving schedule:", error);
    }
  },

  async saveAttendance(attendance: Attendance): Promise<void> {
    try {
      localStorage.setItem("attendance", JSON.stringify(attendance));
    } catch (error) {
      console.error("Error saving attendance:", error);
    }
  },
};

/*
// Data
attendance: {
  "2025-12-23": { 1766487395910: "present", 1766487406059: "absent" },
},
classes: [
  ({ id: 1766487395910, name: "cl 1" }, { id: 1766487406059, name: "cl 2" })
];
schedule	{"Sunday":[1766483822390,1766483834688,1766484187854,1766484202184,1766484177039,1766484191271,1766484181955,1766487395910],"Monday":[1766483822390,1766484196954,1766483834688,1766484187854,1766484202184,1766487406059,1766487395910],"Tuesday":[1766483834688,1766484191271,1766484187854,1766484202184,1766487395910],"Wednesday":[1766483822390,1766484202184,1766487395910],"Saturday":[1766487395910],"Friday":[1766484187854,1766483822390,1766484191271,1766487406059],"Thursday":[1766484187854,1766484191271,1766484177039,1766484181955,1766487406059]}
*/

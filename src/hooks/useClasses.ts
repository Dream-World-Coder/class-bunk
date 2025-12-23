import { useState } from "react";
import type { Class } from "../types";
import { storageUtils } from "../utils/storage";

export const useClasses = () => {
  const [classes, setClasses] = useState<Class[]>([]);

  const addClass = async (name: string) => {
    if (!name.trim()) return;

    const newClasses = [...classes, { id: Date.now(), name: name.trim() }];
    setClasses(newClasses);
    await storageUtils.saveClasses(newClasses);
  };

  const deleteClass = async (classId: number) => {
    // 1. Remove all attendance entries for this class from storage
    const currentAttendance = await storageUtils.loadAttendance();
    Object.keys(currentAttendance).forEach((date) => {
      if (currentAttendance[date][classId]) {
        delete currentAttendance[date][classId];
      }
    });
    await storageUtils.saveAttendance(currentAttendance);

    // 2. Remove the class from the classes list
    const newClasses = classes.filter((c) => c.id !== classId);
    setClasses(newClasses);
    await storageUtils.saveClasses(newClasses);
  };

  return { classes, setClasses, addClass, deleteClass };
};

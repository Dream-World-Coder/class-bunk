import React, { useState, useEffect } from "react";
import type { View } from "./types";
import { storageUtils } from "./utils/storage";
import { useClasses } from "./hooks/useClasses";
import { useAttendance } from "./hooks/useAttendance";
import { BottomNav } from "./components/layout/BottomNav";
import { TodayView } from "./components/views/TodayView";
import { ScheduleView } from "./components/views/ScheduleView";
import { StatsView } from "./components/views/StatsView";
import { CalendarModal } from "./components/modals/CalendarModal";
import { theme } from "./theme";
import { ExtraView } from "./components/views/ExtraView";

const App: React.FC = () => {
  const [schedule, setSchedule] = useState({});
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<View>("today");

  const { classes, setClasses, addClass, deleteClass } = useClasses();
  const {
    setAttendance,
    markAttendance,
    getAttendanceStatus,
    calculateStats,
    calculateOverallStats,
  } = useAttendance();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const loadData = async (): Promise<void> => {
    const loadedClasses = await storageUtils.loadClasses();
    const loadedSchedule = await storageUtils.loadSchedule();
    const loadedAttendance = await storageUtils.loadAttendance();

    setClasses(loadedClasses);
    setSchedule(loadedSchedule);
    setAttendance(loadedAttendance);
  };

  useEffect(() => {
    setTimeout(() => {
      loadData();
    }, 100);
  }, []);

  const changeDate = (daysOffset: number): void => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + daysOffset);
    setSelectedDate(newDate);
  };

  return (
    <div
      className={`min-h-screen ${theme.colors.background} ${theme.colors.text}`}
    >
      {currentView === "today" && (
        <TodayView
          selectedDate={selectedDate}
          days={days}
          classes={classes}
          schedule={schedule}
          changeDate={changeDate}
          setShowCalendar={setShowCalendar}
          setCurrentView={setCurrentView}
          markAttendance={(classId, status) =>
            markAttendance(selectedDate, classId, status)
          }
          getAttendanceStatus={(classId) =>
            getAttendanceStatus(selectedDate, classId)
          }
          calculateStats={calculateStats}
        />
      )}
      {currentView === "extra" && (
        <ExtraView
          classes={classes}
          markAttendance={(classId, status) =>
            markAttendance(selectedDate, classId, status)
          }
          getAttendanceStatus={(classId) =>
            getAttendanceStatus(selectedDate, classId)
          }
          calculateStats={calculateStats}
        />
      )}
      {currentView === "schedule" && (
        <ScheduleView
          classes={classes}
          schedule={schedule}
          setSchedule={setSchedule}
          days={days}
          addClass={addClass}
        />
      )}
      {currentView === "stats" && (
        <StatsView
          classes={classes}
          deleteClass={deleteClass}
          calculateStats={calculateStats}
          calculateOverallStats={calculateOverallStats}
        />
      )}

      {showCalendar && (
        <CalendarModal
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          onClose={() => setShowCalendar(false)}
        />
      )}

      <BottomNav currentView={currentView} setCurrentView={setCurrentView} />
    </div>
  );
};

export default App;

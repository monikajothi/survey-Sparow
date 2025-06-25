import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { generateCalendarMatrix } from "../utils/dateUtils";
import { detectConflicts } from "../utils/detectConflicts";
import EventCard from "./EventCard";
import AddEventModal from "./AddEventModal";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  const [events, setEvents] = useState(() => {
    const stored = localStorage.getItem("events");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const handleDateClick = (day) => {
    setSelectedDate(day);
    setEditingEvent(null);
    setShowModal(true);
  };

  const handleEventClick = (event) => {
    const date = dayjs(event.date);
    setSelectedDate(date);
    setEditingEvent(event);
    setShowModal(true);
  };

  const handleSaveEvent = (newEvent) => {
    setEvents((prev) => {
      const filtered = prev.filter((ev) => ev.id !== newEvent.id);
      return [...filtered, newEvent];
    });
  };

  const handleDeleteEvent = (id) => {
    setEvents((prev) => prev.filter((ev) => ev.id !== id));
  };

  const changeMonth = (direction) => {
    setCurrentDate((prev) =>
      direction === "next" ? prev.add(1, "month") : prev.subtract(1, "month")
    );
  };

  const monthMatrix = generateCalendarMatrix(currentDate.format("MM"), currentDate.format("YYYY"));

  return (
    <div
      className="calendar-container"
      style={{
        maxWidth: "1000px",
        margin: "40px auto",
        background:
          theme === "light"
            ? "linear-gradient(120deg, #f8fafc 70%, #e3f2fd 100%)"
            : "linear-gradient(120deg, #2c003e 60%, #580d50 100%)",
        borderRadius: "24px",
        boxShadow:
          theme === "light"
            ? "0 8px 32px rgba(25, 118, 210, 0.13)"
            : "0 8px 32px rgba(200, 120, 255, 0.2)",
        padding: "24px 20px",
        fontFamily: "'Roboto', sans-serif",
        color: theme === "light" ? "#000" : "#fcd7ff",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1
          style={{
            fontWeight: 700,
            fontSize: "2em",
            letterSpacing: "0.04em",
            color: theme === "light" ? "#1976d2" : "#ff9de0",
            marginBottom: "18px",
          }}
        >
           Event Calendar
        </h1>
        <button
          onClick={toggleTheme}
          style={{
            padding: "8px 16px",
            fontSize: "0.9em",
            borderRadius: "16px",
            background: theme === "light" ? "#ff77a9" : "#fcd7ff",
            color: theme === "light" ? "#fff" : "#800080",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          }}
        >
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </div>

      <div
        className="calendar-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <button
          onClick={() => changeMonth("prev")}
          style={{
            background: theme === "light" ? "#fff" : "#3a0148",
            color: theme === "light" ? "#1976d2" : "#fcd7ff",
            border: `2px solid ${theme === "light" ? "#1976d2" : "#fcd7ff"}`,
            borderRadius: "8px",
            padding: "6px 16px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          ◀ Prev
        </button>
        <h2
          style={{
            fontWeight: 700,
            fontSize: "1.5em",
            margin: 0,
          }}
        >
          {currentDate.format("MMMM YYYY")}
        </h2>
        <button
          onClick={() => changeMonth("next")}
          style={{
            background: theme === "light" ? "#1976d2" : "#ff9de0",
            color: theme === "light" ? "#fff" : "#2c003e",
            border: `2px solid ${theme === "light" ? "#1976d2" : "#ff9de0"}`,
            borderRadius: "8px",
            padding: "6px 16px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Next ▶
        </button>
      </div>

      {showModal && selectedDate && (
        <AddEventModal
          date={selectedDate}
          onClose={() => setShowModal(false)}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent}
          existingEvent={editingEvent}
        />
      )}

      <div
        className="calendar-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "12px",
          background: theme === "light" ? "#e3f2fd" : "#3a0148",
          borderRadius: "18px",
          padding: "12px",
          overflowX: "auto",
        }}
      >
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div
            key={d}
            className="calendar-day"
            style={{
              textAlign: "center",
              fontWeight: 700,
              fontSize: "1em",
              color: theme === "light" ? "#1976d2" : "#fcd7ff",
              padding: "6px 0",
              background: theme === "light" ? "#fff" : "#5a004a",
              borderRadius: "6px",
            }}
          >
            {d}
          </div>
        ))}

        {monthMatrix.flat().map((day, idx) => (
          <div
            key={idx}
            onClick={() => day && handleDateClick(day)}
            style={{
              minHeight: "100px",
              background: day
                ? day.isSame(dayjs(), "day")
                  ? theme === "light"
                    ? "#fffde7"
                    : "#6a1b9a"
                  : theme === "light"
                  ? "#fff"
                  : "#4a0050"
                : "transparent",
              border: day
                ? day.isSame(dayjs(), "day")
                  ? `2px solid ${theme === "light" ? "#1976d2" : "#fcd7ff"}`
                  : `1px solid ${theme === "light" ? "#e3f2fd" : "#800080"}`
                : "none",
              borderRadius: "10px",
              padding: "6px 4px",
              color: theme === "light" ? "#000" : "#fff",
              cursor: day ? "pointer" : "default",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {day && (
              <>
                <div style={{ textAlign: "right", fontWeight: 600 }}>{day.date()}</div>
                {events
                  .filter((ev) => ev.date === day.format("YYYY-MM-DD"))
                  .map((ev, i) => (
                    <EventCard key={i} event={ev} onClick={handleEventClick} />
                  ))}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;

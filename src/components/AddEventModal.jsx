import { useState, useEffect } from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

const AddEventModal = ({ date, onClose, onSave, existingEvent, onDelete }) => {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [color, setColor] = useState("#1e90ff");

  useEffect(() => {
    if (existingEvent) {
      setTitle(existingEvent.title);
      setStartTime(existingEvent.startTime);
      setEndTime(existingEvent.endTime);
      setColor(existingEvent.color);
    }
  }, [existingEvent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !startTime || !endTime) return;

    const newEvent = {
      title,
      startTime,
      endTime,
      color,
      date: date.format("YYYY-MM-DD"),
      id: existingEvent?.id || Date.now()
    };

    onSave(newEvent);
    onClose();
  };

  // Inline style for TimePicker input
  const timePickerInputStyle = {
    borderRadius: "7px",
    border: "1.5px solid #1976d2",
    background: "linear-gradient(90deg, #e3f2fd 60%, #fffde7 100%)",
    color: "#1976d2",
    fontWeight: 600,
    fontSize: "1em",
    padding: "7px 10px",
    width: "90px",
    minWidth: "70px",
    maxWidth: "110px",
    boxShadow: "0 1px 4px rgba(25, 118, 210, 0.08)",
    outline: "none",
    transition: "border 0.2s, box-shadow 0.2s",
    margin: "0 2px"
  };

  // Style for TimePicker wrapper
  const timePickerWrapperStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  };

  return (
    <div className="modal-backdrop" style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(30, 48, 90, 0.25)",
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div className="modal" style={{
        background: "linear-gradient(120deg, #fffde7 70%, #e3f2fd 100%)",
        borderRadius: "18px",
        boxShadow: "0 8px 32px rgba(25, 118, 210, 0.18)",
        padding: "32px 28px 24px 28px",
        minWidth: "340px",
        maxWidth: "95vw",
        fontFamily: "'Roboto', sans-serif",
        color: "#222"
      }}>
        <h3 style={{
          textAlign: "center",
          fontWeight: 700,
          fontSize: "1.4em",
          color: "#1976d2",
          marginBottom: "18px",
          letterSpacing: "0.02em"
        }}>
          {existingEvent ? "Edit Event" : "Add Event"}<br />
          <span style={{ fontWeight: 500, color: "#f06292", fontSize: "0.9em" }}>
            {date.format("DD MMM YYYY")}
          </span>
        </h3>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            alignItems: "center",
            width: "100%"
          }}
        >
          <input
            type="text"
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{
              padding: "10px 12px",
              borderRadius: "7px",
              border: "1.5px solid #1976d2",
              fontSize: "1em",
              fontWeight: 500,
              outline: "none",
              marginBottom: "2px",
              background: "#fff",
              color: "#222",
              transition: "border 0.2s",
              width: "85%",
              maxWidth: "260px"
            }}
          />
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "flex-end",
              width: "100%",
              justifyContent: "center"
            }}
          >
            {/* Start Time */}
            <div style={timePickerWrapperStyle}>
              <label style={{
                fontSize: "0.92em",
                color: "#1976d2",
                fontWeight: 500,
                marginBottom: "2px"
              }}>Start</label>
              <TimePicker
                onChange={setStartTime}
                value={startTime}
                disableClock={true}
                clearIcon={null}
                format="HH:mm"
                required
                clockIcon={null}
                minTime="00:00"
                maxTime="23:59"
                className=""
                // Remove border and background from the wrapper
                style={timePickerInputStyle}
              />
            </div>
            {/* Separator */}
            <span style={{
              alignSelf: "flex-end",
              color: "#888",
              fontWeight: 600,
              marginBottom: "8px"
            }}>to</span>
            {/* End Time */}
            <div style={timePickerWrapperStyle}>
              <label style={{
                fontSize: "0.92em",
                color: "#1976d2",
                fontWeight: 500,
                marginBottom: "2px"
              }}>End</label>
              <TimePicker
                onChange={setEndTime}
                value={endTime}
                disableClock={true}
                clearIcon={null}
                format="HH:mm"
                required
                clockIcon={null}
                minTime="00:00"
                maxTime="23:59"
                className=""
                style={timePickerInputStyle}
              />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <label style={{ fontWeight: 500, color: "#1976d2" }}>Event Color:</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              style={{
                width: "32px",
                height: "32px",
                border: "none",
                background: "none",
                cursor: "pointer",
                borderRadius: "50%",
                boxShadow: "0 2px 8px rgba(25, 118, 210, 0.10)"
              }}
            />
          </div>
          <div className="btn-group" style={{
            display: "flex",
            gap: "10px",
            marginTop: "10px",
            justifyContent: "center"
          }}>
            <button
              type="submit"
              style={{
                background: "#1976d2",
                color: "#fff",
                border: "none",
                borderRadius: "7px",
                padding: "8px 22px",
                fontWeight: 600,
                fontSize: "1em",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(25, 118, 210, 0.13)",
                transition: "background 0.15s"
              }}
            >
              {existingEvent ? "Update" : "Add"}
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{
                background: "#fff",
                color: "#1976d2",
                border: "2px solid #1976d2",
                borderRadius: "7px",
                padding: "8px 18px",
                fontWeight: 600,
                fontSize: "1em",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(25, 118, 210, 0.07)",
                transition: "background 0.15s, color 0.15s"
              }}
            >
              Cancel
            </button>
            {existingEvent && (
              <button
                type="button"
                style={{
                  background: "crimson",
                  color: "#fff",
                  border: "none",
                  borderRadius: "7px",
                  padding: "8px 18px",
                  fontWeight: 600,
                  fontSize: "1em",
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(220, 20, 60, 0.13)",
                  transition: "background 0.15s"
                }}
                onClick={() => {
                  onDelete(existingEvent.id);
                  onClose();
                }}
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventModal;

import React from "react";


const EventCard = ({ event, onClick }) => {
  return (
    <div
      className="event-card"
      style={{
        background: `linear-gradient(135deg, ${event.color} 70%, #fff176 100%)`,
        padding: "7px 8px", // Reduced padding for less height
        borderRadius: "12px",
        color: "#222",
        marginTop: "6px", // Slightly reduced margin
        fontFamily: "'Roboto', sans-serif",
        fontSize: "13px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
        cursor: "pointer",
        border: "2px solid #fff",
        transition: "transform 0.12s, box-shadow 0.12s",
        position: "relative",
        width: "100%",
        boxSizing: "border-box",
        overflow: "hidden",
        minWidth: 0,
        maxWidth: "100%",
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick(event);
      }}
      title={`${event.title}\n${event.startTime} - ${event.endTime}`}
      tabIndex={0}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "4px", // Reduced margin
          minWidth: 0,
        }}
      >
        <div
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: event.color,
            marginRight: "8px",
            border: "2px solid #fff",
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontWeight: 700,
            fontSize: "1em",
            letterSpacing: "0.01em",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            minWidth: 0,
            flex: 1,
          }}
        >
          {event.title}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px", // Reduced gap
          marginBottom: "2px", // Reduced margin
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            background: "#fff",
            color: "#222",
            borderRadius: "5px",
            padding: "1px 7px",
            fontWeight: 500,
            fontSize: "0.95em",
            boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
            whiteSpace: "nowrap",
          }}
        >
          {event.startTime} - {event.endTime}
        </span>
        <span
          style={{
            background: "#f06292",
            color: "#fff",
            borderRadius: "5px",
            padding: "1px 7px",
            fontWeight: 500,
            fontSize: "0.95em",
            boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
            whiteSpace: "nowrap",
          }}
        >
          {event.date}
        </span>
      </div>
      {event.description && (
        <div
          style={{
            marginTop: "3px", // Reduced margin
            color: "#333",
            fontSize: "0.93em",
            opacity: 0.85,
            wordBreak: "break-word",
            maxHeight: "2em", // Slightly less max height
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {event.description}
        </div>
      )}
      <button
        style={{
          marginTop: "6px", // Reduced margin
          background: "#1976d2",
          color: "#fff",
          border: "none",
          borderRadius: "7px",
          padding: "4px 10px", // Reduced padding
          fontWeight: 600,
          fontSize: "0.93em",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(25, 118, 210, 0.10)",
          transition: "background 0.15s",
          width: "100%",
          minWidth: 0,
        }}
        onClick={(e) => {
          e.stopPropagation();
          onClick(event);
        }}
      >
        View Details
      </button>
    </div>
  );
};

export default EventCard;

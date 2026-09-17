import React from "react";

function AppointmentCard({
  doctor,
  specialty,
  date,
  time,
  status,
  initials,
  onView,
}) {
  return (
    <div className="appointment-card">

      {/* Doctor Avatar */}
      <div className="doctor-avatar">
        {initials}
      </div>

      {/* Doctor Information */}
      <div className="doctor-info">
        <strong>{doctor}</strong>
        <span>{specialty}</span>
      </div>

      {/* Date & Time */}
      <div className="appointment-date">
        <strong>{date}</strong>
        <span>{time}</span>
      </div>

      {/* Status */}
      <span
        className={
          status === "Confirmed"
            ? "status confirmed"
            : "status pending"
        }
      >
        {status}
      </span>

      {/* Arrow */}
      <button
        type="button"
        className="appointment-arrow"
        onClick={onView}
        aria-label={`View appointment with ${doctor}`}
        title="View appointment"
      >
        →
      </button>

    </div>
  );
}

export default AppointmentCard;
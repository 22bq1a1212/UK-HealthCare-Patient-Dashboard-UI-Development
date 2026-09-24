import React, { useMemo, useState } from "react";
import "./Appointments.css";

const doctors = [
  {
    id: 1,
    name: "Dr. Olivia Smith",
    specialty: "Dermatology",
    experience: "8 years experience",
    image: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: 2,
    name: "Dr. Emily Watson",
    specialty: "General Medicine",
    experience: "10 years experience",
    image: "https://i.pravatar.cc/150?img=32",
  },
  {
    id: 3,
    name: "Dr. Michael Brown",
    specialty: "Cardiology",
    experience: "12 years experience",
    image: "https://i.pravatar.cc/150?img=12",
  },
];

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:15 AM",
  "12:30 PM",
  "02:00 PM",
  "03:30 PM",
  "04:30 PM",
  "05:30 PM",
];

const bookedSlots = ["10:00 AM", "02:00 PM"];

function AppointmentBooking() {
  const today = new Date();

  const [selectedDoctor, setSelectedDoctor] = useState(doctors[0]);
  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [appointmentType, setAppointmentType] = useState("In-person");
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");

  const [errors, setErrors] = useState({});
  const [booking, setBooking] = useState(false);
  const [success, setSuccess] = useState(false);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const monthName = currentMonth.toLocaleString("default", {
    month: "long",
  });

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const firstDay = new Date(year, month, 1).getDay();

  const calendarDays = useMemo(() => {
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  }, [firstDay, daysInMonth]);

  const isPastDate = (day) => {
    if (!day) return false;

    const date = new Date(year, month, day);

    const current = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    return date < current;
  };

  const isSelectedDate = (day) => {
    if (!day || !selectedDate) return false;

    return (
      selectedDate.getFullYear() === year &&
      selectedDate.getMonth() === month &&
      selectedDate.getDate() === day
    );
  };

  const handleDateSelect = (day) => {
    if (!day || isPastDate(day)) return;

    const date = new Date(year, month, day);

    setSelectedDate(date);
    setSelectedTime("");

    setErrors((prev) => ({
      ...prev,
      date: "",
      time: "",
    }));
  };

  const goToPreviousMonth = () => {
    const previous = new Date(year, month - 1, 1);

    const currentMonthStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );

    if (previous >= currentMonthStart) {
      setCurrentMonth(previous);
    }
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!selectedDoctor) {
      newErrors.doctor = "Please select a doctor.";
    }

    if (!selectedDate) {
      newErrors.date = "Please select an appointment date.";
    }

    if (!selectedTime) {
      newErrors.time = "Please select an available time.";
    }

    if (!reason.trim()) {
      newErrors.reason = "Please enter the reason for your appointment.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleBooking = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setBooking(true);

    setTimeout(() => {
      setBooking(false);
      setSuccess(true);
    }, 700);
  };

  const resetBooking = () => {
    setSuccess(false);
    setSelectedDate(null);
    setSelectedTime("");
    setReason("");
    setNotes("");
    setErrors({});
  };

  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <div className="appointment-page">
      <div className="appointment-container">

        {/* Header */}
        <div className="appointment-header">
          <div>
            <span className="page-label">PATIENT PORTAL</span>
            <h1>Book an Appointment</h1>
            <p>
              Choose your doctor, preferred date and available time slot.
            </p>
          </div>

          <div className="header-icon">
            📅
          </div>
        </div>

        {/* Progress */}
        <div className="booking-progress">
          <div className="progress-step active">
            <span>1</span>
            <p>Doctor</p>
          </div>

          <div className="progress-line"></div>

          <div
            className={`progress-step ${
              selectedDate ? "active" : ""
            }`}
          >
            <span>2</span>
            <p>Date & Time</p>
          </div>

          <div className="progress-line"></div>

          <div
            className={`progress-step ${
              reason ? "active" : ""
            }`}
          >
            <span>3</span>
            <p>Details</p>
          </div>
        </div>

        <form onSubmit={handleBooking}>

          {/* Doctor Section */}
          <section className="booking-card">
            <div className="section-title">
              <div className="section-number">01</div>
              <div>
                <h2>Select Doctor</h2>
                <p>Choose a healthcare professional</p>
              </div>
            </div>

            <div className="doctor-grid">
              {doctors.map((doctor) => (
                <button
                  type="button"
                  key={doctor.id}
                  className={`doctor-card ${
                    selectedDoctor?.id === doctor.id
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => {
                    setSelectedDoctor(doctor);
                    setErrors((prev) => ({
                      ...prev,
                      doctor: "",
                    }));
                  }}
                >
                  <img src={doctor.image} alt={doctor.name} />

                  <div className="doctor-info">
                    <h3>{doctor.name}</h3>
                    <span>{doctor.specialty}</span>
                    <small>{doctor.experience}</small>
                  </div>

                  <div className="doctor-check">
                    {selectedDoctor?.id === doctor.id ? "✓" : ""}
                  </div>
                </button>
              ))}
            </div>

            {errors.doctor && (
              <div className="error-message">
                ⚠ {errors.doctor}
              </div>
            )}
          </section>

          {/* Date and Time */}
          <section className="booking-card">
            <div className="section-title">
              <div className="section-number">02</div>
              <div>
                <h2>Select Date & Time</h2>
                <p>Choose an available appointment slot</p>
              </div>
            </div>

            <div className="date-time-layout">

              {/* Calendar */}
              <div className="calendar-container">
                <div className="calendar-header">
                  <button
                    type="button"
                    onClick={goToPreviousMonth}
                    className="month-button"
                  >
                    ‹
                  </button>

                  <div>
                    <strong>{monthName}</strong>
                    <span>{year}</span>
                  </div>

                  <button
                    type="button"
                    onClick={goToNextMonth}
                    className="month-button"
                  >
                    ›
                  </button>
                </div>

                <div className="weekdays">
                  <span>Sun</span>
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                </div>

                <div className="calendar-grid">
                  {calendarDays.map((day, index) => (
                    <button
                      type="button"
                      key={index}
                      disabled={!day || isPastDate(day)}
                      className={`
                        calendar-day
                        ${!day ? "empty" : ""}
                        ${isPastDate(day) ? "past" : ""}
                        ${isSelectedDate(day) ? "selected-day" : ""}
                      `}
                      onClick={() => handleDateSelect(day)}
                    >
                      {day}
                    </button>
                  ))}
                </div>

                <div className="calendar-legend">
                  <span>
                    <i className="legend-selected"></i>
                    Selected
                  </span>

                  <span>
                    <i className="legend-available"></i>
                    Available
                  </span>
                </div>

                {errors.date && (
                  <div className="error-message">
                    ⚠ {errors.date}
                  </div>
                )}
              </div>

              {/* Time */}
              <div className="time-container">
                <div className="time-header">
                  <h3>Available Times</h3>

                  {selectedDate && (
                    <span>{formattedDate}</span>
                  )}
                </div>

                {!selectedDate ? (
                  <div className="time-empty">
                    <div>🗓️</div>
                    <p>Select a date first</p>
                    <small>
                      Available time slots will appear here.
                    </small>
                  </div>
                ) : (
                  <div className="time-grid">
                    {timeSlots.map((time) => {
                      const unavailable = bookedSlots.includes(time);

                      return (
                        <button
                          type="button"
                          key={time}
                          disabled={unavailable}
                          className={`time-slot ${
                            selectedTime === time
                              ? "selected-time"
                              : ""
                          } ${unavailable ? "unavailable" : ""}`}
                          onClick={() => {
                            setSelectedTime(time);
                            setErrors((prev) => ({
                              ...prev,
                              time: "",
                            }));
                          }}
                        >
                          <span>{time}</span>

                          {unavailable ? (
                            <small>Booked</small>
                          ) : (
                            <small>Available</small>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {errors.time && (
                  <div className="error-message">
                    ⚠ {errors.time}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Patient Details */}
          <section className="booking-card">
            <div className="section-title">
              <div className="section-number">03</div>

              <div>
                <h2>Appointment Details</h2>
                <p>Tell us a little about your visit</p>
              </div>
            </div>

            <div className="form-grid">

              <div className="form-group">
                <label>Appointment Type</label>

                <div className="appointment-types">
                  <button
                    type="button"
                    className={
                      appointmentType === "In-person"
                        ? "type-button active"
                        : "type-button"
                    }
                    onClick={() =>
                      setAppointmentType("In-person")
                    }
                  >
                    🏥
                    <span>In-person</span>
                  </button>

                  <button
                    type="button"
                    className={
                      appointmentType === "Video consultation"
                        ? "type-button active"
                        : "type-button"
                    }
                    onClick={() =>
                      setAppointmentType("Video consultation")
                    }
                  >
                    💻
                    <span>Video consultation</span>
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="reason">
                  Reason for Appointment *
                </label>

                <input
                  id="reason"
                  type="text"
                  placeholder="e.g. Skin consultation"
                  value={reason}
                  onChange={(e) => {
                    setReason(e.target.value);

                    setErrors((prev) => ({
                      ...prev,
                      reason: "",
                    }));
                  }}
                />

                {errors.reason && (
                  <div className="field-error">
                    {errors.reason}
                  </div>
                )}
              </div>

              <div className="form-group full-width">
                <label htmlFor="notes">
                  Additional Notes
                </label>

                <textarea
                  id="notes"
                  rows="4"
                  placeholder="Add any additional information for the doctor..."
                  value={notes}
                  onChange={(e) =>
                    setNotes(e.target.value)
                  }
                />
              </div>
            </div>
          </section>

          {/* Summary */}
          <section className="summary-card">
            <div className="summary-header">
              <div>
                <span>APPOINTMENT SUMMARY</span>
                <h2>Review your booking</h2>
              </div>

              <div className="secure-badge">
                🔒 Secure
              </div>
            </div>

            <div className="summary-content">
              <div className="summary-doctor">
                <img
                  src={selectedDoctor.image}
                  alt={selectedDoctor.name}
                />

                <div>
                  <strong>{selectedDoctor.name}</strong>
                  <span>{selectedDoctor.specialty}</span>
                </div>
              </div>

              <div className="summary-details">
                <div>
                  <small>Date</small>
                  <strong>
                    {formattedDate || "Not selected"}
                  </strong>
                </div>

                <div>
                  <small>Time</small>
                  <strong>
                    {selectedTime || "Not selected"}
                  </strong>
                </div>

                <div>
                  <small>Type</small>
                  <strong>{appointmentType}</strong>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="confirm-button"
              disabled={booking}
            >
              {booking ? (
                "Booking..."
              ) : (
                <>
                  Confirm Appointment
                  <span>→</span>
                </>
              )}
            </button>
          </section>
        </form>
      </div>

      {/* Success Modal */}
      {success && (
        <div className="modal-overlay">
          <div className="success-modal">
            <div className="success-icon">✓</div>

            <h2>Appointment Confirmed!</h2>

            <p>
              Your appointment has been successfully booked.
            </p>

            <div className="confirmation-box">
              <div>
                <span>Doctor</span>
                <strong>{selectedDoctor.name}</strong>
              </div>

              <div>
                <span>Date</span>
                <strong>{formattedDate}</strong>
              </div>

              <div>
                <span>Time</span>
                <strong>{selectedTime}</strong>
              </div>

              <div>
                <span>Appointment Type</span>
                <strong>{appointmentType}</strong>
              </div>
            </div>

            <div className="confirmation-id">
              Confirmation ID:
              <strong> UKH-{Math.floor(100000 + Math.random() * 900000)}</strong>
            </div>

            <button
              className="done-button"
              onClick={resetBooking}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AppointmentBooking;
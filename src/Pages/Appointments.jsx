import React, { useEffect, useState } from "react";

function Appointments({
  searchQuery = "",
  openBooking = false,
  setOpenBooking,
}) {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctor: "Dr. Emily Watson",
      specialty: "General Practice",
      date: "18 Sep 2026",
      time: "10:30 AM",
      status: "Confirmed",
      initials: "EW",
    },
    {
      id: 2,
      doctor: "Dr. Michael Brown",
      specialty: "Cardiology",
      date: "24 Sep 2026",
      time: "02:00 PM",
      status: "Confirmed",
      initials: "MB",
    },
    {
      id: 3,
      doctor: "Dr. Olivia Smith",
      specialty: "Dermatology",
      date: "30 Sep 2026",
      time: "11:15 AM",
      status: "Pending",
      initials: "OS",
    },
  ]);

  const [showBooking, setShowBooking] =
    useState(false);

  const [formData, setFormData] = useState({
    doctor: "",
    specialty: "",
    date: "",
    time: "",
  });

  // Open booking modal when Dashboard requests it
  useEffect(() => {
    if (openBooking) {
      setShowBooking(true);

      if (setOpenBooking) {
        setOpenBooking(false);
      }
    }
  }, [openBooking, setOpenBooking]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.doctor ||
      !formData.specialty ||
      !formData.date ||
      !formData.time
    ) {
      return;
    }

    const doctorName = formData.doctor.trim();

    const initials = doctorName
      .replace("Dr. ", "")
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    const newAppointment = {
      id: Date.now(),
      doctor: doctorName.startsWith("Dr.")
        ? doctorName
        : `Dr. ${doctorName}`,
      specialty: formData.specialty,
      date: formData.date,
      time: formData.time,
      status: "Pending",
      initials,
    };

    setAppointments((previous) => [
      ...previous,
      newAppointment,
    ]);

    setFormData({
      doctor: "",
      specialty: "",
      date: "",
      time: "",
    });

    setShowBooking(false);
  };

  const filteredAppointments =
    appointments.filter((appointment) => {
      const query = searchQuery
        .trim()
        .toLowerCase();

      if (!query) {
        return true;
      }

      return (
        appointment.doctor
          .toLowerCase()
          .includes(query) ||
        appointment.specialty
          .toLowerCase()
          .includes(query)
      );
    });

  return (
    <div className="dashboard-page">

      {/* ================= HEADER ================= */}

      <section className="welcome-section">

        <div>
          <p className="welcome-label">
            PATIENT PORTAL
          </p>

          <h1>
            Appointments 📅
          </h1>

          <p>
            Manage your upcoming healthcare
            consultations.
          </p>
        </div>

        <button
          type="button"
          className="primary-btn"
          onClick={() => setShowBooking(true)}
        >
          + Book Appointment
        </button>

      </section>


      {/* ================= APPOINTMENT LIST ================= */}

      <section className="appointments-section">

        <div className="section-header">

          <div>

            <h3>
              {searchQuery
                ? "Search Results"
                : "Your Appointments"}
            </h3>

            <p>
              {searchQuery
                ? `Results for "${searchQuery}"`
                : "Upcoming consultations and appointments"}
            </p>

          </div>

          <span className="appointment-count">
            {filteredAppointments.length} appointments
          </span>

        </div>


        <div className="appointment-list">

          {filteredAppointments.length > 0 ? (

            filteredAppointments.map(
              (appointment) => (

                <div
                  className="appointment-card"
                  key={appointment.id}
                >

                  <div className="doctor-avatar">
                    {appointment.initials}
                  </div>


                  <div className="doctor-info">

                    <strong>
                      {appointment.doctor}
                    </strong>

                    <span>
                      {appointment.specialty}
                    </span>

                  </div>


                  <div className="appointment-date">

                    <strong>
                      {appointment.date}
                    </strong>

                    <span>
                      {appointment.time}
                    </span>

                  </div>


                  <span
                    className={
                      appointment.status === "Confirmed"
                        ? "status confirmed"
                        : "status pending"
                    }
                  >
                    {appointment.status}
                  </span>

                </div>

              )
            )

          ) : (

            <div className="no-results">

              <div>🔍</div>

              <h3>
                No appointments found
              </h3>

              <p>
                Try searching for another doctor
                or specialty.
              </p>

            </div>

          )}

        </div>

      </section>


      {/* ================= BOOK APPOINTMENT MODAL ================= */}

      {showBooking && (

        <div
          className="profile-modal-overlay"
          onClick={() =>
            setShowBooking(false)
          }
        >

          <div
            className="profile-modal booking-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="profile-modal-header">

              <div>

                <span className="modal-label">
                  APPOINTMENT
                </span>

                <h2>
                  Book an Appointment
                </h2>

                <p>
                  Choose your doctor and
                  preferred consultation time.
                </p>

              </div>


              <button
                type="button"
                className="profile-close-btn"
                onClick={() =>
                  setShowBooking(false)
                }
              >
                ✕
              </button>

            </div>


            {/* FORM */}

            <form
              className="booking-form"
              onSubmit={handleSubmit}
            >

              {/* DOCTOR */}

              <div className="form-group">

                <label htmlFor="doctor">
                  Doctor
                </label>

                <input
                  id="doctor"
                  name="doctor"
                  type="text"
                  placeholder="Enter doctor name"
                  value={formData.doctor}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* SPECIALTY */}

              <div className="form-group">

                <label htmlFor="specialty">
                  Specialty
                </label>

                <select
                  id="specialty"
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select specialty
                  </option>

                  <option value="General Practice">
                    General Practice
                  </option>

                  <option value="Cardiology">
                    Cardiology
                  </option>

                  <option value="Dermatology">
                    Dermatology
                  </option>

                  <option value="Dentistry">
                    Dentistry
                  </option>

                  <option value="Orthopaedics">
                    Orthopaedics
                  </option>

                </select>

              </div>


              {/* DATE */}

              <div className="form-group">

                <label htmlFor="date">
                  Date
                </label>

                <input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* TIME */}

              <div className="form-group">

                <label htmlFor="time">
                  Time
                </label>

                <input
                  id="time"
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* BUTTONS */}

              <div className="booking-buttons">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() =>
                    setShowBooking(false)
                  }
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="primary-btn"
                >
                  Confirm Appointment
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Appointments;
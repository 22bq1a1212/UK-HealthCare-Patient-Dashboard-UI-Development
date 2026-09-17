import React, { useState } from "react";

import StatCard from "../components/StatCard";
import PatientSummary from "../components/PatientSummary";
import AppointmentCard from "../AppointmentCard";

function Dashboard({
  searchQuery = "",
  setActivePage,
  onBookAppointment,
}) {
  const [selectedAppointment, setSelectedAppointment] =
    useState(null);

  const [selectedAction, setSelectedAction] =
    useState(null);

  const appointments = [
    {
      doctor: "Dr. Emily Watson",
      specialty: "General Practice",
      date: "18 Sep 2026",
      time: "10:30 AM",
      status: "Confirmed",
      initials: "EW",
    },
    {
      doctor: "Dr. Michael Brown",
      specialty: "Cardiology",
      date: "24 Sep 2026",
      time: "02:00 PM",
      status: "Confirmed",
      initials: "MB",
    },
    {
      doctor: "Dr. Olivia Smith",
      specialty: "Dermatology",
      date: "30 Sep 2026",
      time: "11:15 AM",
      status: "Pending",
      initials: "OS",
    },
  ];

  const query = String(searchQuery)
    .trim()
    .toLowerCase();

  const filteredAppointments =
    query === ""
      ? appointments
      : appointments.filter((appointment) =>
          appointment.doctor
            .toLowerCase()
            .includes(query)
        );

  const handleQuickAction = (action) => {
    // BOOK APPOINTMENT
    if (action === "appointment") {
      if (onBookAppointment) {
        onBookAppointment();
      } else if (setActivePage) {
        setActivePage("Appointments");
      }

      return;
    }

    setSelectedAction(action);
  };

  return (
    <div className="dashboard-page">

      {/* ================= WELCOME ================= */}

      <section className="welcome-section">

        <div>
          <p className="welcome-label">
            PATIENT PORTAL
          </p>

          <h1>
            Good morning, Sarah 👋
          </h1>

          <p>
            Here's an overview of your health,
            appointments and care.
          </p>
        </div>

        <div className="last-updated">
          <span>Last updated</span>
          <strong>17 September 2026</strong>
        </div>

      </section>


      {/* ================= STATS ================= */}

      <div className="stats-grid">

        <StatCard
          title="Upcoming Appointments"
          value="3"
          subtitle="This month"
          icon="📅"
        />

        <StatCard
          title="Prescriptions"
          value="5"
          subtitle="Active prescriptions"
          icon="💊"
        />

        <StatCard
          title="Health Records"
          value="12"
          subtitle="Available records"
          icon="📋"
        />

        <StatCard
          title="Health Score"
          value="87%"
          subtitle="Good health"
          icon="❤️"
        />

      </div>


      {/* ================= PATIENT + HEALTH ================= */}

      <div className="dashboard-main-grid">

        <PatientSummary />

        <section className="health-card">

          <div className="section-header">

            <div>
              <h3>Health Overview</h3>

              <p>
                Your latest recorded health information
              </p>
            </div>

            <span className="health-status">
              Good
            </span>

          </div>


          <div className="health-items">

            <div className="health-item">

              <div className="health-icon">
                ❤️
              </div>

              <div>
                <span>Heart Rate</span>
                <strong>72 BPM</strong>
              </div>

            </div>


            <div className="health-item">

              <div className="health-icon">
                🩸
              </div>

              <div>
                <span>Blood Pressure</span>
                <strong>120 / 80 mmHg</strong>
              </div>

            </div>


            <div className="health-item">

              <div className="health-icon">
                ⚖️
              </div>

              <div>
                <span>Weight</span>
                <strong>64 kg</strong>
              </div>

            </div>


            <div className="health-item">

              <div className="health-icon">
                🌡️
              </div>

              <div>
                <span>Temperature</span>
                <strong>36.6 °C</strong>
              </div>

            </div>

          </div>

        </section>

      </div>


      {/* ================= GP PRACTICE ================= */}

      <section className="gp-card">

        <div className="gp-icon">
          🏥
        </div>

        <div className="gp-info">

          <span>Your GP Practice</span>

          <h3>
            Westgate Medical Centre
          </h3>

          <p>
            Your registered primary care practice
          </p>

        </div>

        <div className="gp-contact">

          <span>
            📍 London, UK
          </span>

          <span>
            ☎ 020 7946 0123
          </span>

        </div>

        <button
          type="button"
          className="secondary-btn"
          onClick={() =>
            setSelectedAction("practice")
          }
        >
          View Practice
        </button>

      </section>


      {/* ================= APPOINTMENTS ================= */}

      <section className="appointments-section">

        <div className="section-header">

          <div>

            <h3>
              {query
                ? "Search Results"
                : "Upcoming Appointments"}
            </h3>

            <p>
              {query
                ? `Doctors matching "${searchQuery}"`
                : "Your scheduled consultations"}
            </p>

          </div>

          <button
            type="button"
            className="view-all-btn"
            onClick={() => {
              if (setActivePage) {
                setActivePage("Appointments");
              }
            }}
          >
            View All →
          </button>

        </div>


        <div className="appointment-list">

          {filteredAppointments.length > 0 ? (

            filteredAppointments.map(
              (appointment, index) => (

                <AppointmentCard
                  key={index}
                  doctor={appointment.doctor}
                  specialty={appointment.specialty}
                  date={appointment.date}
                  time={appointment.time}
                  status={appointment.status}
                  initials={appointment.initials}
                  onView={() =>
                    setSelectedAppointment(
                      appointment
                    )
                  }
                />

              )
            )

          ) : (

            <div className="no-results">

              <div>🔍</div>

              <h3>No doctor found</h3>

              <p>
                Try searching with another doctor name.
              </p>

            </div>

          )}

        </div>

      </section>


      {/* ================= QUICK ACTIONS ================= */}

      <section className="quick-actions-section">

        <div className="section-header">

          <div>

            <h3>
              Quick Actions
            </h3>

            <p>
              Access your healthcare services
            </p>

          </div>

        </div>


        <div className="quick-actions">

          {/* BOOK APPOINTMENT */}

          <button
            type="button"
            className="quick-action"
            onClick={() =>
              handleQuickAction("appointment")
            }
          >

            <span>📅</span>

            <div>
              <strong>
                Book Appointment
              </strong>

              <small>
                Schedule a consultation
              </small>
            </div>

            <b>→</b>

          </button>


          {/* PRESCRIPTIONS */}

          <button
            type="button"
            className="quick-action"
            onClick={() =>
              handleQuickAction("prescriptions")
            }
          >

            <span>💊</span>

            <div>
              <strong>
                Prescriptions
              </strong>

              <small>
                View your medications
              </small>
            </div>

            <b>→</b>

          </button>


          {/* HEALTH RECORDS */}

          <button
            type="button"
            className="quick-action"
            onClick={() =>
              handleQuickAction("records")
            }
          >

            <span>📋</span>

            <div>
              <strong>
                Health Records
              </strong>

              <small>
                Access medical records
              </small>
            </div>

            <b>→</b>

          </button>


          {/* CONTACT */}

          <button
            type="button"
            className="quick-action"
            onClick={() =>
              handleQuickAction("contact")
            }
          >

            <span>📞</span>

            <div>
              <strong>
                Contact Care Team
              </strong>

              <small>
                Get healthcare support
              </small>
            </div>

            <b>→</b>

          </button>

        </div>

      </section>


      {/* ================= APPOINTMENT DETAILS ================= */}

      {selectedAppointment && (

        <div
          className="profile-modal-overlay"
          onClick={() =>
            setSelectedAppointment(null)
          }
        >

          <div
            className="profile-modal appointment-details-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="profile-modal-header">

              <div>

                <span className="modal-label">
                  APPOINTMENT DETAILS
                </span>

                <h2>
                  {selectedAppointment.doctor}
                </h2>

                <p>
                  {selectedAppointment.specialty}
                </p>

              </div>

              <button
                type="button"
                className="profile-close-btn"
                onClick={() =>
                  setSelectedAppointment(null)
                }
              >
                ✕
              </button>

            </div>


            <div className="modal-profile-top">

              <div className="modal-avatar">
                {selectedAppointment.initials}
              </div>

              <div>

                <strong>
                  {selectedAppointment.doctor}
                </strong>

                <span>
                  {selectedAppointment.status}
                </span>

              </div>

            </div>


            <div className="modal-section">

              <h3>
                Consultation Information
              </h3>

              <div className="modal-grid">

                <div>
                  <label>Doctor</label>

                  <strong>
                    {selectedAppointment.doctor}
                  </strong>
                </div>

                <div>
                  <label>Specialty</label>

                  <strong>
                    {selectedAppointment.specialty}
                  </strong>
                </div>

                <div>
                  <label>Date</label>

                  <strong>
                    {selectedAppointment.date}
                  </strong>
                </div>

                <div>
                  <label>Time</label>

                  <strong>
                    {selectedAppointment.time}
                  </strong>
                </div>

                <div>
                  <label>Status</label>

                  <strong>
                    {selectedAppointment.status}
                  </strong>
                </div>

                <div>
                  <label>Appointment Type</label>

                  <strong>
                    In-person consultation
                  </strong>
                </div>

              </div>

            </div>


            <button
              type="button"
              className="modal-bottom-close"
              onClick={() =>
                setSelectedAppointment(null)
              }
            >
              Close Appointment
            </button>

          </div>

        </div>

      )}


      {/* ================= QUICK ACTION MODALS ================= */}

      {selectedAction && (

        <div
          className="profile-modal-overlay"
          onClick={() =>
            setSelectedAction(null)
          }
        >

          <div
            className="profile-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="profile-modal-header">

              <div>

                <span className="modal-label">
                  HEALTHCARE SERVICE
                </span>

                <h2>

                  {selectedAction === "prescriptions" &&
                    "Prescriptions"}

                  {selectedAction === "records" &&
                    "Health Records"}

                  {selectedAction === "contact" &&
                    "Contact Care Team"}

                  {selectedAction === "practice" &&
                    "GP Practice"}

                </h2>

                <p>
                  Healthcare service information
                </p>

              </div>

              <button
                type="button"
                className="profile-close-btn"
                onClick={() =>
                  setSelectedAction(null)
                }
              >
                ✕
              </button>

            </div>


            {selectedAction === "prescriptions" && (

              <div className="modal-section">

                <h3>
                  Active Prescriptions
                </h3>

                <div className="modal-grid">

                  <div>
                    <label>Medication</label>
                    <strong>Vitamin D</strong>
                  </div>

                  <div>
                    <label>Status</label>
                    <strong>Active</strong>
                  </div>

                  <div>
                    <label>Quantity</label>
                    <strong>30 tablets</strong>
                  </div>

                  <div>
                    <label>Prescription Status</label>
                    <strong>Available</strong>
                  </div>

                </div>

              </div>

            )}


            {selectedAction === "records" && (

              <div className="modal-section">

                <h3>
                  Your Health Records
                </h3>

                <div className="modal-grid">

                  <div>
                    <label>Available Records</label>
                    <strong>12 Records</strong>
                  </div>

                  <div>
                    <label>Latest Update</label>
                    <strong>17 September 2026</strong>
                  </div>

                  <div>
                    <label>Record Type</label>
                    <strong>General Health</strong>
                  </div>

                  <div>
                    <label>Status</label>
                    <strong>Available</strong>
                  </div>

                </div>

              </div>

            )}


            {selectedAction === "contact" && (

              <div className="modal-section">

                <h3>
                  Contact Care Team
                </h3>

                <div className="modal-grid">

                  <div>
                    <label>GP Practice</label>
                    <strong>
                      Westgate Medical Centre
                    </strong>
                  </div>

                  <div>
                    <label>Phone</label>
                    <strong>
                      020 7946 0123
                    </strong>
                  </div>

                  <div>
                    <label>Location</label>
                    <strong>
                      London, UK
                    </strong>
                  </div>

                  <div>
                    <label>Support</label>
                    <strong>
                      Patient Care Team
                    </strong>
                  </div>

                </div>

              </div>

            )}


            {selectedAction === "practice" && (

              <div className="modal-section">

                <h3>
                  Westgate Medical Centre
                </h3>

                <div className="modal-grid">

                  <div>
                    <label>Location</label>
                    <strong>
                      London, UK
                    </strong>
                  </div>

                  <div>
                    <label>Telephone</label>
                    <strong>
                      020 7946 0123
                    </strong>
                  </div>

                  <div>
                    <label>Type</label>
                    <strong>
                      Primary Care Practice
                    </strong>
                  </div>

                  <div>
                    <label>Patient Status</label>
                    <strong>
                      Registered
                    </strong>
                  </div>

                </div>

              </div>

            )}


            <button
              type="button"
              className="modal-bottom-close"
              onClick={() =>
                setSelectedAction(null)
              }
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default Dashboard;
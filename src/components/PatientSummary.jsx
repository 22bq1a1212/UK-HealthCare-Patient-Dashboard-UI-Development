import React, { useState } from "react";

function PatientSummary() {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      <section className="patient-summary">

        <div className="section-header">
          <div>
            <h3>Patient Summary</h3>
            <p>Your personal information</p>
          </div>

          <span className="verified-badge">
            ✓ Verified
          </span>
        </div>

        <div className="patient-info">

          <div className="patient-avatar">
            SC
          </div>

          <div className="patient-details">
            <h3>Sarah Collins</h3>

            <p>
              Patient ID: PT-2026-001
            </p>

            <span className="patient-status">
              Active Patient
            </span>
          </div>

        </div>

        <div className="patient-basic-info">

          <div>
            <span>Date of Birth</span>
            <strong>15 Mar 1998</strong>
          </div>

          <div>
            <span>Blood Group</span>
            <strong>O+</strong>
          </div>

          <div>
            <span>Gender</span>
            <strong>Female</strong>
          </div>

        </div>

        <button
          className="view-profile-btn"
          onClick={() => setShowProfile(true)}
        >
          View Full Profile →
        </button>

      </section>

      {/* Profile Modal */}

      {showProfile && (

        <div
          className="profile-modal-overlay"
          onClick={() => setShowProfile(false)}
        >

          <div
            className="profile-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="profile-modal-header">

              <div>
                <span className="modal-label">
                  PATIENT PROFILE
                </span>

                <h2>Sarah Collins</h2>

                <p>
                  Patient ID: PT-2026-001
                </p>
              </div>

              <button
                className="profile-close-btn"
                onClick={() => setShowProfile(false)}
              >
                ✕
              </button>

            </div>

            <div className="modal-profile-top">

              <div className="modal-avatar">
                SC
              </div>

              <div>
                <strong>Sarah Collins</strong>
                <span>Active Patient</span>
              </div>

            </div>

            <div className="modal-section">

              <h3>Personal Details</h3>

              <div className="modal-grid">

                <div>
                  <label>First Name</label>
                  <strong>Sarah</strong>
                </div>

                <div>
                  <label>Last Name</label>
                  <strong>Collins</strong>
                </div>

                <div>
                  <label>Date of Birth</label>
                  <strong>15 March 1998</strong>
                </div>

                <div>
                  <label>Gender</label>
                  <strong>Female</strong>
                </div>

                <div>
                  <label>Blood Group</label>
                  <strong>O+</strong>
                </div>

                <div>
                  <label>Patient ID</label>
                  <strong>PT-2026-001</strong>
                </div>

              </div>

            </div>

            <div className="modal-section">

              <h3>Contact Information</h3>

              <div className="modal-grid">

                <div>
                  <label>Email</label>
                  <strong>
                    sarah.collins@example.com
                  </strong>
                </div>

                <div>
                  <label>Phone</label>
                  <strong>
                    +44 7700 900123
                  </strong>
                </div>

                <div className="modal-full">
                  <label>Address</label>
                  <strong>
                    24 Westgate Road, London, UK
                  </strong>
                </div>

              </div>

            </div>

            <div className="modal-section">

              <h3>Emergency Contact</h3>

              <div className="modal-grid">

                <div>
                  <label>Name</label>
                  <strong>James Collins</strong>
                </div>

                <div>
                  <label>Phone</label>
                  <strong>
                    +44 7700 900456
                  </strong>
                </div>

              </div>

            </div>

            <div className="modal-section">

              <h3>Medical Information</h3>

              <div className="modal-grid">

                <div>
                  <label>Allergies</label>
                  <strong>No known allergies</strong>
                </div>

                <div>
                  <label>Current Medications</label>
                  <strong>
                    Vitamin D
                  </strong>
                </div>

                <div className="modal-full">
                  <label>Medical History</label>
                  <strong>
                    No major medical history recorded
                  </strong>
                </div>

              </div>

            </div>

            <div className="modal-section">

              <h3>Current Health</h3>

              <div className="health-modal-grid">

                <div className="health-modal-card">
                  <span>❤️</span>
                  <div>
                    <label>Heart Rate</label>
                    <strong>72 BPM</strong>
                  </div>
                </div>

                <div className="health-modal-card">
                  <span>🩸</span>
                  <div>
                    <label>Blood Pressure</label>
                    <strong>120 / 80</strong>
                  </div>
                </div>

                <div className="health-modal-card">
                  <span>⚖️</span>
                  <div>
                    <label>Weight</label>
                    <strong>64 kg</strong>
                  </div>
                </div>

                <div className="health-modal-card">
                  <span>🌡️</span>
                  <div>
                    <label>Temperature</label>
                    <strong>36.6°C</strong>
                  </div>
                </div>

              </div>

            </div>

            <button
              className="modal-bottom-close"
              onClick={() => setShowProfile(false)}
            >
              Close Profile
            </button>

          </div>

        </div>

      )}

    </>
  );
}

export default PatientSummary;
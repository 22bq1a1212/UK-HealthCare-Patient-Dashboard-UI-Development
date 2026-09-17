import { useState } from "react";

function Patients() {
  const [patients, setPatients] = useState([
    {
      id: "UKP-10482",
      name: "Sarah Collins",
      age: 34,
      gender: "Female",
      bloodGroup: "O+",
      status: "Active",
    },
    {
      id: "UKP-10821",
      name: "James Wilson",
      age: 42,
      gender: "Male",
      bloodGroup: "A+",
      status: "Active",
    },
    {
      id: "UKP-10935",
      name: "Emma Thompson",
      age: 29,
      gender: "Female",
      bloodGroup: "B+",
      status: "Active",
    },
    {
      id: "UKP-11124",
      name: "Oliver Brown",
      age: 51,
      gender: "Male",
      bloodGroup: "AB+",
      status: "Inactive",
    },
    {
      id: "UKP-11367",
      name: "Sophia Williams",
      age: 38,
      gender: "Female",
      bloodGroup: "O-",
      status: "Active",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    age: "",
    gender: "Female",
    bloodGroup: "O+",
    status: "Active",
  });

  // =========================
  // ADD PATIENT
  // =========================

  const handleAddPatient = () => {
    setFormData({
      id: "",
      name: "",
      age: "",
      gender: "Female",
      bloodGroup: "O+",
      status: "Active",
    });

    setEditMode(false);
    setShowModal(true);
  };

  // =========================
  // EDIT PATIENT
  // =========================

  const handleEdit = (patient) => {
    setFormData({
      id: patient.id,
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      bloodGroup: patient.bloodGroup,
      status: patient.status,
    });

    setEditMode(true);
    setShowModal(true);
  };

  // =========================
  // INPUT CHANGE
  // =========================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =========================
  // SAVE PATIENT
  // =========================

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.id.trim() ||
      !formData.name.trim() ||
      !formData.age
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (editMode) {
      // UPDATE EXISTING PATIENT
      setPatients((previousPatients) =>
        previousPatients.map((patient) =>
          patient.id === formData.id
            ? {
                ...formData,
                age: Number(formData.age),
              }
            : patient
        )
      );
    } else {
      // ADD NEW PATIENT
      const newPatient = {
        ...formData,
        age: Number(formData.age),
      };

      setPatients((previousPatients) => [
        ...previousPatients,
        newPatient,
      ]);
    }

    setShowModal(false);
  };

  // =========================
  // DELETE PATIENT
  // =========================

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this patient?"
    );

    if (confirmed) {
      setPatients((previousPatients) =>
        previousPatients.filter(
          (patient) => patient.id !== id
        )
      );
    }
  };

  // =========================
  // CLOSE MODAL
  // =========================

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className="patients-page">

      {/* PAGE HEADER */}
      <div className="patient-heading">
        <div>
          <h1>Patients</h1>
          <p>Manage patient information and records.</p>
        </div>

        <button
          className="add-patient-btn"
          onClick={handleAddPatient}
        >
          + Add Patient
        </button>
      </div>

      {/* PATIENT TABLE */}
      <div className="patients-table-container">
        <table className="patients-table">

          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Blood Group</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>

                <td>{patient.id}</td>

                <td>
                  <strong>{patient.name}</strong>
                </td>

                <td>{patient.age}</td>

                <td>{patient.gender}</td>

                <td>{patient.bloodGroup}</td>

                <td>
                  <span
                    className={
                      patient.status === "Active"
                        ? "status active"
                        : "status inactive"
                    }
                  >
                    {patient.status}
                  </span>
                </td>

                {/* ACTIONS */}
                <td>
                  <div className="action-buttons">

                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(patient)}
                    >
                      ✏️ Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(patient.id)
                      }
                    >
                      🗑️ Delete
                    </button>

                  </div>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* =========================
          EDIT / ADD MODAL
      ========================= */}

      {showModal && (
        <div className="modal-overlay">

          <div className="patient-modal">

            {/* MODAL HEADER */}
            <div className="modal-header">

              <div>
                <h2>
                  {editMode
                    ? "Edit Patient"
                    : "Add New Patient"}
                </h2>

                <p>
                  {editMode
                    ? "Update patient information."
                    : "Enter new patient information."}
                </p>
              </div>

              <button
                className="close-btn"
                onClick={handleClose}
              >
                ×
              </button>

            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit}>

              <div className="form-grid">

                {/* PATIENT ID */}
                <div className="form-group">
                  <label>Patient ID *</label>

                  <input
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    placeholder="UKP-12001"
                    disabled={editMode}
                    required
                  />
                </div>

                {/* NAME */}
                <div className="form-group">
                  <label>Full Name *</label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    required
                  />
                </div>

                {/* AGE */}
                <div className="form-group">
                  <label>Age *</label>

                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Enter age"
                    min="1"
                    max="120"
                    required
                  />
                </div>

                {/* GENDER */}
                <div className="form-group">
                  <label>Gender</label>

                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="Female">
                      Female
                    </option>

                    <option value="Male">
                      Male
                    </option>

                    <option value="Other">
                      Other
                    </option>
                  </select>
                </div>

                {/* BLOOD GROUP */}
                <div className="form-group">
                  <label>Blood Group</label>

                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                  >
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>

                {/* STATUS */}
                <div className="form-group">
                  <label>Status</label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Active">
                      Active
                    </option>

                    <option value="Inactive">
                      Inactive
                    </option>
                  </select>
                </div>

              </div>

              {/* BUTTONS */}
              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={handleClose}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-btn"
                >
                  {editMode
                    ? "Save Changes"
                    : "Add Patient"}
                </button>

              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}

export default Patients;
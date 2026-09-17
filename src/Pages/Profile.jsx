import React, { useEffect, useState } from "react";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Sarah Collins",
    patientId: "UKP-10482",
    dob: "14 March 1992",
    gender: "Female",
    bloodGroup: "O+",
    phone: "+44 7700 900123",
    email: "sarah.collins@example.com",
    address: "London, United Kingdom",
    emergencyContact: "John Collins",
  });

  const [profileImage, setProfileImage] = useState("");

  // Load saved profile
  useEffect(() => {
    const savedProfile = localStorage.getItem("patientProfile");
    const savedImage = localStorage.getItem("patientProfileImage");

    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }

    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  // Handle profile text changes
  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  // Handle profile picture
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Only allow images
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    // Limit size to 2MB
    if (file.size > 2 * 1024 * 1024) {
      alert("Please select an image smaller than 2MB.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setProfileImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  // Save profile
  const handleSave = () => {
    localStorage.setItem(
      "patientProfile",
      JSON.stringify(profile)
    );

    if (profileImage) {
      localStorage.setItem(
        "patientProfileImage",
        profileImage
      );
    }

    setIsEditing(false);
  };

  // Cancel editing
  const handleCancel = () => {
    const savedProfile = localStorage.getItem("patientProfile");

    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }

    setIsEditing(false);
  };

  // Remove picture
  const removePicture = () => {
    setProfileImage("");
    localStorage.removeItem("patientProfileImage");
  };

  return (
    <div className="page profile-page">

      {/* Page Header */}
      <div className="page-header">
        <div>
          <h2>My Profile</h2>
          <p>View and manage your personal information.</p>
        </div>

        {!isEditing ? (
          <button
            className="primary-btn"
            onClick={() => setIsEditing(true)}
          >
            ✎ Edit Profile
          </button>
        ) : (
          <div className="profile-header-buttons">
            <button
              className="cancel-profile-btn"
              onClick={handleCancel}
            >
              Cancel
            </button>

            <button
              className="primary-btn"
              onClick={handleSave}
            >
              ✓ Save Profile
            </button>
          </div>
        )}
      </div>

      {/* Profile Card */}
      <div className="profile-card">

        {/* Profile Top */}
        <div className="profile-top">

          <div className="profile-picture-section">

            <div className="profile-picture-wrapper">

              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="profile-picture"
                />
              ) : (
                <div className="profile-picture-placeholder">
                  {profile.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .substring(0, 2)
                    .toUpperCase()}
                </div>
              )}

              {isEditing && (
                <label
                  htmlFor="profileImage"
                  className="camera-button"
                  title="Change profile picture"
                >
                  📷
                </label>
              )}

              <input
                id="profileImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                hidden
              />

            </div>

            {isEditing && profileImage && (
              <button
                className="remove-photo-btn"
                onClick={removePicture}
              >
                Remove photo
              </button>
            )}

          </div>

          <div className="profile-name-section">
            <h1>{profile.name}</h1>
            <p>Patient ID: {profile.patientId}</p>

            <span className="profile-status">
              ● Active Patient
            </span>
          </div>

        </div>

        {/* Divider */}
        <div className="profile-divider"></div>

        {/* Personal Information */}
        <div className="profile-section">

          <h3>Personal Information</h3>

          <div className="profile-grid">

            {/* Full Name */}
            <div className="profile-field">
              <label>Full Name</label>

              {isEditing ? (
                <input
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                />
              ) : (
                <strong>{profile.name}</strong>
              )}
            </div>

            {/* Date of Birth */}
            <div className="profile-field">
              <label>Date of Birth</label>

              {isEditing ? (
                <input
                  name="dob"
                  value={profile.dob}
                  onChange={handleChange}
                />
              ) : (
                <strong>{profile.dob}</strong>
              )}
            </div>

            {/* Gender */}
            <div className="profile-field">
              <label>Gender</label>

              {isEditing ? (
                <select
                  name="gender"
                  value={profile.gender}
                  onChange={handleChange}
                >
                  <option>Female</option>
                  <option>Male</option>
                  <option>Other</option>
                </select>
              ) : (
                <strong>{profile.gender}</strong>
              )}
            </div>

            {/* Blood Group */}
            <div className="profile-field">
              <label>Blood Group</label>

              {isEditing ? (
                <select
                  name="bloodGroup"
                  value={profile.bloodGroup}
                  onChange={handleChange}
                >
                  <option>O+</option>
                  <option>O-</option>
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                </select>
              ) : (
                <strong>{profile.bloodGroup}</strong>
              )}
            </div>

            {/* Phone */}
            <div className="profile-field">
              <label>Phone Number</label>

              {isEditing ? (
                <input
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                />
              ) : (
                <strong>{profile.phone}</strong>
              )}
            </div>

            {/* Email */}
            <div className="profile-field">
              <label>Email Address</label>

              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                />
              ) : (
                <strong>{profile.email}</strong>
              )}
            </div>

            {/* Address */}
            <div className="profile-field full-width">
              <label>Address</label>

              {isEditing ? (
                <input
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                />
              ) : (
                <strong>{profile.address}</strong>
              )}
            </div>

            {/* Emergency Contact */}
            <div className="profile-field full-width">
              <label>Emergency Contact</label>

              {isEditing ? (
                <input
                  name="emergencyContact"
                  value={profile.emergencyContact}
                  onChange={handleChange}
                />
              ) : (
                <strong>{profile.emergencyContact}</strong>
              )}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;
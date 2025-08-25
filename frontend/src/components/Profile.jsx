import React, { useState, useEffect } from "react";
import API from "../api";
import "../css/Profile.css";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({ bio: "", age: "" });
  const [file, setFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch existing profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/profile/me"); // backend route
        if (res.data.profile) {
          setProfile(res.data.profile);
          setFormData({
            bio: res.data.profile.bio || "",
            age: res.data.profile.age || "",
          });
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Submit form (create/update profile)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file && !formData.bio && !formData.age) {
      alert("Please fill in details or upload an image");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("bio", formData.bio);
      formDataToSend.append("age", formData.age);
      if (file) formDataToSend.append("file", file);

      const res = await API.post("/profile/create", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProfile(res.data.profile);
      setIsEditing(false); // close form after saving
      alert("Profile saved successfully!");
    } catch (err) {
      console.error("Error creating profile:", err);
      alert("Failed to save profile");
    }
  };

  return (
    <div className="profile-container">
      <h2>Your Profile</h2>

      {profile ? (
        <div className="profile-card">
          <img src={profile.image} alt="Profile" className="profile-img" />
          <h3>{profile.user?.name}</h3>
          <p><strong>Email:</strong> {profile.user?.email}</p>
          <p><strong>Bio:</strong> {profile.bio}</p>
          <p><strong>Age:</strong> {profile.age}</p>
          
          {/* Show update button */}
          <button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Cancel" : "Update Profile"}
          </button>
        </div>
      ) : (
        <p>No profile yet. Create one below 👇</p>
      )}

      {/* Profile Form - only show if editing or creating new */}
      {(!profile || isEditing) && (
        <form className="profile-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="bio"
            placeholder="Write your bio"
            value={formData.bio}
            onChange={handleChange}
          />
          <input
            type="number"
            name="age"
            placeholder="Enter your age"
            value={formData.age}
            onChange={handleChange}
          />
          <input type="file" onChange={handleFileChange} />
          <button type="submit">
            {profile ? "Save Changes" : "Create Profile"}
          </button>
        </form>
      )}
    </div>
  );
}

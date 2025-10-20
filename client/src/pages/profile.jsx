import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/profile.css';

const Profile = () => {
  const token = localStorage.getItem('token');
  const [profileData, setProfileData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          'http://localhost:7000/api/v1/user/profile',
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.data.success) {
          setProfileData(res.data.data);
          setPreview(res.data.data.avatar || null); // set initial avatar
        }
      } catch (err) {
        console.error('Profile fetch error:', err);
      }
    };
    fetchProfile();
  }, [token]);

  // Handle file selection and preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); // show preview immediately
    }
  };

  // Upload avatar
  const handleUpload = async () => {
    if (!selectedFile) return alert("Select a photo first!");
    const formData = new FormData();
    formData.append('avatar', selectedFile);

    try {
      setLoading(true);
      const res = await axios.put(
        'http://localhost:7000/api/v1/user/updateAvatar',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      if (res.data.success) {
        setProfileData(res.data.data); // update profile data
        setSelectedFile(null);         // clear selection
        alert("Photo updated successfully!");
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert("Failed to upload photo.");
    } finally {
      setLoading(false);
    }
  };

  if (!profileData) return <p>Loading...</p>;

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <div className="profile-avatar">
          <img
            src={preview || '/default-avatar.png'}
            alt="Profile Avatar"
          />
        </div>
        <div className="profile-info">
          <h2>{profileData.name}</h2>
          <p><strong>Email:</strong> {profileData.email}</p>
          <p><strong>Bio:</strong> {profileData.bio || 'No bio available.'}</p>
        </div>
        <div className="profile-upload">
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload} disabled={loading}>
            {loading ? "Uploading..." : "Update Photo"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

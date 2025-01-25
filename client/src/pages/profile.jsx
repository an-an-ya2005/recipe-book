import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { userId } = useParams(); // Extract user ID from URL
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:7000/api/v1/user/profile/${userId}`) // Adjust endpoint
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error('Error fetching user:', error));
  }, [userId]);

  if (!user) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Bio:</strong> {user.bio}</p>
    </div>
  );
};

export default Profile;

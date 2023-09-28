import React, { useEffect, useState } from "react";
import "./profile.css"; // Import your CSS file

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data here (e.g., after user login)
    // You'll need to replace this with your own authentication and data retrieval logic

    // Sample user data (replace with your logic)
    const userData = {
      fullName: "John Doe",
      email: "johndoe@example.com",
      // Add more user data fields as needed
    };

    setUser(userData);
  }, []);

  return (
    <div className="profile-container">
      <h1>Profile Page</h1>
      {user ? (
        <div className="profile-info">
          <p>
            <strong>Full Name:</strong> {user.fullName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          {/* Add more user data fields here */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}

export default Profile;

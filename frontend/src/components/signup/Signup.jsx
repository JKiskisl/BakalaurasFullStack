import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";
import { loginUser, signupUser } from "../../services/auth.service";

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    const fullname = e.target.fullname.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const { data, error } = await signupUser(fullname, email, password);

    console.log("Signup Response:", data);

    if (error) {
      setError(error);
    } else {
      if (data) {
        const loginResponse = await loginUser(email, password);

        if (loginResponse.data) {
          localStorage.setItem("access_token", loginResponse.data);
          navigate("/");
        }
      }
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSignup}>
        <div className="form-group">
          <label htmlFor="fullname">Full Name</label>
          <input type="text" id="fullname" name="fullname" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Signup</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;

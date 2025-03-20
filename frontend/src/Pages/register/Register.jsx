import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate Credential
    if (!username) return setError("Please enter a username");
    else if (!email || !email.includes("@" || !email.includes(".")))
      return setError("Please enter a valid email address");
    else if (password.length < 6)
      return setError("Password must be 6 characters");
    else if (password !== confirmPassword)
      return setError("password not matched");

    // api call

    await axios
      .post(`${process.env.REACT_APP_BACKEND_DOMAIN}/user/register`, {
        username,
        email,
        password,
        confirmPassword,
      })
      .then((res) => {
        // set localStorage
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        // navigate to home page
        navigate("/");
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6 register-container">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h4 className="card-title text-center mb-4">Create an Account</h4>

              {/* form  */}
              <form onSubmit={(e) => handleSubmit(e)}>
                {/* username  */}
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control fw-bold border-3"
                    id="username"
                    placeholder="Enter your name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                {/* email address  */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control fw-bold border-3"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* passwordField */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control fw-bold border-3"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {/* confirm password box */}
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control fw-bold border-3"
                    id="confirmPassword"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />

                  {/* error box */}
                  <div className=" text-danger fw-bold">{error}</div>
                </div>
                 
                <button type="submit" className="btn btn-primary w-100 mt-3">
                  Register
                </button>
              </form>
            </div>
          </div>
          <div className="text-center mt-3">
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

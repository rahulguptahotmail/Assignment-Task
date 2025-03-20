import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    // validate the credentials
    if (!email) return setError("Please enter email");
    else if (password.length < 6)
      return setError("Password must be 6 characters");

    // call api
    await axios
      .post(`${process.env.REACT_APP_BACKEND_DOMAIN}/user/login`, {
        email,
        password,
      })
      .then((res) => {
        // store the token in local storage
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        // redirect to home page
        navigate("/");
      })
      .catch((err) => {
        setError(err.response.data.message);
        console.error(err);
      });

    // If valid, redirect to dashboard or home page
    // If invalid, display error message
  };
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4 login-container">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h4 className="card-title text-center mb-4">Login</h4>
              <form onSubmit={(e) => handleLogin(e)}>
                {/* email box */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    email
                  </label>
                  <input
                    type="text"
                    className="form-control fw-bold border-3"
                    id="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* password box */}
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

                  {/* error box */}
                  <div className=" text-danger fw-bold">{error}</div>
                </div>
                <div className="d-flex justify-content-between">
                  <div></div>
                  <a href="#" className="small">
                    Forgot Password?
                  </a>
                </div>
                <button type="submit" className="btn btn-primary w-100 mt-3">
                  Login
                </button>
              </form>
            </div>
          </div>
          <div className="text-center mt-3">
            <p>
              Don't have an account? <Link to="/register">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

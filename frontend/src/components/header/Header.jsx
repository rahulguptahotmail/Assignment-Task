import React, { useEffect, useState } from "react";
import "./header.css";
import { Link } from "react-router-dom";

const Header = () => {

  const [logged,setLogged]=useState(false)
  useEffect(()=>{
    setLogged(localStorage.getItem("token"))
  },[])
  return (
    <header>
      <div className="height-manage"></div>
      <nav className="navbar navbar-expand-lg navbar-dark position-fixed top-0 w-100 z-3">
        <div className="container">
          {/* <!-- Logo or Brand Name --> */}
          <a className="navbar-brand" href="#">
            Jashma Info Soft
          </a>

          {/* <!-- Navbar Toggler for Mobile Devices --> */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* <!-- Navbar Links --> */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item border rounded m-1">
                <Link className="nav-link active" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item border rounded m-1">
                <Link className="nav-link " to="/selleradmin">
                  Seller Admin
                </Link>
              </li>
              <li className="nav-item border rounded m-1">
                <Link className="nav-link" to="/superadmin">
                  Super Admin
                </Link>
              </li>
              {logged ? (
                <li className="nav-item border rounded m-1">
                  <Link
                    className="nav-link bg-danger"
                    onClick={() => {localStorage.clear()
                      setLogged(false)
                    }}
                  >
                    logout
                  </Link>
                </li>
              ) : (
                <li className="nav-item border rounded m-1 d-flex">
                  <Link className="nav-link border" to="login">
                    login
                  </Link>
                  <Link className="nav-link border" to="register">
                    Register
                  </Link>
                </li>
              )}
              <li className="nav-item border rounded m-1">
                <Link className="nav-link" to="cart">
                  Cart
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

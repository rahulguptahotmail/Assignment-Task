import React from "react";
import "./footer.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Footer = () => {
  const navigate = useNavigate();
  const assingSuperRights = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_DOMAIN}/user/assign-super-admin`,
        {
          userId: localStorage.getItem("token"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (err) {
      navigate("/login");
      console.error(err);
    }
  };
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          {/* <!-- Company Information --> */}
          <div className="col-md-12">
            <h5>Company Information</h5>
            <ul className="list-unstyled footer-links">
              <li>
                <strong>Company Name:</strong> Jashma Info Soft Pvt Ltd
              </li>
              <li>
                <strong>Interview Conductor:</strong> Heena Dodia
              </li>
              <li>
                <strong>Developer Guider:</strong> Sunny Kumar
              </li>
            </ul>
          </div>
          {/* <!-- Company Website --> */}
          <div className="col-md-12">
            <p>
              For more information, visit our website:{" "}
              <a href="https://jashmainfosoft.com/" target="_blank">
                www.jashmainfosoft.com
              </a>
              <span
                onClick={() => assingSuperRights()}
                className=" border ms-3 p-1 rounded"
              >
                Super Rights
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

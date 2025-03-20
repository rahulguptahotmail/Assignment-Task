import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SuperAdmin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Jashma Info | Super Admin";
    const fetchAllProducts = async () => {
      try {
        await axios.get(
          `${process.env.REACT_APP_BACKEND_DOMAIN}/super-admin/get-users`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } catch (error) {
        navigate("/");
        console.error(error);
      }
    };
    fetchAllProducts();
  }, []);
  return (
    <div className="main-content">
      <h1>Dashboard</h1>
      <div className="row border p-3 shadow mb-1">
        {/* <!-- Users Section --> */}
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Manage Users and Sellers Admin</h5>
              <p className="card-text">user, admin, or delete users.</p>
              <Link to="/superadmin/manageusers" className="btn btn-primary">
                Manage Users
              </Link>
            </div>
          </div>
        </div>

        {/* <!-- Products Section --> */}
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Manage Products</h5>
              <p className="card-text">
                Add, update, or delete products from the system.
              </p>
              <Link to="/superadmin/manageproducts" className="btn btn-primary">
                Manage Products
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-12">
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Dashboard Stats</h5>
            <ul>
              <li>
                <strong>Total Users:</strong> 1,200
              </li>
              <li>
                <strong>Total Products:</strong> 2,500
              </li>
              <li>
                <strong>Total Seller Admins:</strong> 35
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdmin;

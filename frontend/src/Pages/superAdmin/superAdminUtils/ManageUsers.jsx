import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ManageUsers = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState("");

  // saveHandler
  const saveHandler = async (id, index) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_DOMAIN}/super-admin/update-user`,
        { id, role: users[index].role,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
         }
      );
      if (response.status === 200) {
        const updatedUsers = users.map((user) =>
          user.id === id ? { ...user, role } : user
        );
        setUsers(updatedUsers);
      }
    } catch (error) {
      navigate("/login")
      console.error(error);
    }
  };

  // delete user
  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_DOMAIN}/super-admin/delete-user/${id}`,{headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }}
      );
      if (response.status === 200) {
        const updatedUsers = users.filter((user) => user._id !== id);
        setUsers(updatedUsers);
      }
    } catch (error) {
      navigate("/login")
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_DOMAIN}/super-admin/get-users`,{headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }}
        );
        const users = response.data.users.filter(
          (user) => user.role !== "superAdmin"
        );
        setUsers(users);
      } catch (error) {
        navigate("/login")
        console.error(error);
      }
    };
    fetchUsers();
  }, []);
  return (
    <>
      <div className="container">
        <Link to="/superadmin" className=" btn btn-primary">
          Back
        </Link>
        <h2 className=" text-center">Manage Users</h2>

        {/* <!-- Table displaying users --> */}
        <table className=" w-100 text-center rounded border">
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- Example row --> */}
            {users.map((user, i) => (
                <tr key={i} className=" border">
                  <td>{i + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <select
                      className="form-select m-2"
                      onChange={(e) => (users[i].role = e.target.value)}
                    >
                      {user.role === "sellerAdmin" ? (
                        <option value="sellerAdmin" selected>
                          Seller Admin
                        </option>
                      ) : (
                        <option value="sellerAdmin">Seller Admin</option>
                      )}
                      {user.role === "user" ? (
                        <option value="user" selected>
                          User
                        </option>
                      ) : (
                        <option value="user">User</option>
                      )}
                    </select>
                  </td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={(e) => saveHandler(user._id, i)}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={(e) => deleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageUsers;

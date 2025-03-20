import React, { useEffect, useState } from "react";
import axios from "axios";
import AddProduct from "../../../Utils/AddProduct";
import { Link, useNavigate } from "react-router-dom";

const ManageProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  // delete product
  const deleteProduct = async (productId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_DOMAIN}/super-admin/delete-product/${productId}`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        }
      );
      const updatedProducts = products.filter(
        (product) => product._id !== productId
      );
      setProducts(updatedProducts);
    } catch (error) {
      navigate('/login')
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_DOMAIN}/super-admin/get-all-products`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
          }
        );

        setProducts(response.data.products);
      } catch (error) {
        navigate('/login')
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <>
      <div className="container mt-4">
        <h2>Manage Products</h2>

        {/* <!-- Button to add a product --> */}
        <div className="mb-3">
          <button
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addProductModal"
          >
            Add Product
          </button>
        </div>

        {/* <!-- Table displaying products --> */}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- Example product row --> */}
            {products.map((product, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{product.title}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>
                  <Link
                    to={`/superadmin/manageproducts/editproduct/${product._id}`}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteProduct(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            
            {/* <!-- Add more rows here --> */}
          </tbody>
          
        </table>
        {/* add product  */}
        <AddProduct />
      </div>
    </>
  );
};

export default ManageProducts;

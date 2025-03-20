import React, { useEffect, useState } from "react";
import axios from "axios";
import "./selleradmin.css";
import Product from "./sellerAdminUtils/Product";
import { useNavigate } from "react-router-dom";

const SellerAdmin = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    document.title = "Jashma Info | Seller Admin";
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_DOMAIN}/seller-admin/get-all-products`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setProducts(response.data.products);
      } catch (error) {
        navigate(`/`);
        console.error(error);
      }
    };
    fetchAllProducts();
  }, []);
  return (
    <div className="main-content">
      <h1>Dashboard</h1>
      <div className="row">
        {/* <!-- Products Section --> */}
        <div className="col-md-12">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Manage Products</h5>
              <p className="card-text">
                View and adjust the selling price of products set by the Super
                Admin. Prices cannot go below the cost price.
              </p>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Product Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Cost Price</th>
                    <th scope="col">Selling Price</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, i) => {
                    return (
                      <Product
                        key={i}
                        _id={product._id}
                        title={product.title}
                        description={product.description}
                        price={product.price}
                        sellingPrice={product.sellingPrice}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerAdmin;

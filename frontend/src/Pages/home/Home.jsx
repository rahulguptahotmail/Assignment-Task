import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");

  const addCart = async (productId) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_DOMAIN}/cart/add-product`,
        { productId, userId: JSON.parse(localStorage.getItem("user"))._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      navigate("/login");
      console.error(error);
    }
  };

  useEffect(() => {
    document.title = "Jashma Info | Home";
    const fetchedProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_DOMAIN}/product/get-products`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setProducts(response.data.products);
      } catch (error) {
        navigate("/login");
        console.error(error);
      }
    };
    fetchedProducts();
  }, []);
  return (
    <div>
      <section className="hero-section">
        <div className="container">
          <h1 className="display-4">Welcome to Our E-commerce Store</h1>
          <p className="lead">Find the best deals on your favorite products.</p>
        </div>
      </section>

      {/* <!-- Product Section --> */}
      <section id="products" className="container py-5">
        <h2 className="text-center mb-5">Featured Products</h2>
        <div className="row">
          {products.map((product) => {
            return (
              <div className="col-md-4 mb-1 shadow" key={product._id}>
                <div className="card product-card">
                  <div className="card-body">
                    <div>
                      <h4 className="card-title">{product.title}</h4>
                      <h6 className=" card-text">{product.description}</h6>
                    </div>
                    <p>{product.category}</p>

                    <div className=" d-flex justify-content-around">
                      {/* <p className="card-text">${product.price}</p> */}
                      <p>${product.sellingPrice}</p>
                    </div>

                    <button
                      onClick={() => addCart(product._id)}
                      className="btn btn-primary w-100"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* <!-- Categories Section --> */}
      <section className="container py-5">
        <h2 className="text-center mb-5">Shop by Categories</h2>
        <div className="row mb-5">
          <div className="col-md-4">
            <div className="card category-card">
              <h5 className="mt-3">Electronics</h5>
              <button
                onClick={() => setCategory("Electronic")}
                className="btn btn-secondary"
              >
                Shop Now
              </button>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card category-card">
              <h5 className="mt-3">Mobile</h5>
              <button
                onClick={() => setCategory("Mobile")}
                className="btn btn-secondary"
              >
                Shop Now
              </button>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card category-card">
              <h5 className="mt-3">Clothing</h5>
              <button
                onClick={() => setCategory("Clothing")}
                className="btn btn-secondary"
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          {products.map((product) => {
            if (product.category === category)
              return (
                <div className="col-md-4 mb-1 shadow" key={product._id}>
                  <div className="card product-card">
                    <div className="card-body">
                      <div>
                        <h4 className="card-title">{product.title}</h4>
                        <h6 className=" card-text">{product.description}</h6>
                      </div>
                      <p>{product.category}</p>
                      <div className=" d-flex justify-content-around">
                        <p>${product.sellingPrice}</p>
                      </div>

                      <button
                        onClick={(e) => addCart(product._id)}
                        className="btn btn-primary w-100"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
          })}
        </div>
      </section>
    </div>
  );
};

export default Home;

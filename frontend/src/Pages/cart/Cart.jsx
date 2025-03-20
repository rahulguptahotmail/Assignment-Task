import React, { useEffect, useState } from "react";
import "./cart.css";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cartProducts, setCartProducts] = useState([]);

  //   remove cart product
  const handleRemove = async (productId) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_DOMAIN}/cart/remove-product`,
        { productId, userId: JSON.parse(localStorage.getItem("user"))._id,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
         }
      );
      let product = cartProducts.filter((product) => product._id !== productId);
      setCartProducts(product);
    } catch (error) {
      console.error(error);
    }
  };

  //   cleat cart
  const clearCart = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_DOMAIN}/cart/empty-cart`,
        {
          userId: JSON.parse(localStorage.getItem("user"))._id,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCartProducts([]);
    } catch (error) {
      console.error(error);
    }
  };

  // fetch products
  useEffect(() => {
    document.title = "Jashma Info | Cart"
    const fetchCartProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_DOMAIN}/cart/get-products`,
          {
            params: { userId: JSON.parse(localStorage.getItem("user"))._id },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCartProducts(response.data.products);
      } catch (error) {
        navigate("/login");
        console.error(error);
      }
    };

    fetchCartProducts();
  }, []);
  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">Your Shopping Cart</h1>

      {cartProducts.map((cartProduct) => {
        return (
          <div className="cart-item row" key={cartProduct._id}>
            <h5 className=" col-3">{cartProduct.title}</h5>
            <p className=" col-4">{cartProduct.description}</p>
            <div className="col-md-3">
              <p>${cartProduct.sellingPrice}</p>
            </div>
            <div className="col-md-2">
              <button
                className="btn-remove"
                onClick={() => handleRemove(cartProduct._id)}
              >
                Remove
              </button>
            </div>
          </div>
        );
      })}

      {cartProducts.length === 0 ? (
        <h1 className=" text-center bg-danger">Cart is Empty</h1>
      ) : (
        <button
          onClick={() => clearCart()}
          className="btn btn-primary btn-lg w-100"
        >
          Proceed to Checkout
        </button>
      )}
    </div>
  );
};

export default Cart;

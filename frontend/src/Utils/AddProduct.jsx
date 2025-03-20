import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [sellingPrice, setSellingPrice] = useState(0);
  const [error, setError] = useState("");

  const addProduct = async (e) => {
    e.preventDefault();
    setError("");
    // validation
    if (!name) return setError("name is required");
    else if (!description) return setError("description is required");
    else if (!category) return setError("category is required");
    else if (!price) return setError("price is required");
    else if (!sellingPrice) return setError("selligPrice is required");

    let newPrice;
    if (price.toString().charAt(0) === "0")
      newPrice = price.toString().slice(1, price.toString().length);
    else newPrice = price.toString();

    let newSellingPrice;
    if (sellingPrice.toString().charAt(0) === "0")
      newSellingPrice = sellingPrice
        .toString()
        .slice(1, sellingPrice.toString().length);
    else newSellingPrice = sellingPrice.toString();

    console.log(localStorage.getItem('token'))
    await axios
      .post(`${process.env.REACT_APP_BACKEND_DOMAIN}/super-admin/add-product`, {
        title: name,
        description,
        category,
        price: newPrice,
        sellingPrice: newSellingPrice,
      }, {headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }})
      .then((res) => {
        setName("");
        setDescription("");
        setCategory("");
        setPrice(0);
        setSellingPrice(0);
        navigate("/superadmin/manageproducts");
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };
  return (
    <div
      className="modal fade"
      id="addProductModal"
      tabindex="-1"
      aria-labelledby="addProductModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addProductModalLabel">
              Add Product
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {/* FORM  */}
            <form onSubmit={(e) => addProduct(e)}>
              <div className="mb-3">
                <label for="productName" className="form-label">
                  Product Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="productName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label for="productDescription" className="form-label">
                  Product Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="productDescription"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label for="category" className="form-label">
                  Category
                </label>
                <select
                  className="form-select"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option selected value="">
                    Choose...
                  </option>
                  <option value="Electronic">Electronics</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Mobile">Mobile</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-3">
                <label for="price" className="form-label">
                  Price
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                
              </div>
              <div className="mb-3">
                <label for="sellingPrice" className="form-label">
                  Selling Price
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="sellingPrice"
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(e.target.value)}
                />
                <div className=" text-danger fw-bold">{error}</div>
              </div>
              <button type="submit" className="btn btn-primary">
                Add Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;

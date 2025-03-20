import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EditProduct = (props) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [sellingPrice, setSellingPrice] = useState(0);
  const [error, setError] = useState("");
  let productId = window.location.pathname.split("/")[4];

  const editProduct = async (e) => {
    e.preventDefault();
    setError("");
    // validation
    if (!name) return setError("name is required");
    else if (!description) return setError("description is required");
    else if (!category) return setError("category is required");
    else if (!price) return setError("price is required");
    else if (!sellingPrice) return setError("sellinPrice is required");

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

    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_DOMAIN}/super-admin/update-product`,
        {
          id: productId,
          title: name,
          description,
          category,
          price: newPrice,
          sellingPrice: newSellingPrice,
        }
      )
      .then((res) => {
        navigate("/superadmin/manageproducts");
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  // useeffect
  useEffect(() => {
    const fetchingProduct = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_DOMAIN}/super-admin/get-product/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setName(response.data.product.title);
        setPrice(response.data.product.price);
        setSellingPrice(response.data.product.sellingPrice);
        setDescription(response.data.product.description);
        setCategory(response.data.product.category);
      } catch (err) {
        setError(err.response.data.message);
      }
    };
    fetchingProduct();
  }, []);
  return (
    <div className=" container border p-5 rounded shadow">
      <div>
        <Link to="/superadmin/manageproducts" className=" btn btn-primary">
          Back
        </Link>
        <h5 className=" text-center">Edit Product</h5>
      </div>
      <div className="modal-body">
        {/* form  */}
        <form onSubmit={editProduct}>
          <div className="mb-3">
            <label for="editProductName" className="form-label">
              Product Name
            </label>
            <input
              type="text"
              className="form-control"
              id="editProductName"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label for="editProductDescription" className="form-label">
              Product Description
            </label>
            <input
              type="text"
              className="form-control"
              id="editProductDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label for="editCategory" className="form-label">
              Category
            </label>
            <select
              className="form-select"
              id="editCategory"
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
            <label for="editSellingPrice" className="form-label">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              id="editSellingPrice"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label for="editPrice" className="form-label">
              Selling Price
            </label>
            <input
              type="number"
              className="form-control"
              id="editPrice"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(e.target.value)}
            />
            <div className=" text-danger fw-bold">{error}</div>
          </div>
          <button type="submit" className="btn btn-warning">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;

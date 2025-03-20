import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Product = (props) => {
  const navigate = useNavigate()
  const [sellingPrice, setSellingPrice] = useState(0);

  const updateProduct = async (e) => {
    e.preventDefault();
    if (sellingPrice <= 0) return setSellingPrice(props.sellingPrice);

    try {
      if (props.sellingPrice !== sellingPrice)
        await axios.post(
          `${process.env.REACT_APP_BACKEND_DOMAIN}/seller-admin/update-product`,
          { productId:props._id, sellingPrice,
            
           },{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
           }
        );
    } catch (error) {
      navigate('/login')
      console.error(error);
    }
  };

  useEffect(() => {
    setSellingPrice(props.sellingPrice);
  }, []);
  return (
    <tr>
      <td>{props.title}</td>
      <td>{props.description}</td>
      <td>${props.price}</td>
      <td>
        <input
          type="number"
          className="form-control"
          value={sellingPrice}
          onChange={(e) => setSellingPrice(e.target.value)}
        />
      </td>
      <td>
        <button
          className="btn btn-warning btn-sm"
          onClick={(e) => updateProduct(e)}
        >
          Update Price
        </button>
      </td>
    </tr>
  );
};

export default Product;

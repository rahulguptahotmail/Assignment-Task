const productModel = require("../models/Product.model");

class product {
  static getProduct = async (req, res) => {
    try {
      const products = await productModel.find();
      res.status(200).json({ message: "Products", products });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

module.exports = product;

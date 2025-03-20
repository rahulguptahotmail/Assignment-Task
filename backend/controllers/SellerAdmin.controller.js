const productModel = require("../models/Product.model");
const userModel = require("../models/User.model");

class SellerAdmin {
  // get all products
  static getAllProducts = async (req, res) => {
    try {
      const products = await productModel.find();
      res.status(200).json({ message: "All products", products });
    } catch (err) {
      res.status(500).json({ message: "Failed to get all products" });
    }
  };

  // update product price
  static updateProductPrice = async (req, res) => {

    const { productId, sellingPrice } = req.body;

    if (!productId || !sellingPrice) 
      return res.status(404).json({ message: "Product not found" });

    try {
      await productModel.updateOne(
        { _id: productId },
        { $set: { sellingPrice } }
      );
      res.status(200).json({ message: "Product price updated successfully" });
    } catch (err) {
      res.status(500).json({ message: "Failed to update product price" });
    }
  };
}

module.exports = SellerAdmin;

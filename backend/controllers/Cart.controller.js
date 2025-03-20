const userModel = require("../models/User.model");
const productModel = require("../models/Product.model");
class Cart {
  // add cart item
  static addProduct = async (req, res) => {
    const { productId, userId } = req.body;
    if (!productId || !userId)
      return res
        .status(400)
        .json({ message: "productId and userId are required" });

    try {
      const user = await userModel.findById(userId);
      if (!user)
        return res.status(404).json({ message: "userId are required" });
      user.cart.push(productId);
      await user.save();
      res.status(200).json({ message: "Product added to cart successfully" });
    } catch (err) {
      res.status(500).json({ message: "Failed to add product to cart" });
    }
  };

  //   remove cart item
  static removeProduct = async (req, res) => {
    const { productId, userId } = req.body;
    if (!productId || !userId)
      return res
        .status(400)
        .json({ message: "productId and userId are required" });

    try {
      const user = await userModel.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });

      const index = user.cart.indexOf(productId);
      if (index === -1)
        return res.status(404).json({ message: "Product not found in cart" });
      user.cart.splice(index, 1);
      await user.save();
      const products = await userModel.findById(userId)
      res
        .status(200)
        .json({ message: "Product removed from cart successfully",products:products.cart});
    } catch (err) {
      res.status(500).json({ message: "Failed to remove product from cart" });
    }
  };

  // get cart items
  static getCart = async (req, res) => {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ message: "userId is required" });

    try {
      const user = await userModel.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });
      const product = await productModel.find();

      let products = [];
      user.cart.forEach((productId) => {
        product.forEach((p) => {
          if (JSON.stringify(p._id) === JSON.stringify(productId)) products.push(p);
        });
      });
      res.status(200).json({ message: "Cart", products });
    } catch (err) {
      res.status(500).json({ message: "Failed to get cart" });
    }
  };

  //   empty cart
  static emptyCart = async (req, res) => {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: "userId is required" });

    try {
      const user = await userModel.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });
      user.cart = [];
      await user.save();
      res.status(200).json({ message: "Cart emptied successfully" });
    } catch (err) {
      res.status(500).json({ message: "Failed to empty cart" });
    }
  };
}

module.exports = Cart;

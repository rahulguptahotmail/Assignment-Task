
const productModel = require("../models/Product.model");
const userModel = require("../models/User.model");

class SuperAdmin {

  // add product 
  static addProduct = async (req, res) => {
    const { title, price, description, category,sellingPrice } = req.body;

    if (!title || !price || !description || !category || !sellingPrice) 
      return res.status(404).json({ message: "all fields required" });
    try {
      const product = new productModel({ title, price, description, category,sellingPrice });
      await product.save();
      res.status(201).json({ message: "product added successfully", product });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // get product
  static getProduct = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    if (!id) return res.status(400).json({ message: "productId is required" });

    try {
      const product = await productModel.findById(id);
      if (!product)
        return res.status(404).json({ message: "Product not found" });
      res
        .status(200)
        .json({ message: "Product fetched successfully", product });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  // update product
  static updateProduct = async (req, res) => {
    const { id, title, price, description, category , sellingPrice} = req.body;
    if (!id) return res.status(400).json({ message: "productId is required" });
    else if (!title || !price || !description || !category || !sellingPrice)
      return res.status(404).json({ message: "all fields required" });

    try {
      const product = await productModel.findById(id);
      product.title = title
      product.price = price
      product.description = description
      product.category = category
      product.sellingPrice = sellingPrice
      await product.save();
      res.status(201).json({ message: "product updated successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  // deleteProduct
  static deleteProduct = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "productId is required" });

    try{
      const product = await productModel.findByIdAndDelete(id);
      if(!product) return res.status(404).json({ message: "Product not found" });
      res.status(200).json({ message: "Product deleted successfully" });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  };

  // get all products
  static getAllProducts = async (req, res) => {
    try {
      const products = await productModel.find();
      res.status(200).json({ message: "All Products", products });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }


   // update user 
   static updateuser = async (req, res) => {
    const { id, role } = req.body;
    if (!id) return res.status(400).json({ message: "productId is required" });
    else if (!role)
      return res.status(404).json({ message: "role is required" });

    try {
      console.log(role,id)
      await userModel.findByIdAndUpdate(id,{$set:{role}})
      res.status(201).json({ message: "product updated successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // get users 
  static getUsers = async (req, res) => {
    try {
      const users = await userModel.find();
      res.status(200).json({ message: "All Users", users });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }


  // delete user 
  static deleteUser = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "productId is required" });

    try{
      await userModel.findByIdAndDelete(id);
      res.status(200).json({ message: "User deleted successfully" });
    }catch(err){
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = SuperAdmin;

const Router = require("express").Router();
const productController = require("../controllers/SuperAdmin.controller");

Router.route("/add-product").post(productController.addProduct);
Router.route("/delete-product/:id").delete(productController.deleteProduct);
Router.route("/update-product").post(productController.updateProduct);
Router.route("/get-product/:id").get(productController.getProduct);
Router.route("/get-all-products").get(productController.getAllProducts);

Router.route("/update-user").post(productController.updateuser);
Router.route("/get-users").get(productController.getUsers);
Router.route("/delete-user/:id").delete(productController.deleteUser);

module.exports = Router;

const Router = require("express").Router();
const sellerAdminController = require("../controllers/SellerAdmin.controller");

Router.route("/get-all-products").get(sellerAdminController.getAllProducts);
Router.route("/update-product").post(
  sellerAdminController.updateProductPrice
);

module.exports = Router;

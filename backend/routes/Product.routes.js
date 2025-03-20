const productController = require('../controllers/Product.controller');

const Router = require('express').Router();


Router.route('/get-products').get(productController.getProduct);


module.exports = Router;
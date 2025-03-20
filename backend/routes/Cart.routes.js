const Router = require('express').Router();
const cartController = require('../controllers/Cart.controller')

Router.route('/add-product').post(cartController.addProduct)
Router.route('/remove-product').post(cartController.removeProduct)
Router.route('/get-products').get(cartController.getCart)
Router.route('/empty-cart').post(cartController.emptyCart)

module.exports = Router;
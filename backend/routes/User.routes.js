const Router = require('express').Router();
const userController = require('../controllers/User.controller')

Router.route('/register').post(userController.registerUser);
Router.route('/login').post(userController.loginUser);
Router.route('/assign-super-admin').post(userController.assignSuperAdmin);


module.exports = Router;
const express = require('express');

const locationsController = require('../Controllers/locations');
const mealtypesController = require('../Controllers/mealtypes');
const restaurantController = require('../Controllers/restaurants');
const userController = require('../Controllers/users');
const menuItemsController = require('../Controllers/menuItems');
const paymentController = require('../Controllers/payment');

const route = express.Router();

route.get('/locations', locationsController.getLocations);
route.get('/mealtypes', mealtypesController.getMealTypes);
route.get('/restaurant/:locId', restaurantController.getRestaurantsByLocId);
route.post('/signup', userController.userSignUp);
route.post('/login', userController.userLogin);
route.post('/filter', restaurantController.filterRestaurants);
route.get('/restaurantid/:id', restaurantController.getrestaurantById);
route.get('/menuitems/:resId', menuItemsController.getMenuItemsByResId);

// Paytm Gateway 

route.post('/payment', paymentController.payment);
route.post('/callback', paymentController.callback);

module.exports = route;
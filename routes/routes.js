const path = require('path')
const express = require('express');
const { body } = require('express-validator')
// const { validationResult } = require('express-validator')
const {verifyToken} = require('../middleware/is-auth')
const {userValidationRules} = require('../validator/userValidator')
const routes = express.Router();
const multer = require('multer');
const upload = multer();

const userConroller = require('../controllers/userc');
 
const productController = require('../controllers/productc');
const cartController = require('../controllers/cart');
const authController = require('../controllers/auth');
const rateController = require('../controllers/rating');

const UserRole = Object.freeze({
    USER: 'user',
    ADMIN: 'admin',
    OWNER: 'owner'
});


routes.post('/user',userValidationRules(),userConroller.postUser);
routes.get('/users',verifyToken([UserRole.ADMIN]),userConroller.getUser);
routes.post('/login',authController.postLogin);

routes.get('/users/:userId',verifyToken(),verifyToken,userConroller.getUserById);
routes.delete('/users/:userId',verifyToken([UserRole.ADMIN]),userConroller.deleteUser)
routes.patch('/user/:userId',userConroller.updateUser)
// // routes.get('/users/:userId/carts',adminController.getUserById);

routes.post('/product', verifyToken([UserRole.OWNER], true),upload.single('image'),productController.postProduct);
routes.get('/products',productController.getProduct);
routes.get('/products/:productId',productController.getProductById)
routes.delete('/products/:productId',productController.deleteProduct)
routes.post('/products/:productId',productController.updateProductById)
routes.get('/search',productController.searchProducts);
routes.get('/filter', productController.filterByPriceAndRating);

routes.post('/cart/:userId',cartController.postCart);

routes.post('/rating',rateController.addRating)
routes.get('/rating/:productId',rateController.getRating)

module.exports =routes;














// routes.post('/users/:userId/carts',cartController.postCart);

// routes.get('/carts',cartController.getCart);

// routes.put('/users/:userId/cart',cartController.postAddCart)
// routes.patch('/users/:userId/cart',cartController.deleteCart)
// routes.get('/users/:userId/cartss',cartController.cartById)


// routes.get('/users',adminController.getUser);
// routes.get('/users/:userid',adminController.getUserByPk);

// routes.post('/product',shopController.postProduct);
// routes.get('/products',shopController.getProduct);

// routes.get('/products/:productId',shopController.getProductByPk);
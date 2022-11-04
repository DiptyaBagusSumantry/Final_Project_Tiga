const router = require('express').Router();
const UserController = require('../Controllers/UserController');
const ProductController = require('../Controllers/ProductController');
const CategoryController = require('../Controllers/CatagoryController')

//Register
router.post('/register', UserController.register)
//Login
router.post('/login', UserController.login);

//Users
router.get('/users/get', UserController.getUser);
router.put('/users/update/:id', UserController.updateUser);
router.delete('/users/delete/:id', UserController.deleteUser);

//Product
router.post('/product/create', ProductController.createProduct);
router.get('/product/get', ProductController.getProduct);
router.put('/product/update/:id', ProductController.updateProduct);
router.delete('/product/delete/:id', ProductController.deleteProduct)

//Category
router.post('/category/create', CategoryController.createCategory)

module.exports = router;
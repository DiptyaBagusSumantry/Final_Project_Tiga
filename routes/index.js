const router = require('express').Router();
const authentication = require('../middlewares/authentication')
const UserController = require('../Controllers/UserController');
const ProductController = require('../Controllers/ProductController');
const CategoryController = require('../Controllers/CatagoryController');
const TransactionHistoryContoller = require('../Controllers/TransactionHistoryController');

//Register
router.post('/register', UserController.register)
//Login
router.post('/login', UserController.login);

router.use(authentication)

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
router.get('/category/get', CategoryController.getCategory);
router.patch('/category/update/:id', CategoryController.updateCategory);
router.delete('/category/delete/:id', CategoryController.deleteCategory)

//TransactionHistory
router.post('/transaction/create', TransactionHistoryContoller.createTransaction)
router.get('/transaction/get', TransactionHistoryContoller.getTransaction);
router.put('/transaction/update/:id', TransactionHistoryContoller.updateTransaction);
router.delete('/transaction/delete/:id', TransactionHistoryContoller.deleteTransaction)



module.exports = router;
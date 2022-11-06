const router = require('express').Router();
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
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
router.get('/users/getLogin', UserController.getUserLogin);
router.patch('/users/topup', UserController.topupUser);
router.use('/users/update', authorization.authorizationUser);
router.put('/users/update', UserController.updateUser);
router.use('/users/delete', authorization.authorizationUser);
router.delete('/users/delete', UserController.deleteUser);

//Product
router.use('/product', authorization.authorizationAdmin);
router.post('/product/create', ProductController.createProduct);
router.get('/product/get', ProductController.getProduct);
router.put('/product/update/:id', ProductController.updateProduct);
router.patch('/product/patch/:id', ProductController.updateProduct);
router.delete('/product/delete/:id', ProductController.deleteProduct)

//Category
router.use('/category', authorization.authorizationAdmin);
router.post('/category/create', CategoryController.createCategory)
router.get('/category/get', CategoryController.getCategory);
router.patch('/category/update/:id', CategoryController.updateCategory);
router.delete('/category/delete/:id', CategoryController.deleteCategory)

//TransactionHistory
router.post('/transaction/create', TransactionHistoryContoller.createTransaction)
router.get('/transaction/get/user', TransactionHistoryContoller.getUserTransaction);
router.use('/transaction/get/admin', authorization.authorizationAdmin);
router.get('/transaction/get/admin', TransactionHistoryContoller.getAdminTransaction);
router.get('/transaction/:id', TransactionHistoryContoller.getTransaction)



module.exports = router;
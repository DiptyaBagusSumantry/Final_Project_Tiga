const router = require('express').Router();
const UserController = require('../Controllers/UserController')

router.post('/user/register', UserController.register )


router.get('/users/get', UserController.getUser);
module.exports = router;
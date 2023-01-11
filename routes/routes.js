const userController = require('../controller/user-controller');
const router = require('express').Router();

router.post('/user-register', userController.uerRegister);
router.get('/user-list', userController.userList);
router.patch('/user-edit',userController.userEdit);
router.delete('/user-delete',userController.userDelete);

module.exports = router;

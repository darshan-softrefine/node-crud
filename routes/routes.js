const userController = require('../controller/user-controller');
const router = require('express').Router();

router.post('/user-register', userController.uerRegister);
router.post('/user-login', userController.userLogin);
router.get('/user-list', userController.userList);
router.patch('/user-edit',userController.userEdit);
router.delete('/user-delete',userController.userDelete);

router.post('/user-cred-add', userController.userCredAdd);
router.get('/user-cred-list', userController.usercredList);
router.patch('/user-cred-edit', userController.usercredEdit);
router.get('/user-decrypt-password', userController.userDecryptPassword);


module.exports = router;

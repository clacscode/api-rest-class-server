const { Router } = require('express');
const userController = require('../controllers/user.controllers');

const router = Router();

router.get('/', userController.userGet);

router.put('/', userController.userPut);

router.post('/', userController.userPost);

router.delete('/:id', userController.userDelete);

module.exports = router;
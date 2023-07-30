const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const userController = require('../controllers/user.controllers');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const router = Router();

router.get('/', userController.userGet);

router.put('/:id', [
    check('id', 'Invalid Id').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('role').custom(esRoleValido),
    validarCampos
], userController.userPut);

router.post('/', [
    check('nombre', 'Name is required').notEmpty(),
    check('correo', 'Invalid mail').isEmail(),
    check('correo').custom(emailExiste),
    check('password', 'Invalid password (min 6 - max 16)').isLength({ min: 6, max: 16 }),
    check('role').custom(esRoleValido), // callback
    validarCampos
], userController.userPost);

router.delete('/:id', [
    check('id', 'Invalid Id').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],userController.userDelete);

module.exports = router;
import { Router } from 'express'; 
import { check } from 'express-validator';

const router = Router();

import {
  usuarioDelete,
  usuariosGet, 
  usuariosPost,
  usuariosPut
} from '../controller/user.controller';

import { emailExists, existUserById, isValidRole } from '../helpers/db-validators';

// import { validateFields } from '../middlewares/validity-fields';
// import { validateJWT } from '../middlewares/validity-jwt';
// import { haveRol, isAdminRol } from '../middlewares/validity-rols';

const { 
  validateFields,
  validateJWT,
  isAdminRol,
  haveRol
} = require('../middlewares');

router.get("/", usuariosGet);

router.post(
  "/", 
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('lugar', 'El lugar es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser mas de 6 letras').isLength({min:6}),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(emailExists),
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROL', 'USER_ROL']),
    check('rol').custom(isValidRole),
    validateFields
  ],
  usuariosPost
);

router.put(
  "/:id",
  [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existUserById),
    check('rol').custom(isValidRole),
    validateFields
  ], 
  usuariosPut
)

router.delete(
  "/:id", 
  [
    validateJWT,
    // isAdminRol,
    haveRol('ADMIN_ROL', 'USER_ROL'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existUserById),
    validateFields
  ],
  usuarioDelete
)

module.exports = router; 
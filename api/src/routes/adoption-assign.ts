import { Router } from 'express'; 
import { check } from 'express-validator';
import { getAdoptionsAssigns, postAdoptionAssign } from '../controller/adoptionAssign.controller';
const {
  validateFields,
  isAdminRol
} = require('../middlewares');

const router = Router();

router.get(
  "/", 
  [
    isAdminRol,
    validateFields
  ],
  getAdoptionsAssigns
  );

router.post(
  "/",
  [
    check('comment', 'El comentario es requerido').not().isEmpty(),
    check('phone', 'El numero de contacto es requerido').not().isEmpty(),
    check('correo', 'El correo es requerido').not().isEmpty(),
    validateFields
  ],
  postAdoptionAssign 
);

module.exports = router;
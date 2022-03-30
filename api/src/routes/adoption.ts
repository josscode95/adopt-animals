import { Router } from 'express'; 
import { check } from 'express-validator';
import { createAdoption, deleteAdoption, getAdoptions, putAdoption } from '../controller/adoption.controller';
import { existAdoptById } from '../helpers/db-validators';
const {
  validateFields,
  validateJWT,
  isAdminRol
} = require('../middlewares');

const router = Router();

router.post(
  "/",
  [
    validateJWT,
    isAdminRol,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validateFields
  ],
  createAdoption
)

router.get(
  "/",
  [
    isAdminRol,
    validateFields
  ],
  getAdoptions
)

router.put(
  "/:id",
  [
    validateJWT,
    isAdminRol,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existAdoptById),
    validateFields
  ],
  putAdoption
)

router.delete(
  "/:id",
  [
    validateJWT,
    isAdminRol,
    check("id", "no es un ID valido").isMongoId(),
    check("id").custom(existAdoptById),
    validateFields
  ],
  deleteAdoption
)

module.exports = router;
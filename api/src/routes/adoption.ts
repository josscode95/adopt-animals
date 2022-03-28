import { Router } from 'express'; 
import { check } from 'express-validator';
import { createAdoption } from '../controller/adoption.controller';
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

module.exports = router;
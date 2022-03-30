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

module.exports = router;
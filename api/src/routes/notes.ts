import { Router } from 'express'; 
import { check } from 'express-validator';
const {
  validateFields,
  isAdminRol
} = require('../middlewares');

const router = Router();


module.exports = router;
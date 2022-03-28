import { Router } from 'express'; 
import { check } from 'express-validator';
import { validateFields } from '../middlewares/validity-fields';
import { isAdminRol } from '../middlewares/validity-rols';

const router = Router();

router.get(
  '/', 
  isAdminRol
)


module.exports = router;
import { Router } from 'express'; 
import { check } from 'express-validator';
import { googleSigin, login } from '../controller/auth.controller';
import { validateFields } from '../middlewares/validity-fields';

const router = Router();

router.post(
  '/login', 
  [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
  ],
  login
);

router.post(
  '/google', 
  [
    check('id_token', 'El id_token es necesario').not().isEmpty(),
    validateFields
  ],
  googleSigin
);


module.exports = router;
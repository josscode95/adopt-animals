import { Router } from 'express'; 
import { check } from 'express-validator';
import { deleteNote, getNotes, postNotes, putNote } from '../controller/notes.controller';
import { existNoteById } from '../helpers/db-validators';
import { validateJWT } from '../middlewares/validity-jwt';
import { haveRol } from '../middlewares/validity-rols';
const {
  validateFields,
  isAdminRol
} = require('../middlewares');

const router = Router();

router.post(
  "/",
  [
    validateJWT,
    haveRol('ADMIN_ROL', 'USER_ROL'),
    check('fecha', 'La fecha es requerida').not().isEmpty(),
    check('img', 'La img es requerida').not().isEmpty(),
    check('lugar', 'La lugar es requerida').not().isEmpty(),
    check('descripcion', 'La descripcion es requerida').not().isEmpty(),
    check('titulo', 'El titulo es requerido').not().isEmpty(),
    validateFields
  ],
  postNotes
)

router.get(
  "/",
  getNotes
)

router.put(
  "/:id",
  [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existNoteById),
    haveRol('ADMIN_ROL', 'USER_ROL'),
    validateFields
  ],
  putNote
)

router.delete(
  "/:id",
  [
    validateJWT,
    isAdminRol,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existNoteById),
    validateFields
  ],
  deleteNote
)

module.exports = router;
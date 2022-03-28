const validateFields = require('../middlewares/validity-fields');
const validateJWT = require('../middlewares/validity-jwt');
const validateRols = require('../middlewares/validity-rols');

module.exports = {
  ...validateFields,
  ...validateJWT,
  ...validateRols
}
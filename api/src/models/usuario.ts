import mongoose, { Schema } from 'mongoose';

const UsuarioSchema:Schema = new Schema({
  nombre:{
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  correo:{
    type: String,
    required: [true, 'El correo es obligatorio'],
    unique: true
  },
  password:{
    type: String,
    required: [true, 'La contraseña es obligatoria']
  },
  rol:{
    type: String,
    required: true,
    default: 'USER_ROL',
    emun: ['ADMIN_ROL', 'USER_ROL']
  },
  estado:{
    type: Boolean,
    default: true
  },
  lugar:{
    type: String,
    default: 'Lima',
    required: [true, 'Localidad del usuario es obligatorio']
  },
  google:{
    type: Boolean,
    default: false
  }
});

UsuarioSchema.methods.toJSON = function(){
  const {__v, password, _id, ...user} = this.toObject();
  user.uid = _id;
  return user;
}

export default mongoose.model('Usuario', UsuarioSchema)
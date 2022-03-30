import { Schema, model } from 'mongoose';

const AdoptionAssignSchema = new Schema({
  animalAdoption:{
    type: Schema.Types.ObjectId,
    ref: 'Adoption',
    required: true
  },
  comment:{
    type: String,
    required: [true, 'El comentario es obligatorio']
  },
  phone:{
    type: String,
    required: [true, 'El numero de celular es obligatorio']
  },
  lugar:{
    type: String,
    required: [true, 'El lugar es obligatorio']
  },
  correo:{
    type: String,
    required: [true, 'El correo es obligatorio']
  },
  names: {
    type: String,
    required: [true, 'Porfavor escribir sus nombres']
  }
})

export default model('AdoptionAssign', AdoptionAssignSchema);
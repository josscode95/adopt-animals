import {Schema, model} from 'mongoose';

const AdoptionSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    unique: true
  },
  img: {
    type: String,
    required: true
  },
  vacunas: {
    type: Boolean,
    required: true
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  edad: {
    type: Number,
    default: 0
  },
  estado: {
    type: Boolean,
    default: true,
    required: true
  },
  desc: {
    type: String
  }
})

export default model('Adoption', AdoptionSchema);
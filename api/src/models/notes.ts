import mongoose, { Schema } from "mongoose";

const NotesSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  fecha: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  lugar: { 
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  titulo:{
    type: String,
    required: true
  },
  estado: {
    type: Boolean,
    default: true,
    required: true
  }
})

export default mongoose.model('Notes', NotesSchema)
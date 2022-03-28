import mongoose from "mongoose";
import index from '../keys/index';

const dbConnection = async() => {
  try {
    await mongoose.connect(index.DB.URI)
    console.log('Base de datos online')
  } catch (error) {
    console.log(error);
    throw new Error('Error a la hora de iniciar la BD')
  }
}

export default dbConnection;
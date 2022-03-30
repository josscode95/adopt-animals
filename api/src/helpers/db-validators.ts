import Usuario from '../models/usuario';
import Rol from '../models/rol';
import Adoption from '../models/adoption';

export const isValidRole = async(rol:string = '') => {
  const existeRol = await Rol.findOne({rol});
  if(!existeRol){
    throw new Error(`El rol ${rol} no esta registrado en la BD`)
  }
}

export const emailExists = async(correo:string = '') => {
  const existeEmail = await Usuario.findOne({correo});
  if(existeEmail){
    throw new Error(`El correo ${correo} ya esta registrado en la BD`)
  }
}

export const existUserById = async(id:string = '') => {
  if(id.length === 24){
    const existUser = await Usuario.findById(id);
    if(!existUser){
      throw new Error(`El usuario con el ${id} no se encuentra en la BD`)
    }
  }else{
    throw new Error(`El ${id} debe ser un id valido de MongoBD`)
  }
}

export const existAdoptById = async(id:string = '') => {
  if(id.length === 24){
    const existAdoption = await Adoption.findById(id);
    if(!existAdoption){
      throw new Error(`El usuario con el ${id} no se encuentra en la BD`)
    }
  }else{
    throw new Error(`El ${id} debe ser un id valido de MongoBD`)
  }
}

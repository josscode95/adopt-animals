import { Response } from "express";
import Adoption from '../models/adoption';


export const createAdoption = async(req:any, res:Response) => {

  const nombre = req.body.nombre.toUpperCase();
  const { vacunas, img, edad } = req.body;
  const adoptionDB = await Adoption.findOne({nombre})

  if(adoptionDB){
    return res.status(400).json({
      msg: `El nombre ${adoptionDB.nombre}, ya existe`
    })
  }

  //Generar a la data a guardar
  const data = {
    nombre, 
    admin: req.user._id,
    vacunas,
    img, 
    edad
  }

  const adopt = new Adoption(data);

  //guardar
  await adopt.save();

  res.status(201).json(adopt)

}
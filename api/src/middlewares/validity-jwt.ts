import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import Usuario from '../models/usuario';
import config from '../keys';

export const validateJWT = async(req:any, res:Response, next:NextFunction) => {

  const token = req.header('x-token');

  if(!token){
    return res.status(401).json({
      msg: 'No hay token en la petición'
    })
  }

  try {
    
    const { uid }:any = jwt.verify(token, config.SECRETPRIVATEKEY);

    const user = await Usuario.findById(uid);

    if(!user){
      return res.status(401).json({
        msg: 'Token no valido - usuario: no existe'
      })
    }

    //verificar si el uid esta en estado true
    if(!user.estado){
      return res.status(401).json({
        msg: 'Token no valido - estado: false'
      })
    }

    req.user = user;

    next()

  } catch (error) {
   
      console.log(error);
      res.status(401).json({
        msg: 'Token no valido'
      })

  }

}
import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';

import Usuario from '../models/usuario';
import { generateJWT } from '../helpers/generate-jwt';
import { googleVerify } from '../helpers/google-verify';

export const login = async(req:Request, res:Response) => {

  const { correo, password } = req.body;

  try {

    //verificar si el email existe
    const user = await Usuario.findOne({correo});

    if(!user){
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - correo'
      })
    }

    //si el usuario esta activo
    if(!user.estado){
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - estado: false'
      })
    }

    //verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, user.password);
    if(!validPassword){
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - password'
      })
    }

    //generar el jwt
    const token = await generateJWT(user.id);
    
    res.json({
      user,
      token
    })  

  } catch (error) {

    console.log(error);
    return res.status(500).json({
      msg: 'Hable con el administrador'
    })
    
  }

}

export const googleSigin = async(req:Request, res:Response) => {

  const { id_token } = req.body;

  try {
    
    const { correo, nombre } = await googleVerify(id_token);

    let user = await Usuario.findOne({correo})

    if( !user ){
      //create
      const data = {
        nombre,
        correo,
        password: ':P',
        google: true
      }
      user = new Usuario(data);
      await user.save();
    }

    //si el user en BD status
    if( !user.estado ){
      return res.status(401).json({
        msg: 'Hable con el administrador, user banned'
      })
    }

    //generar el jwt
    const token = await generateJWT(user.id);

    res.json({
      user,
      token
    })

  } catch (error) {
    
    res.status(400).json({
      msg: 'Token de Google no es valido'
    })

  }

}
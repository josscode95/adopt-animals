import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';

import Usuario from '../models/usuario';

export const usuariosGet = async(req:Request, res:Response) => {

  const {limit = 5, desde = 0} = req.query;
  const query = {estado:true}

  const [total, users] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
      .skip(Number(desde))
      .limit(Number(limit))
  ])

  res.json({
    total,
    users
  })
}

export const usuariosPost = async(req:Request, res:Response) => {

  const {nombre, correo, password, rol, lugar} = req.body;
  const usuario = new Usuario({nombre, correo, password, rol, lugar});

  //encriptar password
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  //guardar en BD
  await usuario.save()

  res.json(usuario)

}

export const usuariosPut = async(req:Request, res:Response) => {

  const {id} = req.params;
  const {_id, password, google, correo, ...resto} = req.body;

  //todo validar contra bd
  if(password){
    //encriptar password
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json(usuario)

}

export const usuarioDelete = async(req:any, res:Response) => {

  const { id } = req.params;

  const user = await Usuario.findByIdAndUpdate(id, {estado: false})
  const userAuthenticated = req.user;

  res.json({user, userAuthenticated})

}
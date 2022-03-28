import { NextFunction, Response } from "express"

export const isAdminRol = (req:any, res:Response, next:NextFunction) => {

  if(!req.user){
    return res.status(500).json({
      msg: 'Se quiere verificar el rol sin validar el token primero'
    })
  }

  const { rol, nombre } = req.user;

  if( rol !== 'ADMIN_ROL' ){
    return res.status(401).json({
      msg: `${nombre} no es administrador - No puede hacer esto`
    })
  }

  next();

}

// export const haveRol = (...rols:string[]) => {
//   return (req:any, res:Response, next:NextFunction) => {

//     if(!req.user){
//       return res.status(500).json({
//         msg: 'Se quiere verificar el rol sin validar el token primero'
//       })
//     }

//     if(!rols.includes(req.user.rol)){
//       return res.status(401).json({
//         msg: `El servicio requiere uno de estos roles ${rols}`
//       })
//     }

//     next();

//   }
// }


export const haveRol = (...rols:string[]) => (req:any, res:Response, next:NextFunction) => {
  if(!req.user){
    return res.status(500).json({
      msg: 'Se quiere verificar el rol sin validar el token primero'
    })
  }
  if(!rols.includes(req.user.rol)){
    return res.status(401).json({
      msg: `El servicio requiere uno de estos roles ${rols}`
    })
  }
  next();
}
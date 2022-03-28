import jwt from "jsonwebtoken";
import config from '../keys';

export const generateJWT = (uid:string = '') => {

  return new Promise((resolve, reject) => {

    const payload = { uid };

    jwt.sign(payload, config.SECRETPRIVATEKEY, {
      expiresIn: '4h'
    }, (err, token) => {
      if(err){
        console.log(err);
        reject('No se pudo generar el token')
      }else{
        resolve(token)
      }
    })

  })

}
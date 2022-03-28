import { OAuth2Client } from 'google-auth-library';
import { PayloadGoogle } from '../interfaces/interfaces';
import config from '../keys';

const client = new OAuth2Client(config.GOOGLE_ID);

export const googleVerify = async(idToken:string = '') => {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: config.GOOGLE_ID // [CLIENT_ID_1, CLIENT_ID_1, CLIENT_ID_1,]
  });
  const { 
    name: nombre, 
    email: correo
  } = ticket.getPayload() as PayloadGoogle;
  return {
    nombre,
    correo,
  };
}

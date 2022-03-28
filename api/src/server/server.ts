import express = require('express');
import dbConnection from '../database/config';
import config from '../keys';
import path from 'path';

import cors = require('cors');
import morgan = require('morgan');

interface Paths{
  user:string;
  auth:string;
  notes?:string;
  adoption:string;
}

export default class Server{

  public app:express.Application;
  public port:number;
  public paths:Paths;

  constructor(){
    this.port = Number(config.PORT);
    this.app = express();

    this.paths = {
      user: '/api/usuarios',
      auth: '/api/auth',
      adoption: '/api/adoption',
    }

    this.conectarDB();

    this.middlewares();

    this.routes();

  }

  private async conectarDB(){
    await dbConnection();
  }

  public middlewares(){
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static(path.join(__dirname, '../public/')));
    this.app.use(express.urlencoded({extended: false}));
    this.app.use(morgan('tiny'));
  }

  private routes(){
    this.app.use(this.paths.user, require('../routes/user'));
    this.app.use(this.paths.auth, require('../routes/auth'));
    this.app.use(this.paths.adoption, require('../routes/adoption'));
  }

  public listen(){
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en puerto', this.port);
    })
  }

}
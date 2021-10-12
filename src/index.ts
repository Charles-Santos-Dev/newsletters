import * as path from 'path';
import "reflect-metadata";
import {createExpressServer} from "routing-controllers";
import {LojaHandler} from "./controllers/handlers/LojaHandler";
import {LoginController} from "./controllers/LoginController";
import {MarcaController} from "./controllers/MarcaController";
import {NewsFinalizadasController} from "./controllers/NewsFinalizadasController";
import {RegisterController} from "./controllers/RegisterController";
import {IndexController} from "./controllers/IndexController";
import {S3Handler} from "./controllers/handlers/S3Handler";
import {TemplateHandler} from "./controllers/handlers/TemplateHandler";
import {NewsFinalizadasHandler} from "./controllers/handlers/NewsFinalizadasHandler";
import {UsuariosHandller} from "./controllers/handlers/UsuariosHandller";
import {AdminController} from "./controllers/AdminController";


const express = require('express');
// creates express app, registers all controller routes and returns you express app instance
const server = createExpressServer({
    controllers: [AdminController,RegisterController,NewsFinalizadasController,MarcaController,UsuariosHandller,NewsFinalizadasHandler,LoginController,LojaHandler,IndexController,S3Handler,TemplateHandler] // we specify controllers we want to use
});

server.use(express.static(path.join(__dirname,'web/')));

server.listen(3010, function(){
    console.log('App Online - Porta 3010');
});

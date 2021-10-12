import {JsonController, Param, Body, Get, Post, Put, Delete, createExpressServer, Req, Res} from "routing-controllers";
import { Usuarios } from '../../Model/Usuarios';
import {SessionHandller} from "./SessionHandller";
import {Loja} from "../../Model/Loja";
import {Template} from "../../Model/Template";

const bcrypt = require('bcrypt');
const saltRounds = 10;

@JsonController()
export  class UsuariosHandller extends SessionHandller {

    @Post("/user/login")
    async getUser(@Body() userLogin: any) {

        const Usuario = new Usuarios();
        const users   = await Usuario.findAll({where: {email: userLogin.email } });

        if(Array.isArray(users) && users.length > 0) {
            const user = users[0];
            let Session = this.setSession(user);
            if(await this.compareEncryptPassword(user.senha, userLogin.senha)){
                return {logged : true, KeyUser : Session};
            }
        }

        return {logged : false , key : ''};
    }

    @Post("/sessionuser")
    getNameSession(@Body() KeySession: any) {
        let ObjSession;
        if (KeySession.KeyUser){
            ObjSession = {name : this.getNameUser(KeySession.KeyUser), permission : this.checkPermission(KeySession.KeyUser)};
        } else {
            return false;
        }
        return ObjSession;
    }

    @Post("/logout")
    logout(@Body() KeySession: any) {
        this.clearSession(KeySession.KeyUser);

        return 'logout';
    }

    @Get("/logoutall")
    logoutAll() {
        this.clearAllSession();

        return 'logout all';
    }

    @Get("/users/:KeyUser")
    async getUsers(@Req() request: any,
                   @Res() response: any,
                   @Param("KeyUser") KeyUser : string) {

        if(this.getSession(KeyUser)){
            if(this.checkPermission(KeyUser)) {
                const Usuario  = new Usuarios();
                const Usuarioss = await Usuario.findAll({relations: ["lojas"]});

                return Usuarioss;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    @Put("/user/edit/:KeyUser")
    async edituser(@Body() userEdit: any,
                   @Param("KeyUser") KeyUser : string) {
        if(this.getSession(KeyUser)){
            if(this.checkPermission(KeyUser)) {
                const id        = userEdit.id;
                const nome      = userEdit.nome;
                const email     = userEdit.email;
                const senha     = await this.encryptPassword(userEdit.senha);
                const status    = userEdit.status;
                const permissao = userEdit.permissao;
                const Usuarioss = new Usuarios();
                const Usuario   = await Usuarioss.find(id);

                Usuario.nome = nome;
                Usuario.email = email;
                Usuario.senha = senha;
                Usuario.status = status;
                Usuario.permissao = permissao;

                Usuario.update();

                return "Save OK";
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    @Post("/user/add/:KeyUser")
    async adduser(@Body() userSave: any,
                  @Param("KeyUser") KeyUser : string) {
        if(this.getSession(KeyUser)){
            if(this.checkPermission(KeyUser)) {
                const nome      = userSave.nome;
                const email     = userSave.email;
                const senha     = await this.encryptPassword(userSave.senha);
                const status    = userSave.status;
                const permissao = userSave.permissao;
                const Usuario   = new Usuarios();

                Usuario.nome = nome;
                Usuario.email = email;
                Usuario.senha = senha;
                Usuario.status = status;
                Usuario.permissao = permissao;

                Usuario.save();

                return "Save User";
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    async encryptPassword(password):Promise<string>{
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(password, salt, function(err, hash) {
                    resolve(hash);
                });
            });
        });
    }

    async compareEncryptPassword(senha, senhaInformada):Promise<string>{
        return new Promise((resolve, reject) => {
            bcrypt.compare(senhaInformada, senha, function(err, result) {
                resolve(result);
            });
        });
    }

    @Delete("/user/delete/:id/:KeyUser")
    remove(@Param("id") id: number,
           @Param("KeyUser") KeyUser : string) {

        if (this.getSession(KeyUser)) {
            if (this.checkPermission(KeyUser)) {
                const deleteUser = new Usuarios();
                deleteUser.delete(id);

                return "Delete User...";
            } else {
                return false;
            }
        } else {
            return false;
        }

    }
}

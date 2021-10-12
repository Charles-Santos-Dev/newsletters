import {JsonController, Param, Body, Get, Post, Put, Delete, Req, Res} from "routing-controllers";
import { Loja } from '../../Model/Loja';
import {SessionHandller} from "./SessionHandller";

@JsonController()
export  class LojaHandler extends SessionHandller {

    @Post("/lojas")
    async getByUser(@Req() request: any, @Res() response: any, @Body() KeyUser: any) {
        const lojas = new Loja();
        let id = this.getSession(KeyUser.KeyUser);
        let lojass;

        if (this.getSession(KeyUser.KeyUser)) {
            if (this.checkPermission(KeyUser.KeyUser)) {
                lojass = lojas.findAll({relations: ["usuario"], order: {nome: "ASC"}});
            } else {
                lojass = lojas.findAll({where: {["usuario"]: id}, order: {nome: "ASC"}});
            }
            return lojass;
        } else {
            return false;
        }
    }

    @Get("/loja/:id/:KeyUser")
    get(@Param("id") id: number,
        @Param("KeyUser") KeyUser: string,
        @Req() request: any, @Res() response: any) {

        if (KeyUser !== 'null') {
            if (this.getSession(KeyUser)) {
                const lojas = new Loja();
                const lojass = lojas.find(id, {relations: ["templates"]});
                return lojass;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    @Post("/loja/save/:name/:KeyUser")
    post(@Param("name") name: string,
         @Param("KeyUser") KeyUser: string,
         @Body() loja: any) {

        if (this.getSession(KeyUser)) {
            const newLoja = new Loja();
            const Session = new SessionHandller();
            let id = this.getSession(KeyUser).id;
            newLoja.nome = name;
            newLoja.usuario = id;
            newLoja.save();

            return "Saving Store...";
        } else {
            return false;
        }
    }

    @Put("/loja/edit/:id/:status/:KeyUser")
    async alter(@Param("id") id: number,
                @Param("KeyUser") KeyUser: string,
                @Param("status") status: boolean) {

        if (this.getSession(KeyUser)) {
            let editLoja = new Loja();
            editLoja = await editLoja.find(id);
            editLoja.status = status;
            editLoja.update();

            return "Editing Store...";
        } else {
            return false;
        }
    }

    @Delete("/loja/delete/:id/:KeyUser")
    remove(@Param("id") id: number,
           @Param("KeyUser") KeyUser: string) {
        if (this.getSession(KeyUser)) {
            if (this.checkPermission(KeyUser)) {
                const deleteLoja = new Loja();
                deleteLoja.delete(id);

                return "Delete Store...";
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    @Get("/admin/lojas/:KeyUser")
    async adminlojas(@Param("KeyUser") KeyUser: string) {
        const lojas = new Loja();
        const lojass = lojas.findAll({relations: ["usuario"], order: {nome: "ASC"}});

        if (this.getSession(KeyUser)) {
            if (this.checkPermission(KeyUser)) {
                return lojass;
            } else {
                return 'Sem permissão';
            }
        } else {
            return 'Não está logado';
        }
    }

    @Get("/admin/lojas/templates/:KeyUser")
    async admintemplates(@Param("KeyUser") KeyUser: string) {
        const lojas = new Loja();
        const lojass = lojas.findAll({relations: ["templates"], order: {nome: "ASC"}});

        if (this.getSession(KeyUser)) {
            if (this.checkPermission(KeyUser)) {
                return lojass;
            } else {
                return 'Sem permissão';
            }
        } else {
            return 'Não está logado';
        }
    }

    @Put("/admin/loja/edit/:KeyUser")
    async updateStore(@Body() lojaSave: any,
                      @Param("KeyUser") KeyUser: string) {
        if (this.getSession(KeyUser)) {
            if (this.checkPermission(KeyUser)) {
                let editLoja = new Loja();
                editLoja = await editLoja.find(lojaSave.id);
                editLoja.nome = lojaSave.nome;
                editLoja.status = lojaSave.status;
                editLoja.usuario = lojaSave.usuario;
                editLoja.update();

                return "Update Store";
            } else {
                return 'Sem permissão';
            }
        } else {
            return 'Não está logado';
        }
    }
}
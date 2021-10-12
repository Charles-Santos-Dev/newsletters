import {JsonController, Param, Body, Get, Post, Put, Delete, Req, Res} from "routing-controllers";
import { Loja } from '../../Model/Loja';
import { NewsFinalizadas } from '../../Model/NewsFinalizadas';
import {SessionHandller} from "./SessionHandller";

@JsonController()
export  class NewsFinalizadasHandler extends SessionHandller {

    @Get("/newsfinalizadas/:idLoja/:KeyUser")
    allnews(@Param("idLoja") id: number,
            @Param("KeyUser") KeyUser: string,
            @Req() request: any, @Res() response: any) {

        if(KeyUser !== 'null'){
            if(this.getSession(KeyUser)){
                const newsfinalizadas  = new NewsFinalizadas();
                const newsfinalizadass = newsfinalizadas.findAll({ where: {["loja"] : id}});

                return newsfinalizadass;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    @Post("/newsfinalizadas/add/:idLoja/:KeyUser")
    async addNews(@Param("idLoja") id : number,
                  @Param("KeyUser") KeyUser: string,
          @Body() newsFinal: any) {

        if(KeyUser !== 'null'){
            if(this.getSession(KeyUser)){
                    const addNews           = new NewsFinalizadas();
                    const date              = new Date();
                    let loja                = new Loja();
                    loja                    = await loja.find(id);

                    addNews.dataCriacao     = date;
                    addNews.newsFinalizadas = newsFinal.text;
                    addNews.loja            = loja;
                    addNews.save();

                    return "Saving Template...";
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}

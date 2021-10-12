import {JsonController, Param, Body, Get, Post, Put, Delete, Req, Res} from "routing-controllers";
import { Template } from '../../Model/Template';
import { Loja } from '../../Model/Loja';
import {SessionHandller} from "./SessionHandller";

@JsonController()
export  class TemplateHandler extends SessionHandller {

    @Get("/templates/:KeyUser")
    getAll(@Req() request: any, @Res() response: any,
           @Param("KeyUser") KeyUser : string) {
        if(this.getSession(KeyUser)){
            const templates = new Template()
            const templatess=templates.findAll();
            return templatess;
        } else {
            return false;
        }
    }

    @Get("/template/:id/:KeyUser")
    get(@Param("id") id: number,
        @Param("KeyUser") KeyUser : string,
        @Req() request: any, @Res() response: any) {
        if(this.getSession(KeyUser)){
            const templates = new Template()
            const templatess=templates.find(id);
            return templatess;
        } else {
            return false;
        }
    }
    
    @Put("/template/:id/:name/:KeyUser")
    async put(@Param("id") id: number,
        @Param("name") name : string,
              @Param("KeyUser") KeyUser : string,
        @Body() template: any) {
        if(this.getSession(KeyUser)){
            const templates = new Template()
            const templatess= await templates.find(id);

            if(name =='header'){
                templatess.header=template.text;
            }
            if(name =='body'){
                templatess.body=template.text;
            }
            if(name =='footer'){
                templatess.footer=template.text;
            }
            if(name =='topheader'){
                templatess.topheader=template.text;
            }

            templatess.update();

            return "Save OK";
        } else {
            return false;
        }

    }

    @Post("/template/add/:idLoja/:KeyUser")
    async templateAdd(@Param("idLoja") id : number,
              @Param("KeyUser") KeyUser : string,
            @Body() template: any) {
        if(this.getSession(KeyUser)){
            const addTemplate       = new Template();
            const date              = new Date();
            let loja                = new Loja();
            loja                    = await loja.find(id);
            
            addTemplate.dataCriacao = date;
            addTemplate.header      = template.header;
            addTemplate.body        = template.body;
            addTemplate.footer      = template.footer;
            addTemplate.topheader   = template.topheader;
            addTemplate.loja        = loja;
        
            addTemplate.save();
        
            return "Saving Template...";
        } else {
            return false;
        }
    }

    @Delete("/template/:id/:KeyUser")
        remove(@Param("id") id: number,
               @Param("KeyUser") KeyUser : string) {
        if(this.getSession(KeyUser)){
            if(this.checkPermission(KeyUser)) {
                const template = new Template();
                template.delete(id);
                return "Removing template...";
            } else {
                return false;
            }
        } else {
            return false;
        }
        }

    }

import {Controller, Get, Req, Res} from "routing-controllers";
import {SessionHandller} from "./handlers/SessionHandller";

@Controller()
export  class AdminController extends SessionHandller{

    @Get('/admin')
    async admin(@Req() request: any, @Res() response: any) {

        let filePath = process.cwd() + '/src/web/pages/admin.html';
        response = await new Promise((resolve, reject) => {
            response.sendFile(filePath, () => {
                resolve(response);
            });
        })
        return response;
    }

    @Get('/admin/usuarios')
    async usuarios(@Req() request: any, @Res() response: any) {

        let filePath = process.cwd() + '/src/web/pages/usuarios.html';
        response = await new Promise((resolve, reject) => {
            response.sendFile(filePath, () => {
                resolve(response);
            });
        })
        return response;
    }

    @Get('/admin/templates')
    async templates(@Req() request: any, @Res() response: any) {

        let filePath = process.cwd() + '/src/web/pages/templates.html';
        response = await new Promise((resolve, reject) => {
            response.sendFile(filePath, () => {
                resolve(response);
            });
        })
        return response;
    }

    @Get('/admin/gerenciarlojas')
    async managerStores(@Req() request: any, @Res() response: any) {
        let filePath = process.cwd() + '/src/web/pages/gerenciarlojas.html';
        response = await new Promise((resolve, reject) => {
            response.sendFile(filePath, () => {
                resolve(response);
            });
        })
        return response;
    }

    @Get('/admin/template/:id')
    async viewTemplates(@Req() request: any, @Res() response: any) {
        let filePath = process.cwd() + '/src/web/pages/viewtemplates.html';
        response = await new Promise((resolve, reject) => {
            response.sendFile(filePath, () => {
                resolve(response);
            });
        })
        return response;
    }

}


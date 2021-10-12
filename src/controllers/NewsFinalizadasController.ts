import {Controller, createExpressServer, Get, Param, Req, Res} from "routing-controllers";
import {SessionHandller} from "./handlers/SessionHandller";

@Controller()
export  class NewsFinalizadasController{

    @Get('/news')
    async GetNews(@Req() request: any, @Res() response: any) {
        let filePath = process.cwd() + '/src/web/pages/newsfinalizadas.html';
        response = await new Promise((resolve, reject) => {
            response.sendFile(filePath, () => {
                resolve(response);
            });
        })
        return response;
    }
}
import {Controller, createExpressServer, Get, Param, Req, Res} from "routing-controllers";
import {SessionHandller} from "./handlers/SessionHandller";

@Controller()
export  class MarcaController {

    @Get('/marca/:store')
    async GetStore(@Req() request: any, @Res() response: any) {
        let filePath = process.cwd() + '/src/web/pages/loja.html';
        response = await new Promise((resolve, reject) => {
            response.sendFile(filePath, () => {
                resolve(response);
            });
        })
        return response;
    }
}
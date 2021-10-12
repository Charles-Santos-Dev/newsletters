import {Controller, createExpressServer, Get, Param, Req, Res, Header} from "routing-controllers";
import {UsuariosHandller} from "./handlers/UsuariosHandller";

@Controller()
export  class LoginController extends UsuariosHandller {

    @Get('/login')
        async Getlogin(@Req() request: any, @Res() response: any) {
            let filePath = process.cwd() + '/src/web/pages/login.html';
            response = await new Promise((resolve, reject) => {
                response.sendFile(filePath, () => {
                    resolve(response);
                });
            })
            return response;
        }
}
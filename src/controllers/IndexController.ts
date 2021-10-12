import {Controller, Get, Req, Res, Param} from "routing-controllers";
import {SessionHandller} from "./handlers/SessionHandller";

@Controller()
export  class IndexController extends SessionHandller{

  @Get('/')
  async GetFile(@Req() request: any,
                @Res() response: any) {

  let filePath = process.cwd() + '/src/web/newsletter.html';
      response = await new Promise((resolve, reject) => {
        response.sendFile(filePath, () => {
          resolve(response);
        });
      })
      return response;
  }
}


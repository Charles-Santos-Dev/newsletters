import {JsonController, UploadedFile, Get, Post, Req, Res, Param} from "routing-controllers";
import S3Helper = require('../../helper/S3Helper');
@JsonController()
export  class S3Handler {

  @Post("/upload/:nome/:ano/:mes/:dia")
  async post(@UploadedFile('file') file: any,
             @Param("nome") nome: string,
             @Param("ano") ano: number,
             @Param("mes") mes: number,
             @Param("dia") dia: number,
             @Req() request: any,
             @Res() response: any) {
        var currentBucket = nome+"/"+ano+"/"+mes+"/"+dia;
        try{
          const s3Helper = new S3Helper();
          const data = await s3Helper.uploadImage(file.originalname, file.buffer, currentBucket);
          response.send({src: data.Location});
        }catch(e){
          response.status(500).end();
        }
  }
  @Get("/download/:nome")
   async getByStore(@Param("nome") nameStore: string,
             @Req() request: any,
             @Res() response: any) {

        try{
          const s3Helper = new S3Helper();
          const data = await s3Helper.listAllFiles(nameStore);
          const content = data.Contents.map((img) => {
              img.url = s3Helper.getBaseURL() + img.Key;
              return img;
          });
          return content;
        }catch(e){
          response.status(500).end();
        }
  }

  @Get("/download/:nome/:ano")
   async getByYear(@Param("nome") nameStore: string,
             @Param("ano") year: string,
             @Req() request: any,
             @Res() response: any) {
     
        const prefixFull = nameStore + '/' + year;
        try{
            const s3Helper = new S3Helper();
            const data = await s3Helper.listAllFiles(prefixFull);
            const content = data.Contents.map((img) => {
                img.url = s3Helper.getBaseURL() + img.Key;
                return img;
            });
            return content;
        }catch(e){
          response.status(500).end();
        }
  }

  @Get("/download/:nome/:ano/:mes")
   async getByMonth(@Param("nome") nameStore: string,
             @Param("ano") year: string,
             @Param("mes") month: string,
             @Req() request: any,
             @Res() response: any) {
     
        const prefixFull = nameStore + '/' + year + '/' + month;
        try{
            const s3Helper = new S3Helper();
            const data = await s3Helper.listAllFiles(prefixFull);
            const content = data.Contents.map((img) => {
                img.url = s3Helper.getBaseURL() + img.Key;
                return img;
            });
            return content;
        }catch(e){
          response.status(500).end();
        }
  }

  @Get("/download/:nome/:ano/:mes/:dia")
   async getByDay(@Param("nome") nameStore: string,
             @Param("ano") year: string,
             @Param("mes") month: string,
             @Param("dia") day: string,
             @Req() request: any,
             @Res() response: any) {
     
        const prefixFull = nameStore + '/' + year + '/' + month + '/' + day;
        try{
            const s3Helper = new S3Helper();
            const data = await s3Helper.listAllFiles(prefixFull);
            const content = data.Contents.map((img) => {
                img.url = s3Helper.getBaseURL() + img.Key;
                return img;
            });
            return content;
        }catch(e){
          response.status(500).end();
        }
  }

}
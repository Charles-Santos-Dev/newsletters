const aws = require('aws-sdk');

module.exports = function () {
  this.bucket = 'ethinkers-news';

  this.getBaseURL = function(){
    return `https://${this.bucket}.s3.amazonaws.com/`;
  }

  const listObjectsV2 = (s3, params) => {
    return new Promise((resolve, reject) => {
      s3.listObjectsV2(params, (err, data) => {
        (err) ? reject(err) : resolve(data);
      });
    });
  }

  this.getConnection = () => {
    aws.config.update({
      secretAccessKey: 'Ho8L1wXIuQ/yfRiRx/VaJwuq/EDTcVrd0Rb4z3en',
      accessKeyId: 'AKIARREQX3NBCZW6EMV7',
      region: 'us-east-1'
    });
    return new aws.S3();
  }

  this.uploadImage = (fileName, fileContent, currentBucket) => {
    return new Promise((resolve, reject) => {
      const s3     = this.getConnection();
      const params = {
        Bucket: this.bucket,
        Key: `${currentBucket}/${fileName}`,
        Body: fileContent,
        ACL: 'public-read',
        ContentType: 'image/jpeg'
      };
      s3.upload(params, (err, data) => (err) ? reject(err) : resolve(data));
    });
  }

  this.listAllFiles = (currentPrefix) => {
    return new Promise(async (resolve, reject) => {
      try{
        const s3 = this.getConnection();
        const params = {
          Bucket: this.bucket,
          Prefix: currentPrefix
        };
        const data = await listObjectsV2(s3, params);
        resolve(data);
      }catch(e){
        reject(e);
      }
    });
  }
 
}
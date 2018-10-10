// const ipcRenderer = require('electron').ipcRenderer;
const AWS = require('aws-sdk')
const fs = require('fs')
const path = require('path')
const fileType = require('file-type')
const Wallpaper = require('./models/wallpaper')

//configuring the AWS environment
AWS.config.update({
    accessKeyId: "balabala",
    secretAccessKey: "balabala"
  })
var s3 = new AWS.S3();
// var filePath = "/home/can/Downloads/ec2-launch-cdong.py"
// document.querySelector('form').addEventListener('submit', submitForm);

function upload(filePath){
  var uploadImg = fs.createReadStream(filePath)
  let params = {
      Bucket: 'wallpaper-ase',
      Body : uploadImg,
      ContentType: fileType(uploadImg),
      Key : "wallpapers/"+Date.now()+"_"+path.basename(filePath)
    }
    
    s3.upload(params, function (err, data) {
      //handle error
      if (err) {
        console.log("Error", err);
      }
      //success
      if (data) {
        var wallpaperUrl =  data.Location
        let newWallpaper = {url : wallpaperUrl}
        console.log(newWallpaper)
        Wallpaper.create(newWallpaper, function(err, wallpaper){
           if(err) console.log(err)
           else console.log(wallpaper)
      })
    }
      
    })
}
module.exports = upload
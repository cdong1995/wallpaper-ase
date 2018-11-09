const cloudinary = require('cloudinary');
const Wallpaper = require('../../models/wallpaper');

module.exports = (filePath) => {
    var url
    // cloudinary config
    cloudinary.config({ 
        cloud_name: 'candong', 
        api_key: 823243289597989, 
        api_secret: '0F1l-otQXSMbnZrj8OQQRZiEEI0'
    });
    cloudinary.uploader.upload(filePath, (result) => {
      url = result.secure_url
      let newWallpaper = {url : url}
      console.log(newWallpaper)
      Wallpaper.create(newWallpaper, function(err, wallpaper){
      if(err) console.log(err)
        else console.log(wallpaper)
      })
    })
}

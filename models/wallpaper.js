
const mongoose = require('mongoose')
var wallpaperSchema = new mongoose.Schema({
    url: String,
    likes: Number
});

var UserSchema = new mongoose.Schema({
    uid: String,
    likePics: [{
        url: String
    }],
    collectPics: [{
        url: String
    }],
    uploadPics: [{
        url: String
    }],


});

var Database ={
    wallpaper : mongoose.model('wallpaper', wallpaperSchema),
    user : mongoose.model('user', UserSchema)
}
module.exports = Database
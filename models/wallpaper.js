/*
const mongoose = require('mongoose')
var wallpaperSchema = new mongoose.Schema({
    url: String
});

var UserSchema = new mongoose.Schema({
    name: String,
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
*/
const mongoose = require('mongoose')
var wallpaperSchema = new mongoose.Schema({
    url: String
});
module.exports = mongoose.model('wallpaper', wallpaperSchema);
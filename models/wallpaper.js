
const mongoose = require('mongoose')
var wallpaperSchema = new mongoose.Schema({
    url: String,
    likes: Number
});
var wallpaper = mongoose.model('wallpaper', wallpaperSchema);


var UserSchema = new mongoose.Schema({
    uid: String,
    likePics: [{
        id: String
    }],
    collectPics: [{
        // type :  mongoose.Schema.Types.ObjectId,
        // ref : 'wallpaper'
        url: String
    }],
    uploadPics: [{
        url: String
    }],
});

var user = mongoose.model('user', UserSchema);

var Database ={
    wallpaper,
    user
}
module.exports = Database
const mongoose = require('mongoose')
var wallpaperSchema = new mongoose.Schema({
    //_id:String,
    _id: mongoose.Schema.Types.ObjectId,
    url: String,
    likes: Number
});

module.exports = mongoose.model('wallpaper', wallpaperSchema);
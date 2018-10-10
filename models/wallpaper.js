const mongoose = require('mongoose')
var wallpaperSchema = new mongoose.Schema({
    url: String
});
module.exports = mongoose.model('wallpaper', wallpaperSchema);

const mongoose = require('mongoose')
var wallpaperSchema = new mongoose.Schema({
    //_id:String,
    _id: mongoose.Schema.Types.ObjectId,
    url: String,
    likes: {
        type:Number,
        default: 0
    },
    collects: {
        type:Number,
        default: 0
    }
});
var wallpaper = mongoose.model('wallpaper', wallpaperSchema);


var UserSchema = new mongoose.Schema({
    uid: String,
    likePics: [{        
        type :  mongoose.Schema.Types.ObjectId,
        ref : 'wallpaper'      
    }],
    collectPics: [{       
        type :  mongoose.Schema.Types.ObjectId,
        ref : 'wallpaper'
    }],
    uploadPics: [{         
        type :  mongoose.Schema.Types.ObjectId,
        ref : 'wallpaper'
    }],
});

var user = mongoose.model('user', UserSchema);

var Database ={
    wallpaper,
    user
}
module.exports = Database
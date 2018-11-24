const Database = require('../../models/wallpaper');

module.exports = (userID, picSrc) => {
    var src = {url: picSrc}
    Database.user.findOneAndUpdate({uid: userID},
        {$push: {likePics: src}}, function(err, user){
            if(err) alert(err)
            else {
                alert(userID+ " likes this picture");
            }
        });
}
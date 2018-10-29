const cloudinary = require('cloudinary')
const Database = require('./models/wallpaper')
var url
// cloudinary config
cloudinary.config({ 
    cloud_name: 'candong', 
    api_key: 823243289597989, 
    api_secret: '0F1l-otQXSMbnZrj8OQQRZiEEI0'
});



class Operations{
    constructor(){
        this.GlobalUser = "Admin";
    }

    upload(filePath) {
        cloudinary.uploader.upload(filePath, (result) => {
            url = result.secure_url
            let newWallpaper = {url : url}
            console.log(newWallpaper)
            Database.wallpaper.create(newWallpaper, function(err, wallpaper){
            if(err) console.log(err)
            else console.log(wallpaper)
            })
        })

    }
    
    //Simulate user register function
    addUser(username){
        let newUser = {name : username}
        Database.user.create(newUser, function(err, user){
            if(err) console.log(err)
            else alert("Successfully add: " + user.name)
        })
    
    }
    
    //Simulate user login function
    switchUser(username){
        Database.user.findOne({name : username}, function(err, user){
            if(err) alert(err)
            if(!user) alert("User not find")
            else {
                alert("Welcome: " + user.name)
            }
            
        })
        //Switch to this user
        this.GlobalUser = username;
        document.getElementById("name").innerHTML = this.GlobalUser;
    
    }
    
    like(username, picSrc){
        if(this.GlobalUser == "Admin"){
            alert("Please login first")
        }
        else{
            var src = {url: picSrc}
            Database.user.findOneAndUpdate({name: username},
                {$push: {likePics: src}}, function(err, user){
                    if(err) alert(err)
                    else {
                        alert(user.name + " likes this picture");
                    }
                });
        }
    }

    logOut(){
        if(this.GlobalUser == "Admin"){
            alert("Already log out")
        }
        else{
            this.GlobalUser = "Admin";
            document.getElementById("name").innerHTML = this.GlobalUser;
            alert("Successfully log out")
        }
    }

    showSearchedImage(src){
        document.getElementById('showImg').innerHTML = "";
        var img = document.createElement("img");
        img.src = src;
        img.width = 200;
        img.height = 200;
        document.getElementById('showImg').appendChild(img)
    }

     // show all wallpaper in the Database
    showAll(){
        document.getElementById('showImg').innerHTML = "";
        function showImage(src) {
            var img = document.createElement("img");
            img.src = src;
            img.width = 200;
            img.height = 200;
            document.getElementById('showImg').appendChild(img)
            var btn = document.createElement("button");
            btn.innerText = "like";
            btn.src = src;
            btn.onclick = function(){
              operations.like(operations.GlobalUser, src)
            };
            document.getElementById('showImg').append(btn);
          }
          
         // Traverser DataBase to show each image
          Database.wallpaper.find({}, function(err, allWallpapers) {
            if(err) console.log(err)
            else {
                allWallpapers.forEach(w => {
                showImage(w.url)
              });      
            }
          })
    }

    showLikes(){
        if(this.GlobalUser == "Admin") {
            alert("Please login first")
        }
        else{
            document.getElementById('showImg').innerHTML = "";
            function showImage(src){
                var img = document.createElement("img");
                img.src = src;
                img.width = 200;
                img.height = 200;
                document.getElementById('showImg').appendChild(img)
            }
            Database.user.findOne({name: this.GlobalUser}, function(err, user) {
                if(err) console.log(err)
                else {
                    user.likePics.forEach(p => {
                    showImage(p.url)
                  });      
                }
              })
        }
    }
}


module.exports = new Operations();

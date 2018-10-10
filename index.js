const {ipcRenderer} = require('electron')
const Wallpaper = require('./models/wallpaper')
const mongoose = require('mongoose')
mongoose.connect('mongodb://cdong1995:dc196828zxzqzl@ds125453.mlab.com:25453/wallpaper-ase')

const keyword = document.getElementById('keyword')
const search =  document.getElementById('search')
function showImage(src) {
  var img = document.createElement("img");
  img.src = src;
  img.width = 200;
  img.height = 200;
  document.getElementById('showImg').appendChild(img)
}

// showWallpaper()
Wallpaper.find({}, function(err, allWallpapers) {
  if(err) console.log(err)
  else {
      allWallpapers.forEach(wallpaper => {
      showImage(wallpaper.url)
    });      
  }
})

// search
search.addEventListener("click",function(){
  let searchUrl = "https://source.unsplash.com/random?" + keyword.value
  showImage(searchUrl)
})

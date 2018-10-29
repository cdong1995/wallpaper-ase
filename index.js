const {ipcRenderer} = require('electron')
const mongoose = require('mongoose')
var operations = require('./upload.js')
mongoose.connect('mongodb://cdong1995:dc196828zxzqzl@ds125453.mlab.com:25453/wallpaper-ase')

const keyword = document.getElementById('keyword')
const search =  document.getElementById('search')
const addUser = document.getElementById('add')
const user = document.getElementById('user')
const switchUser = document.getElementById('switch')
const homeBtn = document.getElementById('home')
const likesBtn = document.getElementById('likes')
const logout = document.getElementById('logout')


operations.showAll();

search.addEventListener("click",function(){
  let searchUrl = "https://source.unsplash.com/random?" + keyword.value
  operations.showSearchedImage(searchUrl)
})

addUser.addEventListener("click", function(){
  operations.addUser(user.value)
})

switchUser.addEventListener("click", function(){
  operations.switchUser(user.value)
})

homeBtn.addEventListener("click", function(){
  operations.showAll();
})

likesBtn.addEventListener("click", function(){
  operations.showLikes();
})

logout.addEventListener("click", function(){
  operations.logOut();
})




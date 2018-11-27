const electron = require('electron');
const ipcMain = electron.ipcMain;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const { spawn } = require("child_process");
const firebase = require('firebase');
const path = require('path');
const fs = require('fs');
const request = require("request");
const url = require('url');
const isDev = require('electron-is-dev');
const bson = require('bson')

const cloudinary = require('cloudinary');
const Database = require('../models/wallpaper');
const upload = require('./lib/upload');
const AutoChanger = require('./lib/autoChanger')

const mongoose = require('mongoose');
mongoose.connect('mongodb://cdong1995:dc196828zxzqzl@ds125453.mlab.com:25453/wallpaper-ase');

let mainWindow;
let Uid;
// let imageWindow;
// let settingsWindow;

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAqgXt5GvALuuw2H6bXmS45_rU07z8Iy0E",
    authDomain: "wallpater-ase.firebaseapp.com",
    databaseURL: "https://wallpater-ase.firebaseio.com",
    projectId: "wallpater-ase",
    storageBucket: "wallpater-ase.appspot.com",
    messagingSenderId: "412954877097"
  };
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(User => {
  if(User){
    Uid = User.uid; 
    console.log("Current: " + User.uid);
  }
  
})


function createWindow() {
  mainWindow = new BrowserWindow({width: 900, height: 680, webPreferences: { webSecurity: false}});

  mainWindow.loadURL(isDev ? 'http://localhost:3000/login' : `file://${path.join(__dirname, '../build/index.html')}`);

  mainWindow.on('closed', () => mainWindow = null);

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
  Menu.setApplicationMenu(mainMenu)
}

const mainMenuTemplate =  [
  {
    label: 'File',
    submenu:[
      {
        label: "Dev",
        submenu:[
          {
            label: 'Toggle DevTools',
            accelerator:process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
            click(item, focusedWindow){
              focusedWindow.toggleDevTools();
            }
          },
        ]

      },
      {
        label: 'Quit',
        accelerator:process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click(){
          app.quit();
        }
      },
      {
        label: 'AutoChanger',
        click(){
          AutoChanger();
        }
      }
    ]
  }
];

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('upload-image', (event, image) => {
  upload(image,Uid);
})

ipcMain.on('request-image', (event, type) => {
  if(type==="all"){
    Database.wallpaper.find({}, function(err, allWallpapers) {
      if(err) console.log(err)
      else {
        console.log(allWallpapers)
          mainWindow.webContents.send('show-all-image',allWallpapers)     
      }
    })
  }
  else if(type==="likes"){
    Database.user.findOne({uid:Uid}).populate("likePics").exec(function(err, wallpapers){     
      if(err) console.log(err)
      else {
        console.log(wallpapers)
        console.log(wallpapers.likePics)
        mainWindow.webContents.send('show-likes-image', wallpapers.likePics) 
      }
    })
  }
  else if(type=="collections"){
    Database.user.findOne({uid:Uid}).populate("collectPics").exec(function(err, wallpapers){     
      if(err) console.log(err)
      else {
        console.log(wallpapers)
        console.log(wallpapers.collectPics)
        mainWindow.webContents.send('show-collections-image', wallpapers.collectPics) 
      }
    })
  }else if(type=="uploads"){
    Database.user.findOne({uid:Uid}).populate("uploadPics").exec(function(err, wallpapers){     
      if(err) console.log(err)
      else {
        mainWindow.webContents.send('show-uploads-image', wallpapers.uploadPics) 
      }
    })
  }
})

ipcMain.on('show-image', (event, filePath) => {
  var url
  // cloudinary config
  cloudinary.config({ 
      cloud_name: 'candong', 
      api_key: 823243289597989, 
      api_secret: '0F1l-otQXSMbnZrj8OQQRZiEEI0'
  });
  cloudinary.uploader.upload(filePath, (result) => {
    url = result.secure_url
    let newWallpaper = {url : url}
    console.log(newWallpaper)
    Database.wallpaper.create(newWallpaper, function(err, wallpaper){
    if(err) console.log(err)
      else console.log(wallpaper)
    })
  })
})

ipcMain.on('download-image', (event, filePath) => {
  return new Promise((resolve, reject) => {
    const tempDir = path.join(__dirname, "../wallpapers");
    const tempFileName = `temp${Date.now()}.jpg`;
    const tempFilePath = path.join(tempDir, tempFileName);
    const writeFileTo = fs.createWriteStream(path.join(tempDir, tempFileName));
    const getImageFile = request.get(filePath);

    getImageFile.pipe(writeFileTo);
    getImageFile.on("error", reject);
    getImageFile.on("complete", () => {
      // Image has been saved to tempFilePath
      // Change desktop background using applescript
      const script = spawn("osascript", [
        "-e",
        `tell application "Finder" to set desktop picture to POSIX file "${tempFilePath}"`
      ]);
      script.on("close", resolve);
    });
  })
})
 
ipcMain.on('search-image-result', (event, rawJsonResult) => {
  console.log(rawJsonResult.results);
  mainWindow.webContents.send('show-search-result', rawJsonResult.results)

});


ipcMain.on('login', (event, username, password) =>{
  //dev mode
  //username="y@qq.com"
  //password="111111"
  firebase.auth().signInWithEmailAndPassword(username, password).then(function(){
    console.log("Login Success")
    mainWindow.webContents.send('transitionToHome', url);
  }).catch(function(error){
    if(error != null){
      console.log(error.message);
      return;
    }
  });
});

ipcMain.on('register', (event, email, password, confirmed) =>{
  // console.log("sdfsdf");
  firebase.auth().createUserWithEmailAndPassword(email, password).then(function(userData){
    console.log('Register Success');
    mainWindow.webContents.send('transitionToLogin', url);
    let newUser = {uid : userData.user.uid}
    Database.user.create(newUser, function(err, user){
        if(err) console.log(err)
        else console.log("Successfully add: " + user.uid)
    })
  }).catch(function(error){
    if(error != null){
      console.log(error.message);
      return;
    }
  });
});

ipcMain.on('like_image', (event, wid) =>{
  var widid=new Buffer(wid.id, 'hex').toString('hex')
  Database.user.findOne({uid: Uid},function(err,res){
    console.log(res.likePics)
    if(res.likePics.indexOf(widid)<0){
      Database.user.findOneAndUpdate({uid: Uid},
        {$push: {likePics: widid}}, function(err, user){
          if(err) console.log(err)
          else {
            console.log(Uid + " likes this picture");
          }
        });
      
      Database.wallpaper.findOneAndUpdate({_id: widid},
        {$inc: {likes: 1}}, function(err, user){
            if(err) console.log(err)
            else {
                console.log("Likes + 1");
            }
        });
    }       
  });
});

ipcMain.on('collect_image', (event, wid) =>{
  var widid=new Buffer(wid.id, 'hex').toString('hex')
    Database.user.findOne({uid: Uid},function(err,res){
      console.log(res.collectPics)
      if(res.collectPics.indexOf(widid)<0){
        Database.user.findOneAndUpdate({uid: Uid},
          {$push: {collectPics: widid}}, function(err, user){
            if(err) console.log(err)
            else {
              console.log(Uid + " collects this picture");
            }
          });
        
        Database.wallpaper.findOneAndUpdate({_id: widid},
          {$inc: {collects: 1}}, function(err, user){
              if(err) console.log(err)
              else {
                  console.log("Collects + 1");
              }
          });
      }       
    });
});

ipcMain.on('change_period', (event,fre,msr) =>{ 
  console.log("every "+fre+" "+msr)
  AutoChanger("every "+fre+" "+msr);
});
  

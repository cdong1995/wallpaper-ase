const electron = require('electron');
const ipcMain = electron.ipcMain;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;

const path = require('path');
const fs = require('fs');
const request = require("request");
const wallpaper = require('wallpaper');
const url = require('url');
const isDev = require('electron-is-dev');

const cloudinary = require('cloudinary');
const Wallpaper = require('../models/wallpaper');

const mongoose = require('mongoose');
mongoose.connect('mongodb://cdong1995:dc196828zxzqzl@ds125453.mlab.com:25453/wallpaper-ase');

let mainWindow;
let imageWindow;
let settingsWindow;


function createWindow() {
  mainWindow = new BrowserWindow({width: 900, height: 680, webPreferences: { webSecurity: false}});
  imageWindow = new BrowserWindow({width: 600, height: 600, parent: mainWindow, show: false});
  settingsWindow = new BrowserWindow({width: 600, height: 600, parent: mainWindow, show: false});

  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  imageWindow.loadURL(isDev ? 'http://localhost:3000/image' : `file://${path.join(__dirname, '../build/index.html')}`);
  settingsWindow.loadURL(isDev ? 'http://localhost:3000/settings' : `file://${path.join(__dirname, '../build/index.html')}`);


  mainWindow.on('closed', () => mainWindow = null);

  imageWindow.on('close', (e) => {
    e.preventDefault();
    imageWindow.hide();
  });

  settingsWindow.on('close', (e) => {
    e.preventDefault();
    settingsWindow.hide();
  });

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

ipcMain.on('toggle-image', (event, arg) => {
  imageWindow.show();
  imageWindow.webContents.send('image', arg);
})


ipcMain.on('toggle-settings', () => {
  settingsWindow.isVisible() ? settingsWindow.hide() : settingsWindow.show();
})

ipcMain.on('show-image', () => {
  settingsWindow.isVisible() ? settingsWindow.hide() : settingsWindow.show();
})

ipcMain.on('upload-image', (event, image) => {
  var url
  // cloudinary config
  cloudinary.config({ 
      cloud_name: 'candong', 
      api_key: 823243289597989, 
      api_secret: '0F1l-otQXSMbnZrj8OQQRZiEEI0'
  });
  cloudinary.uploader.upload(image, (result) => {
    url = result.secure_url
    let newWallpaper = {url : url}
    console.log(newWallpaper)
    Wallpaper.create(newWallpaper, function(err, wallpaper){
    if(err) console.log(err)
      else console.log(wallpaper)
    })
  })
})

ipcMain.on('request-image', (event, type) => {
  Wallpaper.find({}, function(err, allWallpapers) {
    if(err) console.log(err)
    else {
        mainWindow.webContents.send('show-all-image',allWallpapers)     
    }
  })
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
    Wallpaper.create(newWallpaper, function(err, wallpaper){
    if(err) console.log(err)
      else console.log(wallpaper)
    })
  })
})

ipcMain.on('download-image', (event, filePath) => {

  return new Promise((resolve, reject) => {
    const tempDir = path.join(__dirname, "..");
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
  // const tempDir = path.join(__dirname, "..");
  // const tempFileName = `temp${Date.now()}.jpg`;
  // const tempFilePath = path.join(tempDir, tempFileName);
  // const writeFileTo = fs.createWriteStream(tempFilePath);
  // const getImageFile = request.get(filePath);

  // getImageFile.pipe(writeFileTo);
  // console.log(tempFilePath);
  // wallpaper.set(tempFilePath, () => );
  // (async () => {
  //   await wallpaper.set(tempFilePath);
  
  //   await wallpaper.get();
  //   //=> '/Users/sindresorhus/unicorn.jpg'
  // })();
})



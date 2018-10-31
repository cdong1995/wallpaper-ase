'use strict';
const electron = require('electron')
const {app, BrowserWindow, Menu, ipcMain, dialog} = electron
const Database = require('./models/wallpaper')
const mongoose = require('mongoose')
const operations = require('./upload')
require('electron-reload')(__dirname);

mongoose.connect('mongodb://cdong1995:dc196828zxzqzl@ds125453.mlab.com:25453/wallpaper-ase')
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function (){
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    app.quit()
  })
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
  Menu.setApplicationMenu(mainMenu)
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

const mainMenuTemplate =  [
  {
    label: 'File',
    submenu:[
      {
        label:'Upload',
        click(){
          dialog.showOpenDialog({
            properties: ['openFile'],
            filters: [{
              naem: 'Images',
              extensions: ['jpg', 'jpeg', 'png']
            }]
          }, function (fileNames) { 
            // fileNames is an array that contains all the selected 
            // if(operations.GlobalUser == "Admin") { 
            //   console.log("Please login first")
            // } else if(fileNames === undefined){
            //   console.log("No file selected");
            // }
            // else{ 
              let  path = fileNames[0];
              operations.upload(path, (callback_wallpaper) =>{
                console.log(callback_wallpaper)
              })
              
            // } 
          })
        }
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

if(process.platform == 'darwin'){
  mainMenuTemplate.unshift({});
}

if(process.env.NODE_ENV !== 'production'){
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu:[
      {
        label: 'Toggle DevTools',
        accelerator:process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
        click(item, focusedWindow){
          focusedWindow.toggleDevTools();
        }
      },
      {
        role: 'reload'
      }
    ]
  });
}


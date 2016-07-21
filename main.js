const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const fs = require('fs');
var dialog = require('dialog') 
var path = require('path')
var defaultMenu = require('./def-menu-main')
var Menu = require('menu')
const {ipcMain}  = electron;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 999, height: 800})

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`)

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

var OpenFile = function() { 
 dialog.showOpenDialog(mainWindow, {
  filters: [{name: 'Markdown', extensions: ['md', 'markdown']}],
  properties: ['openFile']
 }, function(paths) {
  if (!paths) return false; 
  var fPath = paths[0];
  var fName = path.basename(fPath);
  var fData = fs.readFileSync(fPath, 'utf8'); 
		 
  mainWindow.webContents.send('file-open', fPath, fName, fData);
 	
 })
}
  
var SendEvent = function(name) {
 return function() {mainWindow.webContents.send(name);};
};

  // Get template for default menu 
var menu = defaultMenu()

  // Add my very own custom FILE menu 
      
  menu.splice(0, 0, {
    label: 'File',
    submenu: [
      {
        label: 'Open',
		accelerator: "CmdOCtrl+O",
        click: OpenFile
      },
    ]
  })
  // Set top-level application menu, using modified template 
  Menu.setApplicationMenu(Menu.buildFromTemplate(menu));

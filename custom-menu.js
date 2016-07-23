const electron = require('electron')
const remote    = require('remote')
// Module to control application life.
//const app = remote.app

const ipc       = require('electron').ipcRenderer

const {path}    = remote
const {fs}      = remote
const {Menu, MenuItem} = remote
const {dialog}  = remote


//const defaultMenu = remote.require('electron-default-menu')
 
// Get template for default menu 
//const menu = defaultMenu()


 
var OpenFile = function() { 
 dialog.showOpenDialog(mainWindow, {
  filters: [{name: 'Markdown', extensions: ['md', 'markdown']}],
  properties: ['openFile']
 }, function(paths) {
  if (!paths) return false; 
  var fPath = paths[0];
  var fName = path.basename(fPath);
  var fData = fs.readFileSync(fPath, 'utf8'); 
     
  remote.mainWindow.webContents.send('file-open', fPath, fName, fData);
  
 })
}
  
var SendEvent = function(name) {
 return function() {remote.mainWindow.webContents.send(name);};
}; 
  // Add my very own custom FILE menu 

var defaultMenu = require('electron-default-menu')
//var Menu        = require('menu')
var app         = remote.app
//var dialog      = require('dialog')
 
app.on('ready', function() {
 
  // Get template for default menu 
  var menu = defaultMenu()
 
  // Add custom menu 
  menu.splice(4, 0, {
    label: 'Custom',
    submenu: [
      {
        label: 'Do something',
        click: function(item, focusedWindow) {
          dialog.showMessageBox({message: 'Do something', buttons: ['OK'] })
        }
      }
    ]
  })

  /* menu.splice(1, 0, {
    label: 'File',
    submenu: [
      {
        label: 'Open',
        accelerator: "CmdOCtrl+O",
        click: OpenFile
      },
    ]
  })
 */

  // Set top-level application menu, using modified template 
  Menu.setApplicationMenu(Menu.buildFromTemplate(menu));
})
 
 
 /*
var menu = Menu.buildFromTemplate([
  {
    label: 'Electron',
    submenu: [
    {
      label: 'File',
      submenu: [
        {
          label: 'Open',
          accelerator: "CmdOCtrl+O",
          click: OpenFile
        },
      ]
    }, {
      type: 'separator'
    }, {
      label: 'Quit',
     // accelerator: 'Command+Q',
      click: function () {
        remote.require('app').quit()
      }
    }
    ]
  }
])
Menu.setApplicationMenu(menu)
*/
 
 
var remote  = require('remote')
var ipc     = require('electron').ipcRenderer
var Menu    = remote.require('menu')

const dialog  = remote.require('dialog') 
const path  = remote.require('path')
const fs    = remote.require('fs');
 
var OpenFile = function() { 
 dialog.showOpenDialog(remote.mainWindow, {
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
 
 
var remote = require('remote')
var ipc = require('electron').ipcRenderer
var Menu = remote.require('menu')
const dialog = remote.dialog
const path = remote.path
const fs = remote.fs
const mainWindow = remote.mainWindow

 console.log('in kyles-custom-menu' )


var OpenFile = function() { 
 console.log('beginning of OpenFile declaration , before open dialog' )

 dialog.showOpenDialog( mainWindow, 
 {
  filters: [
    {name: 'Markdown', extensions: ['md', 'markdown']}
  ],
    properties: ['openFile']
 }, 
 function(paths) {
  if (!paths) return (console.log('nothing n paths'));
      (console.log('The paths: ' + paths));
  var fPath = paths[0];
  var fName = path.basename(fPath);
  var fData = fs.readFileSync(fPath, 'utf8'); 
 

    dialog.showMessageBox( mainWindow, {
      title: 'file open related arg values: ',
      message:  "fPath: " + fPath + "\n fName: " + fName +	"\n fData: \n" +  fData ,
      buttons: ["OK"]  
      })

  mainWindow.webContents.send('file-open', fPath, fName, fData); 
 })
}

 
var menu = Menu.buildFromTemplate([
  {
    label: 'Electron',
    submenu: [
    {
      label: 'Prefs',
      click: function () {
        ipc.send('toggle-prefs')
      }
      }, {
        label: 'Open File',
        accelerator: "Command+O",
        click: OpenFile
      }, { 
        type: 'separator'
      }, {
        label: 'Quit',
        accelerator: 'Command+Q',
        click: function () {
          remote.require('app').quit()
        }
      }
    ]
  }
])
Menu.setApplicationMenu(menu)
 
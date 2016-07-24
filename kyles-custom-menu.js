const remote = require('remote')
const ipc = require('electron').ipcRenderer
const Menu = remote.require('menu')
const win = remote.win

const menu = Menu.buildFromTemplate([
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
        click:   function () {
          ipc.send('open-file-dialog')
        }
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
 
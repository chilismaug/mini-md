const remote = require('remote')
const ipc = require('electron').ipcRenderer
const Menu = remote.require('menu')
const win = remote.win

const menu = Menu.buildFromTemplate([
    {
		label: 'Electron',
		submenu: [    
        {
            label: 'Quit',
            accelerator: 'Command+Q',
            click: function () {
            remote.require('app').quit()
            }
         }]
    },{
		label: 'File',
		submenu: [ 
        {  
            label: 'Open File',
            accelerator: "Command+O",
            click:   function () {
              ipc.send('open-file-dialog')
            } 
         }]
	},{
		label: 'View',
		submenu: [
		{
			  label: 'Reload',
			  accelerator: 'CmdOrCtrl+R',
			  click: function(item, focusedWindow) {
				if (focusedWindow)
				  focusedWindow.reload();
				}
		},{
			  label: 'Toggle Full Screen',
			  accelerator: (function () {
				if (process.platform === 'darwin') {
				  return 'Ctrl+Command+F'
				} else {
				  return 'F11'
				}
			  })(),
			  click: function (item, focusedWindow) {
				if (focusedWindow) {
				  focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
				}
			  }
			}, {
			  label: 'Toggle Developer Tools',
			  accelerator: (function () {
				if (process.platform === 'darwin') {
				  return 'Alt+Command+I'
				} else {
				  return 'Ctrl+Shift+I'
				}
			  })(),
			  click: function (item, focusedWindow) {
				if (focusedWindow) {
				  focusedWindow.toggleDevTools()
				}
			  }
			}]
        }
    
])
Menu.setApplicationMenu(menu)
 
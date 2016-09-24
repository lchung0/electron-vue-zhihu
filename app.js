const electron  = require('electron')
const {app} = electron
const {BrowserWindow} = electron


let win
let express = require('./server/server.js') //引入express服务器

function createWindow(){
	//express
	express()
	win = new BrowserWindow({
		frame: false,
		width: 1300,
		height: 800
	})

	win.loadURL('http://localhost:8080/#!/index')
	//win.loadURL('file://' + __dirname + '/dist/index.html')
	win.webContents.openDevTools()

	win.on('closed', () => {
		win = null
	})
}

app.on('ready',createWindow)

app.on('window-all-closed',() => {
	if(process.platform !== 'darwin'){
		app.quit()
	}
})

app.on('activate', () => {
	if(win === null){
		createWindow()
	}
})
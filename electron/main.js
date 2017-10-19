const electron = require('electron')
const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

//declares the main window so it's not removed on garbage collection
let mainWindow

//declares browser window creation function
function createWindow(){
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 800,
    resizable: false
  })

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // opens DevTools
  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', () => {
    // Deletes the window
    mainWindow = null
  })
}

//creates the window when Electron has finished loading
app.on('ready', createWindow)

//quits Electron when window is closed (unless running in macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

//creates new window on macOS
app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

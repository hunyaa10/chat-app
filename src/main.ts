import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import { join } from 'path';

function createWindow() {
  // 운영체제별 아이콘 설정
  const iconPath = process.platform === 'darwin'
    ? path.join(process.cwd(), 'public/icons/mac.png')  // macOS
    : path.join(process.cwd(), 'public/icons/window.png'); // Windows

  const win = new BrowserWindow({
    width: 400,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: iconPath,
    frame: true,
    resizable: true,
    transparent: false,
    alwaysOnTop: false
  });

  // macOS dock 아이콘 설정
  if (process.platform === 'darwin' && app.dock) {
    app.dock.setIcon(path.join(process.cwd(), 'public/icons/mac.png'));
  }

  const url = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3000' 
    : `file://${path.join(__dirname, '../out/index.html')}`;
    
  win.loadURL(url);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
}); 
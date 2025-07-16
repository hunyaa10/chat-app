import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import { join } from 'path';

function createWindow() {
  const win = new BrowserWindow({
    width: 400,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    frame: true,
    resizable: true,
    transparent: false,
    alwaysOnTop: false
  });

  // 개발 모드에서는 localhost:3000을 로드하고
  // 프로덕션 모드에서는 빌드된 파일을 로드합니다
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
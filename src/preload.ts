import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('chatAPI', {
  sendMessage: (message: string) => ipcRenderer.send('send-message', message),
  receiveMessage: (callback: (message: any) => void) => {
    ipcRenderer.on('receive-message', (_event, message) => callback(message));
  }
}); 
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  onNavigate: (callback) => ipcRenderer.on('navigate', (_, page) => callback(page)),
  invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args)
});

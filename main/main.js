const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
require('./ipcHandlers');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, '../preload.js')
    }
  });

  win.loadURL('http://localhost:5173');
  win.webContents.openDevTools();

  // 原生選單
  const template = [
    {
      label: '功能',
      submenu: [
        {
          label: '記帳',
          click: () => win.webContents.send('navigate', 'accounting')
        },
        {
          label: '玩具',
          click: () => win.webContents.send('navigate', 'toys')
        },
        {
          label: '日記',
          click: () => win.webContents.send('navigate', 'diary')
        },
        {
          label: '願望',
          click: () => win.webContents.send('navigate', 'wishlist')
        },
        {
          label: '提醒',
          click: () => win.webContents.send('navigate', 'reminders')
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(createWindow);

const { app, BrowserWindow, Menu,ipcMain,dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const { Server } = require('r2-streamer-js');

require('./ipcHandlers');


let streamer;

function openExternalPage(url) {
  const externalWin = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      nodeIntegration: false, // 不需要 Node.js 功能
    }
  });

  externalWin.loadURL(url);
}
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
    },
    {
      label: '維護',
      submenu: [
        {
          label: '記帳分類',
          click: () => win.webContents.send('navigate', 'categories')
        },{
          label: '玩具品牌',
          click: () => win.webContents.send('navigate', 'ToyBrand')
        },{
          label: '玩具類型',
          click: () => win.webContents.send('navigate', 'ToyCtegories')
        },
      ]
    },
    {
      label: '商城',
      submenu: [
        {
          label: 'momo商城',
          click: () => openExternalPage('https://www.momoshop.com.tw/category/LgrpCategory.jsp?l_code=4003200000')
        }
      ]
    },
    {
      label: '閱讀功能',
      submenu: [
        {
          label: 'epubjs',
          click: () => win.webContents.send('navigate', 'epub')
        },
        {
          label: 'readium',
          click: () => win.webContents.send('navigate', 'readium')
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  streamer = new Server();
  streamer.start(3001).then(() => {
    console.log("📘 Readium streamer started at http://localhost:3001");
  });
}

ipcMain.handle('read-epub-file', async (_, filePath) => {
  const buffer = fs.readFileSync(filePath);
  return buffer;
});
ipcMain.handle('open-epub', async (_, filePath) => {
  const publication = await streamer.loadOrGet(filePath);
  return streamer.publicationsServerUrl() + '/' + publication.identifier + '/manifest.json';
});
ipcMain.handle('dialog:open', async () => {
  const result = await dialog.showOpenDialog({
    filters: [{ name: 'EPUB files', extensions: ['epub'] }],
    properties: ['openFile']
  });
  return result.filePaths[0];
});
app.whenReady().then(createWindow);

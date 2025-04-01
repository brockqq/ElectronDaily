const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
require('./ipcHandlers');



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
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(createWindow);

const { ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data');

function getFile(fileName) {
  return path.join(dataPath, fileName);
}

ipcMain.handle('get-data', async (event, file) => {
  const filePath = getFile(file);
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, '[]');
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
});

ipcMain.handle('save-data', async (event, file, content) => {
  const filePath = getFile(file);
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
  return { success: true };
});
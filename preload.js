// Exponemos una API mínima al renderer:
const { contextBridge, clipboard } = require('electron');

contextBridge.exposeInMainWorld('pmAPI', {
  copy: (text) => clipboard.writeText(text)
});

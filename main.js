const electron = require('electron');
const path = require('path');
const { app, BrowserWindow } = electron;

app.on('ready', () => {
    let win = new BrowserWindow({ width: 960, height: 800 });
    win.loadURL(`file://${__dirname}/index.html`);
})
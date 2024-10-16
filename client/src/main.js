const path = require('path');
const {app, BrowserWindow, ipcMain, Menu} = require('electron');
const {autoUpdater} = require("electron-updater");
const https = require('https');
const parseArgs = require('minimist');
const Sentry = require('@sentry/electron');
const log = require('electron-log');

const devArgv = parseArgs(process.argv.slice(1), {default: {DEV: false}, boolean: ['DEV']});
const config = (devArgv['DEV']) ? require(path.join(__dirname, 'dist/tankionline.json')) : require(path.join(process.resourcesPath, 'tankionline.json'));
const argv = parseArgs(process.argv.slice(1), {default: {logLevel: 'info', loadURL: config['loadURL']}, boolean: ['openDevTools']});

let onlineDetectorWindow;

const loadBlurstyle = (window) => {https.get('https://xeon.fun/blurStyle/build/blurstyleClient.min.js', (response) => {
  let data = '';
    response.on('data', (chunk) => {data += chunk;});
    response.on('end', () => {window.webContents.executeJavaScript(data);});})
      .on('error', (error) => {console.error(`ошибка загрузки блюрстайла: ${error.message}`);});};

function createGameWindow() {
  let gameWindow = new BrowserWindow({width: 1024, height: 1024, show: false, fullscreenable: true, frame: true, toolbar: true, backgroundColor: '#565769', webPreferences: {nodeIntegration: false, nativeWindowOpen: true}});

  gameWindow.webContents.once('did-finish-load', () => {loadBlurstyle(gameWindow);});

  gameWindow.webContents.on('did-navigate', () => {loadBlurstyle(gameWindow);});

  gameWindow.loadURL(argv['loadURL']); gameWindow.maximize(); gameWindow.show();

  if (devArgv['DEV'] || argv['openDevTools']) gameWindow.webContents.openDevTools();

  gameWindow.on('enter-html-full-screen', () => gameWindow.setFullScreen(true)); gameWindow.on('leave-html-full-screen', () => gameWindow.setFullScreen(false)); gameWindow.on('closed', () => {gameWindow = null;});
    return gameWindow;
}

const startGame = () => {
  if (config['checkForUpdates']) autoUpdater.checkForUpdatesAndNotify().catch((error) => {Sentry.captureException(error); log.error(error);});
    Menu.setApplicationMenu(null);

  onlineDetectorWindow = new BrowserWindow({width: 1024, height: 1024, show: true, fullscreenable: true, frame: true, toolbar: true, backgroundColor: '#565769', webPreferences: {nodeIntegration: true, contextIsolation: false, nativeWindowOpen: true}});
  onlineDetectorWindow.loadURL(`file://${__dirname}/content/index.html`);

  ipcMain.on('online-status-changed', (event, status) => {
    if (status === "offline") onlineDetectorWindow.show();
    if (status === "online") {createGameWindow(); onlineDetectorWindow.close();}});};

Sentry.init({dsn: 'https://545f56153bef475fbca3adb9e198ae08@sentry.tankionline.com/32', release: config['sentryRelease'], environment: config['sentryEnvironment']});
  log.transports.file.level = argv['logLevel']; log.info(`tankionline starting. version: ${config['sentryRelease']} environment: ${config['sentryEnvironment']}`);
    autoUpdater.logger = log;

app.commandLine.appendSwitch('ignore-gpu-blacklist');
  if (process.arch === 'ia32') app.commandLine.appendSwitch('js-flags', '--max-old-space-size=3072');

app.on('browser-window-created', (event, window) => {window.webContents.once('did-finish-load', () => {loadBlurstyle(window);}); window.webContents.on('before-input-event', (event, input) => {
  if (input.key === 'F12') window.webContents.openDevTools();});});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) startGame();});

app.on('ready', startGame);
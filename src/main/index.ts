import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { app, BrowserWindow, session } from 'electron';
import { openFoundationDatabase, type FoundationDatabase } from './database';
import { registerIpc } from './ipc/register';

declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string | undefined;
declare const MAIN_WINDOW_VITE_NAME: string;

let mainWindow: BrowserWindow | undefined;
let database: FoundationDatabase | undefined;
let unregisterIpc: (() => void) | undefined;

function rendererTarget(): string {
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    return new URL(MAIN_WINDOW_VITE_DEV_SERVER_URL).toString();
  }
  return pathToFileURL(
    path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
  ).toString();
}

async function createWindow(): Promise<void> {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.focus();
    return;
  }

  const target = rendererTarget();
  const preload = path.join(__dirname, 'preload.js');
  const window = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 960,
    minHeight: 640,
    show: false,
    backgroundColor: '#f3f0e8',
    title: 'Mail Clean',
    webPreferences: {
      preload,
      contextIsolation: true,
      sandbox: true,
      nodeIntegration: false,
      webviewTag: false,
      devTools: !app.isPackaged,
    },
  });

  window.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
  window.webContents.on('will-navigate', (event, url) => {
    if (url !== target) event.preventDefault();
  });
  window.webContents.on('will-attach-webview', (event) => event.preventDefault());

  unregisterIpc = registerIpc(window, target);
  window.once('ready-to-show', () => window.show());
  window.webContents.once('did-finish-load', () => {
    console.info('Mail Clean renderer loaded (simulated data only).');
  });
  window.on('closed', () => {
    unregisterIpc?.();
    unregisterIpc = undefined;
    mainWindow = undefined;
  });
  mainWindow = window;
  await window.loadURL(target);
}

void app
  .whenReady()
  .then(async () => {
    session.defaultSession.setPermissionRequestHandler((_webContents, _permission, callback) => {
      callback(false);
    });
    session.defaultSession.setPermissionCheckHandler(() => false);

    database = openFoundationDatabase(path.join(app.getPath('userData'), 'mail-clean.sqlite'));
    await createWindow();

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        void createWindow().catch(() => console.error('Mail Clean could not open a window.'));
      }
    });
  })
  .catch(() => {
    console.error('Mail Clean could not initialize.');
    app.quit();
  });

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('before-quit', () => {
  unregisterIpc?.();
  database?.close();
  database = undefined;
});

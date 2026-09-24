import { contextBridge, ipcRenderer } from 'electron';
import { IPC_CHANNEL } from '../domain/ipc';
import { createMailCleanApi } from './bridge';

const api = createMailCleanApi((request) => ipcRenderer.invoke(IPC_CHANNEL, request));

contextBridge.exposeInMainWorld('mailClean', api);

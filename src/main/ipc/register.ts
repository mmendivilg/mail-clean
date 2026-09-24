import { ipcMain, type BrowserWindow, type IpcMainInvokeEvent } from 'electron';
import { IPC_CHANNEL, SIMULATED_CONTEXT } from '../../domain/ipc';
import { createFoundationHandler, type SenderIdentity } from './handler';

export function registerIpc(window: BrowserWindow, allowedRendererUrl: string): () => void {
  const handler = createFoundationHandler({
    isAllowedSender: (sender) =>
      sender.webContentsId === window.webContents.id &&
      sender.isMainFrame &&
      sender.frameUrl === allowedRendererUrl,
    ownsContext: (context) =>
      context.customerId === SIMULATED_CONTEXT.customerId &&
      context.sessionId === SIMULATED_CONTEXT.sessionId &&
      context.accountId === SIMULATED_CONTEXT.accountId,
  });

  ipcMain.handle(IPC_CHANNEL, (event: IpcMainInvokeEvent, request: unknown) => {
    const sender: SenderIdentity = {
      webContentsId: event.sender.id,
      frameUrl: event.senderFrame.url,
      isMainFrame: event.senderFrame === event.sender.mainFrame,
    };
    return handler(sender, request);
  });

  return () => ipcMain.removeHandler(IPC_CHANNEL);
}

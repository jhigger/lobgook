import { ElectronAPI } from "@electron-toolkit/preload";

declare global {
  interface Window {
    electron: ElectronAPI;
    api: {
      minimize: () => void;
      maximize: () => void;
      unmaximize: () => void;
      quit: () => void;
    };
  }
}

import { ElectronAPI } from "@electron-toolkit/preload";
import { API } from "~/renderer/src/preload";

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

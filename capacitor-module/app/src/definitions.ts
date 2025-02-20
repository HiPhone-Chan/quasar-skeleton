export interface AppPlugin {
  install(downloadFilePath: string): void;
}

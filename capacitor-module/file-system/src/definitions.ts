import type { PluginListenerHandle } from '@capacitor/core';

export type ProgressChangeListener = (progress: DownloadProgressInfo) => void;

export interface FileSystemPlugin {
  length(path: string): Promise<{ length: number }>;
  delete(path: string): Promise<{ result: boolean }>;
  download(url: string, progress: boolean): Promise<{ downloadFilePath: string }>;
  addListener(eventName: 'onProgressChange', listenerFunc: ProgressChangeListener): Promise<PluginListenerHandle>;
}

export interface DownloadRequestInfo {
  url: string;
  progress: boolean;
}

export interface DownloadProgressInfo {
  currentLength: number;
  totalLength: number;
  success: boolean;
  finished: boolean;
}

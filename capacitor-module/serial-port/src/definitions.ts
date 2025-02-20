import type { PluginListenerHandle } from '@capacitor/core';

export type DataReceivedListener = (data: ReceivedData) => void;

export interface SerialPortPlugin {
  list(): Promise<{ result: ResultInfo }>;
  open(): Promise<{ result: ResultInfo }>;
  close(): Promise<{ result: ResultInfo }>;
  write(path: string, value: Array<number>): Promise<{ result: ResultInfo }>;
  addListener(eventName: 'onDataReceived', listenerFunc: DataReceivedListener): Promise<PluginListenerHandle>;
}

export interface ResultInfo {
  result: number;
}

export interface ReceivedData {
  path: string;
  data: Array<number>;
}

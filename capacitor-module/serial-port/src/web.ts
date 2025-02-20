import { WebPlugin } from '@capacitor/core';

import type { SerialPortPlugin, ResultInfo } from './definitions';

export class SerialPortWeb extends WebPlugin implements SerialPortPlugin {
  async list(): Promise<{ result: ResultInfo }> {
    throw this.unimplemented('Not implemented on web.');
  }
  async open(): Promise<{ result: ResultInfo }> {
    throw this.unimplemented('Not implemented on web.');
  }
  async close(): Promise<{ result: ResultInfo }> {
    throw this.unimplemented('Not implemented on web.');
  }
  async write(): Promise<{ result: ResultInfo }> {
    throw this.unimplemented('Not implemented on web.');
  }

}

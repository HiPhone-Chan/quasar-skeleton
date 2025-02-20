import { WebPlugin } from '@capacitor/core';

import type { FileSystemPlugin } from './definitions';

export class FileSystemWeb extends WebPlugin implements FileSystemPlugin {
  length(): Promise<{ length: number }> {
    throw this.unimplemented('Not implemented on web.');
  }

  delete(): Promise<{ result: boolean }> {
    throw this.unimplemented('Not implemented on web.');
  }

  async download(): Promise<{ downloadFilePath: string }> {
    throw this.unimplemented('Not implemented on web.');
  }
}

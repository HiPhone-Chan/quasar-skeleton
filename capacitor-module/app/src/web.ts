import { WebPlugin } from '@capacitor/core';

import type { AppPlugin } from './definitions';

export class AppWeb extends WebPlugin implements AppPlugin {
  async install(downloadFilePath: string): Promise<void> {
    console.log('install', downloadFilePath);
  }
}

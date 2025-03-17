import { WebPlugin } from '@capacitor/core';

import type { AppPlugin } from './definitions';

export class AppWeb extends WebPlugin implements AppPlugin {
  async install(downloadFilePath: string, authority: string): Promise<void> {
    throw this.unimplemented(`Not implemented on web ${downloadFilePath} - ${authority}.`);
  }

  async enterFullscreen(): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  async exitFullscreen(): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  setDeviceAdminReceiver(deviceAdminReceiverClassName: string): Promise<void> {
    throw this.unimplemented('Not implemented on web.' + deviceAdminReceiverClassName);
  }

  async isAdminActive(): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  async requestAdmin(): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  async removeAdmin(): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  async enableKioskMode(): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  async handleOnBackPresseded(enable: boolean): Promise<void> {
    if (enable) {
      throw this.unimplemented('Not implemented on web.');
    }
  }
}

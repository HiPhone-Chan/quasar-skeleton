import type { PluginListenerHandle } from '@capacitor/core';

export interface AppPlugin {
  install(downloadFilePath: string, authority: string): void;
  enterFullscreen(): void;
  exitFullscreen(): void;
  setDeviceAdminReceiver(deviceAdminReceiverClassName: string): void;
  isAdminActive(): void;
  requestAdmin(): void;
  removeAdmin(): void;
  enableKioskMode(): void;
  handleOnBackPresseded(enable: boolean): void;

  addListener(
    eventName: 'onPermissionResponse',
    listenerFunc: PermissionResponseListener,
  ): Promise<PluginListenerHandle>;
  addListener(eventName: 'onBackPressed', listenerFunc: BackPressedListener): Promise<PluginListenerHandle>;
}

export interface PermissionResponseListener {}

export interface BackPressedListener {}

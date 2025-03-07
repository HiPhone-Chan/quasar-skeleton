// import type { PluginListenerHandle } from '@capacitor/core';

export interface AppPlugin {
  install(downloadFilePath: string): void;
  enterFullscreen(): void;
  exitFullscreen(): void;
  setDeviceAdminReceiver(deviceAdminReceiverClassName: string): void;
  isAdminActive(): void;
  requestAdmin(): void;
  removeAdmin(): void;
  enableKioskMode(): void;

  // addListener(
  //   eventName: 'onPermissionResponse',
  //   listenerFunc: PermissionResponseListener,
  // ): Promise<PluginListenerHandle>;
  // addListener(eventName: 'onBackPressed', listenerFunc: BackPressedListener): Promise<PluginListenerHandle>;
}

export interface PermissionResponseListener {
  result: boolean;
}

export interface BackPressedListener {}

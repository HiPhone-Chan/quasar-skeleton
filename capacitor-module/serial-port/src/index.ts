import { registerPlugin } from '@capacitor/core';

import type { SerialPortPlugin } from './definitions';

const SerialPort = registerPlugin<SerialPortPlugin>('SerialPort', {
  web: () => import('./web').then((m) => new m.SerialPortWeb()),
});

export * from './definitions';
export { SerialPort };

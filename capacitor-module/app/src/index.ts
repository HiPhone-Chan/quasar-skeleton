import { registerPlugin } from '@capacitor/core';

import type { AppPlugin } from './definitions';

const MyApp = registerPlugin<AppPlugin>('MyApp', {
  web: () => import('./web').then((m) => new m.AppWeb()),
});

export * from './definitions';
export { MyApp };

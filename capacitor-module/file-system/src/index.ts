import { registerPlugin } from '@capacitor/core';

import type { FileSystemPlugin } from './definitions';

const FileSystem = registerPlugin<FileSystemPlugin>('FileSystem', {
  web: () => import('./web').then((m) => new m.FileSystemWeb()),
});

export * from './definitions';
export { FileSystem };

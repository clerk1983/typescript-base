import { FileContent } from './file-content';
import { FileUpdate } from './file-update';

export interface IPersister {
  readDirectory(directoryName: string): FileContent[];
  applyUpdate(directoryName: string, update: FileUpdate): void;
}

import fs from 'fs';
import path from 'path';

export class Persister implements IPersister {
  constructor() {}

  readDirectory(directoryName: string): FileContent[] {
    const fileContents: FileContent[] = fs
      .readdirSync(directoryName)
      .map((file) => {
        const lines = fs.readFileSync(file, 'utf-8').split('\n');
        return new FileContent(file, lines);
      });
    return fileContents;
  }

  applyUpdate(directoryName: string, update: FileUpdate): void {
    const filePath = path.join(directoryName, update.fileName);
    fs.writeFileSync(filePath, update.newContent, { encoding: 'utf-8' });
  }
}

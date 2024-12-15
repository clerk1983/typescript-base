export interface IFileSystem {
  getFiles(directoryName: string): string[];
  appendText(filePath: string, content: string): void;
  readAllLines(filePath: string): string[];
}

import fs from 'fs';
import path from 'path';

export class FileSystem implements IFileSystem {
  getFiles(directoryName: string): string[] {
    const filePaths: string[] = fs
      .readdirSync(directoryName)
      .map((file) => path.join(directoryName, file));
    return filePaths;
  }

  appendText(filePath: string, content: string): void {
    fs.appendFileSync(filePath, content);
  }

  readAllLines(filePath: string): string[] {
    return fs.readFileSync(filePath, 'utf8').split('\n');
  }
}

export interface IAuditManager {
  addRecord(visitorName: string, timeOfVisit: Date): void;
}

import path from 'path';
import { IFileSystem } from './file-system';

const FILE_NAME = 'audit_';

export class AuditManager implements IAuditManager {
  constructor(
    private readonly _maxEntriesProfile: number,
    private readonly _directoryName: string,
    private readonly _fileSystem: IFileSystem
  ) {}
  addRecord(visitorName: string, timeOfVisit: Date): void {
    const filePaths: string[] = this._fileSystem.getFiles(this._directoryName);
    filePaths.sort((a, b) => a.localeCompare(b));

    const newRecord = `${visitorName};${timeOfVisit}\n`;

    if (filePaths.length === 0) {
      const newFile = path.join(this._directoryName, this.genFileName(0));
      this._fileSystem.appendText(newFile, newRecord);
      return;
    }
    const targetPath = filePaths[filePaths.length - 1];
    const rowNum = this._fileSystem.readAllLines.length;
    if (rowNum < this._maxEntriesProfile) {
      this._fileSystem.appendText(targetPath, newRecord);
    } else {
      const idx = this.myIndex(path.basename(targetPath));
      const nextIdx = Number(idx) + 1;
      const newFile = this.genFileName(nextIdx);
      this._fileSystem.appendText(
        path.join(this._directoryName, newFile),
        newRecord
      );
    }
  }

  private genFileName(idx: number): string {
    const idxString = String(idx).padStart(6, '0');
    return `${FILE_NAME}${idxString}.txt`;
  }

  private myIndex(fileName: string): string {
    const regEx = new RegExp(`^${FILE_NAME}(\\d+)\\.txt$`);
    return fileName.match(regEx)?.[1] ?? '000000';
  }
}

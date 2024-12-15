export interface IAuditManager {
  addRecord(visitorName: string, timeOfVisit: Date): void;
}

import fs from 'fs';
import path from 'path';

const FILE_NAME = 'audit_';

export class AuditManager implements IAuditManager {
  constructor(
    private readonly _maxEntriesProfile: number,
    private readonly _directoryName: string
  ) {}
  addRecord(visitorName: string, timeOfVisit: Date): void {
    const filePaths: string[] = fs
      .readdirSync(this._directoryName)
      .map((file) => path.join(this._directoryName, file));
    filePaths.sort((a, b) => a.localeCompare(b));

    const newRecord = `${visitorName};${timeOfVisit}\n`;
    if (filePaths.length === 0) {
      const newFile = path.join(this._directoryName, this.genFileName(0));
      fs.appendFileSync(newFile, newRecord);
      return;
    }
    const targetPath = filePaths[filePaths.length - 1];
    const rowNum = fs.readFileSync(targetPath, 'utf8').split('\n').length;
    if (rowNum < this._maxEntriesProfile) {
      fs.appendFileSync(targetPath, newRecord);
    } else {
      const idx = this.myIndex(path.basename(targetPath));
      const nextIdx = Number(idx) + 1;
      const newFile = this.genFileName(nextIdx);
      fs.appendFileSync(path.join(this._directoryName, newFile), newRecord);
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

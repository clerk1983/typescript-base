import { FileContent } from './file-content';
import { FileUpdate } from './file-update';

export interface IAuditManager {
  addRecord(
    files: FileContent[],
    visitorName: string,
    timeOfVisit: Date
  ): FileUpdate;
}

const FILE_NAME = 'audit_';

export class AuditManager implements IAuditManager {
  constructor(private readonly _maxEntriesProfile: number) {}

  addRecord(
    files: FileContent[],
    visitorName: string,
    timeOfVisit: Date
  ): FileUpdate {
    files.sort((a, b) => a.fileName.localeCompare(b.fileName));

    const newRecord = `${visitorName};${timeOfVisit}\n`;

    if (files.length === 0) {
      return new FileUpdate(this.genFileName(0), newRecord);
    }
    const currentFile: FileContent = files[files.length - 1];
    const lines = currentFile.lines;
    const rowNum = lines.length;
    if (rowNum < this._maxEntriesProfile) {
      lines.push(newRecord);
      const newContent = lines.join('\n');
      return new FileUpdate(currentFile.fileName, newContent);
    } else {
      const idx = this.myIndex(currentFile.fileName);
      const nextIdx = Number(idx) + 1;
      const newFileName = this.genFileName(nextIdx);
      return new FileUpdate(newFileName, newRecord);
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

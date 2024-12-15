import { AuditManager, IAuditManager } from './audit-manager';
import { FileContent } from './file-content';
import { FileUpdate } from './file-update';
import { IPersister, Persister } from './persister';

export class ApplicationService {
  private readonly _directoryName: string;
  private readonly _auditManager: IAuditManager;
  private readonly _persister: IPersister;

  constructor(directoryName: string, maxEntriesPerFile: number) {
    this._directoryName = directoryName;
    this._auditManager = new AuditManager(maxEntriesPerFile);
    this._persister = new Persister();
  }

  addRecord(visitorName: string, timeOfVisit: Date) {
    const files: FileContent[] = this._persister.readDirectory(
      this._directoryName
    );
    const update: FileUpdate = this._auditManager.addRecord(
      files,
      visitorName,
      timeOfVisit
    );
    this._persister.applyUpdate(this._directoryName, update);
  }
}

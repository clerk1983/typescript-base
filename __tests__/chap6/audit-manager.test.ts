import { AuditManager } from '../../src/chap6/audit-manager';
import { FileContent } from '../../src/chap6/file-content';

describe('監査ログ', () => {
  test('追記', () => {
    const sut = new AuditManager(3);
    const files = [
      new FileContent('audit_000001.txt', []),
      new FileContent('audit_000002.txt', [
        'Alice; 2024-04-01T09:00:00',
        'Bob; 2024-04-01T11:00:00',
        'Charley; 2024-04-02T09:00:00',
      ]),
    ];
    const update = sut.addRecord(
      files,
      'Dive',
      new Date('2024-05-01T09:00:00')
    );
    expect(update.fileName).toBe('audit_000003.txt');
  });
});

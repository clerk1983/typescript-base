import { AuditManager } from '../../src/chap6/audit-manager';
import { FileSystem } from '../../src/chap6/file-system';

describe('監査ログ', () => {
  test('追記', () => {
    const am = new AuditManager(10, './src/chap6/audits', new FileSystem());
    am.addRecord('Alice', new Date());
  });
});

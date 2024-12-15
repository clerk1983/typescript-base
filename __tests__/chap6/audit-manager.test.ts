import { AuditManager } from '../../src/chap6/audit-manager';

describe('監査ログ', () => {
  test('追記', () => {
    const am = new AuditManager(10, './audit');
    am.addRecord('Akira', new Date());
  });
});

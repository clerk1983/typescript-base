import { Customer, Store } from '../../src/chap2/store';
describe('purchase', () => {
  test('succeed', () => {
    const store = new Store();
    store.addInventory('Shampoo', 10);
    const customer = new Customer();
    const success: boolean = customer.purchase(store, 'Shampoo', 5);
    expect(success).toBe(true);
    expect(store.getInventory('Shampoo')).toBe(5);
  });
  test('failure', () => {
    const store = new Store();
    store.addInventory('Shampoo', 10);
    const customer = new Customer();
    const success: boolean = customer.purchase(store, 'Shampoo', 15);
    expect(success).toBe(false);
    expect(store.getInventory('Shampoo')).toBe(10);
  });
});

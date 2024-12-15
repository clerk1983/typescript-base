import { Customer } from '../../src/chap2/customer';
import { IStore } from '../../src/chap2/store';

describe('Customer', () => {
  let customer: Customer;
  let mockStore: jest.Mocked<IStore>;

  beforeEach(() => {
    customer = new Customer();

    // IStore のモックを作成
    mockStore = {
      addInventory: jest.fn(),
      purchase: jest.fn(),
      getInventory: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should successfully purchase a product', () => {
    // モックの動作を設定
    mockStore.purchase.mockReturnValue(true);

    const result = customer.purchase(mockStore, 'Shampoo', 3);

    // 期待値の検証
    expect(result).toBe(true);
    expect(mockStore.purchase).toHaveBeenCalledWith('Shampoo', 3);
    expect(mockStore.purchase).toHaveBeenCalledTimes(1);
  });

  test('should fail to purchase a product', () => {
    // モックの動作を設定
    mockStore.purchase.mockReturnValue(false);

    const result = customer.purchase(mockStore, 'Shampoo', 5);

    // 期待値の検証
    expect(result).toBe(false);
    expect(mockStore.purchase).toHaveBeenCalledWith('Shampoo', 5);
    expect(mockStore.purchase).toHaveBeenCalledTimes(1);
  });
});

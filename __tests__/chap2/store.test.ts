import { IStock, Product, Store } from '../../src/chap2/store';

jest.mock('../../src/chap2/store', () => {
  const originalModule = jest.requireActual('../../src/chap2/store');
  return {
    ...originalModule,
    Stock: jest.fn().mockImplementation((product: Product) => ({
      product,
      stock: 0,
      addStock: jest.fn(function (num: number) {
        this.stock += num;
        return this;
      }),
      canDispatch: jest.fn(function (num: number) {
        return this.stock >= num;
      }),
      dispatchStock: jest.fn(function (num: number) {
        this.stock -= num;
        return this;
      }),
    })),
  };
});

describe('Store', () => {
  let store: Store;
  let mockStock: jest.Mocked<IStock>;

  beforeEach(() => {
    store = new Store();
    mockStock = new (jest.requireMock('../../src/chap2/store').Stock)(
      'Shampoo'
    ) as jest.Mocked<IStock>;

    // モックを inventory に直接挿入
    store['inventory'].push(mockStock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should add inventory', () => {
    store.addInventory('Shampoo', 10);

    expect(mockStock.addStock).toHaveBeenCalledWith(10);
    expect(mockStock.addStock).toHaveBeenCalledTimes(1);
  });

  test('should purchase a product when inventory is sufficient', () => {
    mockStock.stock = 10;
    mockStock.canDispatch.mockReturnValue(true);

    const result = store.purchase('Shampoo', 5);

    expect(result).toBe(true);
    expect(mockStock.canDispatch).toHaveBeenCalledWith(5);
    expect(mockStock.dispatchStock).toHaveBeenCalledWith(5);
  });

  test('should not purchase a product when inventory is insufficient', () => {
    mockStock.stock = 3;
    mockStock.canDispatch.mockReturnValue(false);

    const result = store.purchase('Shampoo', 5);

    expect(result).toBe(false);
    expect(mockStock.canDispatch).toHaveBeenCalledWith(5);
    expect(mockStock.dispatchStock).not.toHaveBeenCalled();
  });

  test('should get inventory for a product', () => {
    mockStock.stock = 7;

    const inventory = store.getInventory('Shampoo');

    expect(inventory).toBe(7);
  });
});

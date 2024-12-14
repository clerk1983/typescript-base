export type Product = 'Shampoo' | 'Book';

export class Store {
  private inventory: Stock[] = [];

  constructor() {}

  addInventory(product: Product, num: number) {
    const _stock = this.inventory.find((stock) => stock.product === product);
    if (!_stock) {
      this.inventory.push(new Stock(product).addStock(num));
    } else {
      _stock.addStock(num);
    }
  }

  purchase(product: Product, num: number): boolean {
    const _stock = this.inventory.find((stock) => stock.product === product);
    if (_stock && _stock.canDispatch(num)) {
      _stock.dispatchStock(num);
      return true;
    }
    return false;
  }

  getInventory(product: Product): number {
    const _stock = this.inventory.find((stock) => stock.product === product);
    return _stock?.stock ?? 0;
  }
}

class Stock {
  private _stock = 0;
  constructor(public product: Product) {}

  addStock(num: number): Stock {
    this._stock += num;
    return this;
  }

  canDispatch(num: number): boolean {
    return this._stock >= num;
  }

  dispatchStock(num: number): Stock {
    this._stock -= num;
    return this;
  }

  get stock(): number {
    return this._stock;
  }
}

export class Customer {
  constructor() {}

  purchase(store: Store, product: Product, num: number): boolean {
    const isSuccess = store.purchase(product, num);
    return isSuccess;
  }
}

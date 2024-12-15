export type Product = 'Shampoo' | 'Book';

export interface IStore {
  addInventory(product: Product, num: number): void;
  purchase(product: Product, num: number): boolean;
  getInventory(product: Product): number;
}

export class Store implements IStore {
  private inventory: IStock[] = [];

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

export interface IStock {
  stock: number;
  product: Product;
  addStock(num: number): IStock;
  canDispatch(num: number): boolean;
  dispatchStock(num: number): IStock;
}

class Stock implements IStock {
  private _stock = 0;
  constructor(public product: Product) {}

  addStock(num: number): IStock {
    this._stock += num;
    return this;
  }

  canDispatch(num: number): boolean {
    return this._stock >= num;
  }

  dispatchStock(num: number): IStock {
    this._stock -= num;
    return this;
  }

  get stock(): number {
    return this._stock;
  }
}

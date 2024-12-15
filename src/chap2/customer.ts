import { IStore, Product } from './store';

export class Customer {
  constructor() {}

  purchase(store: IStore, product: Product, num: number): boolean {
    const isSuccess = store.purchase(product, num);
    return isSuccess;
  }
}

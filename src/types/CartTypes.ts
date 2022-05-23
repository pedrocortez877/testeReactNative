import {ReactNode} from 'react';

import {ProductTypes} from './ProductTypes';

export interface CartContextTypes {
  productsCart: ProductTypes[];
  totalValue: Number;
  totalQuantity: Number;
  addProductToCart: (value: ProductTypes) => void;
  removeProductToCart: (value: ProductTypes) => void;
  cleanCart: () => void;
}

export interface CartContextProviderTypes {
  children: ReactNode;
}

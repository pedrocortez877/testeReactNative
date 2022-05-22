import {ReactNode} from 'react';

import {ProductTypes} from './ProductTypes';

export interface CartContextTypes {
  productsCart: ProductTypes[];
  totalValue: Number;
  addProductToCart: (value: ProductTypes) => void;
  removeProductToCart: (value: ProductTypes) => void;
}

export interface CartContextProviderTypes {
  children: ReactNode;
}

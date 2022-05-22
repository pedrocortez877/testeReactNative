import {ReactNode} from 'react';

import {ProductTypes} from './ProductTypes';

export interface CartContextTypes {
  productsCart: ProductTypes[];
  addProductToCart: (value: ProductTypes) => void;
  removeProductToCart: (value: ProductTypes) => void;
}

export interface CartContextProviderTypes {
  children: ReactNode;
}

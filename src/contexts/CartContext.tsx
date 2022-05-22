import React, {createContext, useState} from 'react';

import {ProductTypes} from '../types/ProductTypes';
import {CartContextTypes, CartContextProviderTypes} from '../types/CartTypes';

export const CartContext = createContext({} as CartContextTypes);

export function CartContextProvider(props: CartContextProviderTypes) {
  const [productsCart, setProductsCart] = useState<ProductTypes[]>([]);

  function addProductToCart(product: ProductTypes) {
    setProductsCart(products => [...products, product]);
  }

  function removeProductToCart(product: ProductTypes) {
    setProductsCart(productsCart.filter(item => item.id !== product.id));
  }

  return (
    <CartContext.Provider
      value={{productsCart, addProductToCart, removeProductToCart}}>
      {props.children}
    </CartContext.Provider>
  );
}

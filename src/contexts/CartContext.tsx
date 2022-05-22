import React, {createContext, useState} from 'react';

import {ProductTypes} from '../types/ProductTypes';
import {CartContextTypes, CartContextProviderTypes} from '../types/CartTypes';

export const CartContext = createContext({} as CartContextTypes);

export function CartContextProvider(props: CartContextProviderTypes) {
  const [productsCart, setProductsCart] = useState<ProductTypes[]>([]);
  const [totalValue, setTotalValue] = useState(0);

  function addProductToCart(product: ProductTypes) {
    let newProduct = true;
    productsCart.map(item => {
      if (item.id === product.id) {
        product.quantity++;
        newProduct = false;
        return;
      }
    });

    setTotalValue(value => value + Number(product.price));

    if (!newProduct) {
      return;
    }

    product.quantity = 1;
    setProductsCart(products => [...products, product]);
  }

  function removeProductToCart(product: ProductTypes) {
    setProductsCart(productsCart.filter(item => item.id !== product.id));
  }

  return (
    <CartContext.Provider
      value={{productsCart, addProductToCart, removeProductToCart, totalValue}}>
      {props.children}
    </CartContext.Provider>
  );
}

import React, {createContext, useState} from 'react';

import {ProductTypes} from '../types/ProductTypes';
import {CartContextTypes, CartContextProviderTypes} from '../types/CartTypes';

export const CartContext = createContext({} as CartContextTypes);

export function CartContextProvider(props: CartContextProviderTypes) {
  const [productsCart, setProductsCart] = useState<ProductTypes[]>([]);
  const [totalValue, setTotalValue] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

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
    setTotalQuantity(value => value + 1);

    if (!newProduct) {
      return;
    }

    product.quantity = 1;
    setProductsCart(products => [...products, product]);
  }

  function removeProductToCart(product: ProductTypes) {
    if (totalQuantity === 1) {
      setTotalValue(0);
      setTotalQuantity(0);
    } else {
      setTotalValue(value => value - Number(product.price));
      setTotalQuantity(value => value - 1);
    }

    if (product.quantity > 1) {
      productsCart.map(item => {
        if (item.id === product.id) {
          item.quantity--;
        }
      });
      return;
    }

    setProductsCart(productsCart.filter(item => item.id !== product.id));
  }

  function cleanCart() {
    setProductsCart([]);
    setTotalQuantity(0);
    setTotalValue(0);
  }

  return (
    <CartContext.Provider
      value={{
        productsCart,
        addProductToCart,
        removeProductToCart,
        cleanCart,
        totalValue,
        totalQuantity,
      }}>
      {props.children}
    </CartContext.Provider>
  );
}

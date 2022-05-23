import React, {createContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {ProductTypes} from '../types/ProductTypes';
import {CartContextTypes, CartContextProviderTypes} from '../types/CartTypes';

export const CartContext = createContext({} as CartContextTypes);

export function CartContextProvider(props: CartContextProviderTypes) {
  const [productsCart, setProductsCart] = useState<ProductTypes[]>([]);
  const [totalValue, setTotalValue] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  async function addProductToCart(product: ProductTypes) {
    let newProduct = true;
    let asyncStorageCartProducts = [] as ProductTypes[]; //INSERIDO POIS OPERAÇÃO FEITA NO ASYNC STORAGE ESTAVA ACONTECENDO ANTES DA ATUALIZAÇÃO DO STATE

    productsCart.map(item => {
      if (item.id === product.id) {
        product.quantity++;
        newProduct = false;
        asyncStorageCartProducts = productsCart;
        return;
      }
    });

    setTotalValue(value => value + Number(product.price));
    setTotalQuantity(value => value + 1);

    if (newProduct) {
      product.quantity = 1;
      setProductsCart(products => [...products, product]);

      asyncStorageCartProducts = [...productsCart, product];
    }

    await AsyncStorage.setItem(
      'productsCart',
      JSON.stringify(asyncStorageCartProducts),
    );
  }

  async function removeProductToCart(product: ProductTypes) {
    let asyncStorageCartProducts = []; //INSERIDO POIS OPERAÇÃO FEITA NO ASYNC STORAGE ESTAVA ACONTECENDO ANTES DA ATUALIZAÇÃO DO STATE

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
      asyncStorageCartProducts = productsCart;
      return;
    }

    setProductsCart(productsCart.filter(item => item.id !== product.id));
    asyncStorageCartProducts = productsCart.filter(
      item => item.id !== product.id,
    );

    await AsyncStorage.setItem(
      'productsCart',
      JSON.stringify(asyncStorageCartProducts),
    );
  }

  function setMultiplesProductsToCart(products: ProductTypes[]) {
    cleanCart();
    setProductsCart(products);
    products.map(product => {
      console.log(product);
      setTotalQuantity(value => value + product.quantity);
      setTotalValue(
        value => value + Number(product.price) * Number(product.quantity),
      );
    });
  }

  function cleanCart() {
    setProductsCart([]);
    setTotalQuantity(0);
    setTotalValue(0);
  }

  async function cleanAsyncStorage() {
    await AsyncStorage.removeItem('productsCart');
  }

  return (
    <CartContext.Provider
      value={{
        productsCart,
        addProductToCart,
        removeProductToCart,
        cleanCart,
        setMultiplesProductsToCart,
        cleanAsyncStorage,
        totalValue,
        totalQuantity,
      }}>
      {props.children}
    </CartContext.Provider>
  );
}

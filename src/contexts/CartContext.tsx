import React, {createContext, useState, ReactNode} from 'react';

interface ProductTypes {
  id: Number;
  title: String;
  price: String;
  category: String;
  description: String;
  image: String;
}

interface CartContextTypes {
  productsCart: ProductTypes[];
  addProductToCart: (value: ProductTypes) => void;
  removeProductToCart: (value: ProductTypes) => void;
}

interface CartContextProviderTypes {
  children: ReactNode;
}

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

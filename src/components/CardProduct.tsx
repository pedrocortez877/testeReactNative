import React, {useContext} from 'react';

import {Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native';

import {ProductTypes} from '../types/ProductTypes';
import {CartContext} from '../contexts/CartContext';

import colors from '../styles/colors';
import IconAdd from '../assets/add.png';

type PropsCardProduct = {
  item: ProductTypes;
  news: Boolean;
};

export function CardProduct(props: PropsCardProduct) {
  const {addProductToCart} = useContext(CartContext);
  const {item, news} = props;

  function handlePressAddProductToCart(itemAddToCart: ProductTypes) {
    addProductToCart(itemAddToCart);
  }

  return (
    <View style={styles.cardProduct}>
      <Image source={{uri: `${item.image}`}} style={styles.imageProduct} />
      {news ? (
        <></>
      ) : (
        <TouchableOpacity
          style={styles.buttonAddProductToCartList}
          onPress={() => handlePressAddProductToCart(item)}>
          <Image source={IconAdd} style={styles.iconButtonAddProductToCart} />
        </TouchableOpacity>
      )}
      <View style={styles.descriptionProductArea}>
        <Text style={styles.categoryName}>{item.category}</Text>
        <Text style={styles.productName}>
          {item.title.length > 17 ? item.title.substring(0, 17) : item.title}
        </Text>
        {news ? (
          <Text style={styles.descriptionProduct}>
            {item.description.substring(0, 70).concat('...')}
          </Text>
        ) : (
          <></>
        )}
      </View>
      <View style={styles.footerCardProduct}>
        <Text style={styles.productValue}>${item.price}</Text>
        {news ? (
          <TouchableOpacity
            style={styles.buttonAddProductToCart}
            onPress={() => handlePressAddProductToCart(item)}>
            <Image source={IconAdd} style={styles.iconButtonAddProductToCart} />
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardProduct: {
    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 15,

    width: 172,
  },
  imageProduct: {
    width: 172,
    height: 183,

    borderRadius: 10,
  },
  descriptionProductArea: {
    maxWidth: 170,
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
  },
  categoryName: {
    color: colors.purple,

    fontSize: 10,
    fontFamily: 'WorkSans-Bold',
  },
  productName: {
    color: colors.black,

    fontSize: 14,
    fontFamily: 'WorkSans-Bold',
  },
  descriptionProduct: {
    color: colors.grey,

    fontSize: 10,
    fontFamily: 'WorkSans-Regular',
  },
  footerCardProduct: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    width: '100%',
  },
  productValue: {
    color: colors.purple,

    fontSize: 22,
    fontFamily: 'WorkSans-Bold',
  },
  buttonAddProductToCart: {
    height: 30,
    width: 30,
    borderRadius: 15,

    borderWidth: 1,
    borderColor: colors.purple,

    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonAddProductToCartList: {
    height: 30,
    width: 30,
    borderRadius: 15,

    marginTop: -30,
    marginRight: -130,

    backgroundColor: colors.background,

    borderWidth: 1,
    borderColor: colors.purple,

    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButtonAddProductToCart: {
    width: 10,
    height: 10,
  },
});

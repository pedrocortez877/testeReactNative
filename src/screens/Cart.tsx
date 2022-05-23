import React, {useContext, useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';

import {CartContext} from '../contexts/CartContext';

import {RootStackParamsList} from '../types/RootStackParamsList';

import {ProductTypes} from '../types/ProductTypes';

import {ModalComponent} from '../components/Modal';
import {Button} from '../components/Button';

import Arrow from '../assets/arrow.png';
import Add from '../assets/addGrey.png';
import Reduce from '../assets/reduce.png';
import Bag from '../assets/bagGrey.png';

import colors from '../styles/colors';

type CartScreenProp = StackNavigationProp<RootStackParamsList, 'Cart'>;

export function Cart() {
  const navigation = useNavigation<CartScreenProp>();
  const {productsCart, totalValue, addProductToCart, removeProductToCart} =
    useContext(CartContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [productDelete, setProductDelete] = useState<ProductTypes>();

  function handlePressCloseModal() {
    setModalVisible(!modalVisible);
  }

  function handlePressDeleteProduct(item: ProductTypes) {
    setProductDelete(item);
    setModalVisible(!modalVisible);
  }

  function handlePressConfirmDeleteProduct() {
    if (productDelete) {
      removeProductToCart(productDelete);
      setModalVisible(!modalVisible);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonReturn}
        onPress={() => navigation.navigate('Home')}>
        <Image source={Arrow} style={styles.arrow} />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.titleScreen}>CARRINHO</Text>
      </View>
      {productsCart.length ? (
        <>
          <View style={styles.body}>
            <Text style={styles.titleBody}>Meu Carrinho</Text>
            <View style={styles.listProductsArea}>
              <FlatList
                data={productsCart}
                renderItem={({item}) => (
                  <View style={styles.contentCardProduct}>
                    <View style={styles.imageAndDescriptionProduct}>
                      <Image
                        style={styles.imageProduct}
                        source={{uri: `${item.image}`}}
                      />
                      <View style={styles.descriptionProduct}>
                        <Text style={styles.productName}>
                          {item.title.length > 21
                            ? item.title.substring(0, 21)
                            : item.title}
                        </Text>
                        <View style={styles.quantityAndValueProduct}>
                          <Text style={styles.quantity}>{item.quantity}x</Text>
                          <Text style={styles.value}>${item.price}</Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.buttonsChangeProductsInCartArea}>
                      <TouchableOpacity
                        style={styles.buttonReduce}
                        onPress={() => handlePressDeleteProduct(item)}>
                        <Image source={Reduce} />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.buttonAdd}
                        onPress={() => addProductToCart(item)}>
                        <Image source={Add} />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                style={styles.listProducts}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id.toString()}
              />
            </View>
          </View>
          <View style={styles.footer}>
            <View style={styles.totalValueArea}>
              <Text style={styles.totalValueDescription}>Total: </Text>
              <Text style={styles.totalValue}>${totalValue}</Text>
            </View>
            <Button
              title="FINALIZAR COMPRA"
              destination="Confirmation"
              navigation={navigation}
            />
          </View>
        </>
      ) : (
        <View style={styles.emptyCarArea}>
          <Image source={Bag} style={styles.imageBag} />
          <Text style={styles.descriptionEmptyCart}>
            NENHUM ITEM ADICIONADO NO CARRINHO
          </Text>
          <Button
            title="ADICIONAR ITEMS"
            destination="Home"
            navigation={navigation}
          />
        </View>
      )}
      <ModalComponent
        modalVisible={modalVisible}
        closeModal={handlePressCloseModal}
        confirmDeleteProduct={handlePressConfirmDeleteProduct}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.background,

    paddingTop: 10,

    paddingHorizontal: 18,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonReturn: {
    width: 10,
    height: 10,

    position: 'absolute',
    top: 15,
    left: 15,
  },
  arrow: {
    width: 10,
    height: 14,
  },
  titleScreen: {
    fontSize: 14,
    fontFamily: 'WorkSans-Bold',
    color: colors.grey,
  },
  body: {
    flex: 1,
    alignItems: 'flex-start',

    width: '100%',

    paddingVertical: 50,
  },
  titleBody: {
    fontSize: 24,
    fontFamily: 'WorkSans-SemiBold',
    color: colors.black,
  },
  listProductsArea: {
    width: '100%',
  },
  listProducts: {},
  contentCardProduct: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    padding: 8,
    marginVertical: 10,

    borderRadius: 12,

    backgroundColor: colors.purpleLight,
  },
  imageAndDescriptionProduct: {
    flexDirection: 'row',
  },
  imageProduct: {
    width: 38,
    height: 50,
  },
  descriptionProduct: {
    padding: 8,
  },
  productName: {
    color: colors.black,

    fontSize: 14,
    fontFamily: 'WorkSans-Bold',
  },
  quantityAndValueProduct: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    color: colors.purple,

    fontSize: 10,
    fontFamily: 'WorkSans-Bold',

    padding: 2,

    textAlignVertical: 'bottom',
  },
  value: {
    color: colors.purple,

    fontSize: 14,
    fontFamily: 'WorkSans-Bold',
  },
  buttonsChangeProductsInCartArea: {
    width: 75,
    height: 25,
    flexDirection: 'row',

    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',

    borderWidth: 1,
    borderColor: colors.greyExtraLight,

    backgroundColor: colors.white,
    borderRadius: 30,
  },
  buttonAdd: {
    flex: 1,
    height: '100%',

    borderLeftWidth: 1,
    borderLeftColor: colors.greyExtraLight,

    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonReduce: {
    flex: 1,
    height: '100%',

    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    width: '100%',
    height: 110,

    position: 'absolute',
    bottom: 0,
  },
  totalValueArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.greyPlatinum,
  },
  totalValueDescription: {
    color: colors.greyDark,

    fontSize: 14,
    fontFamily: 'WorkSans-Bold',
  },
  totalValue: {
    color: colors.black,

    fontSize: 14,
    fontFamily: 'WorkSans-Bold',
  },
  emptyCarArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    maxWidth: 240,
  },
  imageBag: {
    width: 57,
    height: 67,
  },
  descriptionEmptyCart: {
    color: colors.grey,

    fontSize: 16,
    fontFamily: 'WorkSans-Bold',

    paddingTop: 15,

    textAlign: 'center',
  },
});

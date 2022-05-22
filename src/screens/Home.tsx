import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';

import colors from '../styles/colors';

import api from '../services/api';

import {RootStackParamsList} from '../types/RootStackParamsList';
import {ProductTypes} from '../types/ProductTypes';

import {CartContext} from '../contexts/CartContext';

import {CardProduct} from '../components/CardProduct';

import IconBag from '../assets/bag.png';

type HomeScreenProp = StackNavigationProp<RootStackParamsList, 'Home'>;

export function Home() {
  const navigation = useNavigation<HomeScreenProp>();
  const [products, setProducts] = useState<ProductTypes[]>([]);
  const [categories, setCategories] = useState<Array<String>>([]);
  const [newProducts, setNewProducts] = useState<ProductTypes[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<String>('');

  const {productsCart, totalQuantity} = useContext(CartContext);

  useEffect(() => {
    function getCategories() {
      api
        .get('/products/categories')
        .then(response => {
          setCategories(response.data);
        })
        .catch(error => {
          console.log(error.response);
        });
    }

    function getProducts() {
      api
        .get('/products')
        .then(response => {
          setProducts(response.data);
        })
        .catch(error => {
          console.log(error.response);
        });
    }

    getCategories();
    getProducts();
  }, []);

  useEffect(() => {
    setNewProducts(products.slice(0, 5));
  }, [products]);

  function handlePressSelectCategory(item: String) {
    setSelectedCategory(item);
    api
      .get(`/products/category/${item}`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.log(error.response);
      });
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleAndIconBagArea}>
          <Text style={styles.title}>Produtos</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Image source={IconBag} style={styles.iconBag} />
          </TouchableOpacity>
          {totalQuantity ? (
            <View style={styles.countProductsToCartArea}>
              <Text style={styles.countProductsToCartText}>
                {totalQuantity}
              </Text>
            </View>
          ) : (
            <></>
          )}
        </View>
        <View style={styles.categoriesArea}>
          <Text style={styles.titleCategoriesArea}>FILTRAR CATEGORIA</Text>
          <View>
            <FlatList
              data={categories}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={
                    selectedCategory === item
                      ? [
                          styles.buttonSelectCategory,
                          styles.buttonSelectedCategory,
                        ]
                      : styles.buttonSelectCategory
                  }
                  onPress={() => handlePressSelectCategory(item)}>
                  <Text
                    style={
                      selectedCategory === item
                        ? [
                            styles.textCategoryButton,
                            styles.textCategorySelectedButton,
                          ]
                        : styles.textCategoryButton
                    }>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.newsArea}>
          <Text style={styles.newsTitle}>Novidades</Text>
          <FlatList
            data={newProducts}
            renderItem={({item}) => <CardProduct item={item} news={true} />}
            style={styles.listNews}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
          />
        </View>
        <View>
          <Text style={styles.titleListProductsArea}>Listagem</Text>
          <View style={styles.listProducts}>
            <FlatList
              data={products}
              renderItem={({item}) => <CardProduct item={item} news={false} />}
              style={styles.listNews}
              contentContainerStyle={styles.contentListView}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
              key={'#'}
            />
          </View>
        </View>
      </View>
      {productsCart.length ? (
        <View style={styles.buttonGoToCartArea}>
          <TouchableOpacity
            style={styles.buttonGoToCart}
            onPress={() => navigation.navigate('Cart')}>
            <Text style={styles.textButtonGoToCart}>IR PARA CARRINHO</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
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
  },
  titleAndIconBagArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.black,
    fontFamily: 'WorkSans-Bold',
  },
  iconBag: {
    width: 27,
    height: 30,
  },
  countProductsToCartArea: {
    width: 16,
    height: 16,

    backgroundColor: colors.background,

    borderRadius: 22,

    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',

    right: 0,
    top: 2,

    zIndex: 99,
  },
  countProductsToCartText: {
    fontSize: 10,
    color: colors.purple,
    fontFamily: 'WorkSans-Bold',
  },
  categoriesArea: {
    paddingTop: 8,
  },
  titleCategoriesArea: {
    fontSize: 12,
    color: colors.grey,
    fontFamily: 'WorkSans-Bold',
  },
  buttonSelectCategory: {
    width: 90,
    height: 30,

    justifyContent: 'center',
    alignItems: 'center',

    marginHorizontal: 5,

    borderWidth: 1,
    borderColor: colors.greyPlatinum,
    borderRadius: 8,

    color: colors.greyLight,
  },
  buttonSelectedCategory: {
    borderWidth: 0,

    backgroundColor: colors.purple,
    color: colors.white,
  },
  textCategoryButton: {
    color: colors.greyLight,

    fontSize: 11,
    fontWeight: 'bold',
    fontFamily: 'WorkSans-Bold',
  },
  textCategorySelectedButton: {
    color: colors.white,
  },
  body: {
    flex: 1,
    width: '100%',
  },
  newsArea: {
    paddingVertical: 10,

    borderBottomWidth: 1,
    borderColor: colors.greyPlatinum,
  },
  newsTitle: {
    color: colors.black,

    fontSize: 24,
    fontFamily: 'WorkSans-SemiBold',
  },
  listNews: {
    height: 300,
  },
  titleListProductsArea: {
    color: colors.black,

    fontSize: 24,
    fontFamily: 'WorkSans-SemiBold',

    padding: 10,
  },
  listProducts: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  contentListView: {
    paddingBottom: 60,
  },
  buttonGoToCartArea: {
    width: '100%',
    height: 110,

    position: 'absolute',
    bottom: 0,

    zIndex: 99,

    backgroundColor: colors.background,

    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,

    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonGoToCart: {
    width: 320,
    height: 50,

    backgroundColor: colors.purple,

    borderRadius: 37,

    justifyContent: 'center',
    alignItems: 'center',
  },
  textButtonGoToCart: {
    color: colors.white,

    fontSize: 16,
    fontFamily: 'WorkSans-Bold',
  },
});

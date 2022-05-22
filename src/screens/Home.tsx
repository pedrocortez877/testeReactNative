import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import colors from '../styles/colors';

import api from '../services/api';

import IconBag from '../assets/bag.png';
import IconAdd from '../assets/add.png';

interface ProductTypes {
  id: Number;
  title: String;
  price: String;
  category: String;
  description: String;
  image: String;
}

export function Home() {
  const [products, setProducts] = useState<ProductTypes[]>([]);
  const [categories, setCategories] = useState<Array<String>>([]);
  const [newProducts, setNewProducts] = useState<ProductTypes[]>([]);

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
    setNewProducts(products.filter(product => product.id <= 5));
  }, [products]);

  function handlePressAddProductToCart(item) {
    console.log(item);
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleAndIconBagArea}>
          <Text style={styles.title}>Produtos</Text>
          <Image source={IconBag} style={styles.iconBag} />
        </View>
        <View style={styles.categoriesArea}>
          <Text style={styles.titleCategoriesArea}>FILTRAR CATEGORIA</Text>
          <View>
            <FlatList
              data={categories}
              renderItem={({item}) => (
                <TouchableOpacity style={styles.buttonSelectCategory}>
                  <Text style={styles.textCategoryButton}>{item}</Text>
                </TouchableOpacity>
              )}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
        <View style={styles.newsArea}>
          <Text style={styles.newsTitle}>Novidades</Text>
          <FlatList
            data={newProducts}
            renderItem={({item}) => (
              <View style={styles.cardProduct}>
                <Image
                  source={{uri: `${item.image}`}}
                  style={styles.imageProduct}
                />
                <View style={styles.descriptionProductArea}>
                  <Text style={styles.categoryName}>{item.category}</Text>
                  <Text style={styles.productName}>
                    {item.title.length > 30
                      ? item.title.substring(0, 21)
                      : item.title}
                  </Text>
                  <Text style={styles.descriptionProduct}>
                    {item.description.substring(0, 70).concat('...')}
                  </Text>
                </View>
                <View style={styles.footerCardProduct}>
                  <Text style={styles.productValue}>${item.price}</Text>
                  <TouchableOpacity style={styles.buttonAddProductToCart}>
                    <Image
                      source={IconAdd}
                      style={styles.iconButtonAddProductToCart}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            style={styles.listNews}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
          />
        </View>
        <View style={styles.listProductsArea}>
          <Text style={styles.titleListProductsArea}>Listagem</Text>
          <View style={styles.listProducts}>
            <FlatList
              data={products}
              renderItem={({item}) => (
                <View style={styles.cardProduct}>
                  <Image
                    source={{uri: `${item.image}`}}
                    style={styles.imageProduct}
                  />
                  <TouchableOpacity
                    style={styles.buttonAddProductToCartList}
                    onPress={() => handlePressAddProductToCart(item)}>
                    <Image
                      source={IconAdd}
                      style={styles.iconButtonAddProductToCart}
                    />
                  </TouchableOpacity>
                  <View style={styles.descriptionProductArea}>
                    <Text style={styles.categoryName}>{item.category}</Text>
                    <Text style={styles.productName}>
                      {item.title.length > 30
                        ? item.title.substring(0, 21)
                        : item.title}
                    </Text>
                  </View>
                  <View style={styles.footerCardProduct}>
                    <Text style={styles.productValue}>${item.price}</Text>
                  </View>
                </View>
              )}
              style={styles.listNews}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
              key={'#'}
            />
          </View>
        </View>
      </View>
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
    width: 20,
    height: 23,
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
  textCategoryButton: {
    color: colors.greyLight,

    fontSize: 11,
    fontWeight: 'bold',
    fontFamily: 'WorkSans-Bold',
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

    width: '92%',
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
  iconButtonAddProductToCart: {
    width: 10,
    height: 10,
  },
  listProductsArea: {
    flex: 1,
  },
  titleListProductsArea: {
    color: colors.black,

    fontSize: 24,
    fontFamily: 'WorkSans-SemiBold',
  },
  listProducts: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
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
});

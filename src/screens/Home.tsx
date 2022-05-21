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

  useEffect(() => {
    async function getCategories() {
      const response = await api.get('/products/categories');

      if (response.status === 200) {
        setCategories(response.data);
      }
    }

    async function getProducts() {
      const response = await api.get('/products');

      if (response.status === 200) {
        setProducts(response.data);
      }
    }

    getCategories();
    getProducts();
  }, []);
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,

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
    color: 'black',
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
});

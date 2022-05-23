import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

import {RootStackParamsList} from '../types/RootStackParamsList';

import {StyleSheet, View, Text, StatusBar, Image} from 'react-native';

import colors from '../styles/colors';

import Success from '../assets/success.png';
import {Button} from '../components/Button';

type ConfirmationScreenProp = StackNavigationProp<
  RootStackParamsList,
  'Confirmation'
>;

export function Confirmation() {
  const navigation = useNavigation<ConfirmationScreenProp>();
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.purple} />
      <View style={styles.successImageArea}>
        <Image source={Success} />
      </View>
      <View style={styles.descriptionArea}>
        <Text style={styles.titleDescriptionArea}>SUCESSO!</Text>
        <Text style={styles.contentDescriptionArea}>
          Compra realizada com sucesso, aproveite!
        </Text>
      </View>
      <View style={styles.footer}>
        <Button
          title="PROSSEGUIR"
          destination="Home"
          navigation={navigation}
          light={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8775FE',
  },
  successImageArea: {
    width: 160,
    height: 160,

    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 5,
    borderRadius: 138,
    borderColor: colors.white,
  },
  descriptionArea: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',

    marginVertical: 20,
  },
  titleDescriptionArea: {
    color: colors.white,

    fontSize: 22,
    fontFamily: 'WorkSans-Bold',
  },
  contentDescriptionArea: {
    color: colors.white,

    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'WorkSans-Regular',
  },
  footer: {
    position: 'absolute',
    bottom: 10,
  },
});

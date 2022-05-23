import React from 'react';
import {TouchableOpacity, View, StyleSheet, Text} from 'react-native';

import {ButtonProps} from '../types/ButtonProps';

import colors from '../styles/colors';

export function Button({
  title,
  destination,
  navigation,
  light,
  onPress,
}: ButtonProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={light ? styles.buttonLight : styles.button}
        onPress={onPress ? onPress : () => navigation.navigate(destination)}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',

    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 320,
    height: 50,

    marginTop: 20,

    backgroundColor: colors.purpleDark,

    borderRadius: 37,

    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLight: {
    width: 320,
    height: 50,

    marginTop: 20,

    backgroundColor: colors.purple,

    borderRadius: 37,

    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,

    fontSize: 16,
    fontFamily: 'WorkSans-Bold',
  },
});

import React from 'react';

import {StyleSheet, View, Text} from 'react-native';

export function Cart() {
  return (
    <View style={styles.container}>
      <Text>Cart</Text>
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
});

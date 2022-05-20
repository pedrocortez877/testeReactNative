import React from 'react';

import {StyleSheet, View, Text} from 'react-native';

export function Confirmation() {
  return (
    <View style={styles.container}>
      <Text>Confirmation</Text>
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

import React from 'react';

import {Modal, View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import colors from '../styles/colors';

import {ModalProps} from '../types/ModalProps';

export function ModalComponent({
  modalVisible,
  closeModal,
  confirmDeleteProduct,
}: ModalProps) {
  return (
    <Modal
      visible={modalVisible}
      onRequestClose={closeModal}
      transparent={true}
      statusBarTranslucent>
      <View style={styles.container}>
        <View style={styles.descriptionArea}>
          <Text style={styles.titleModal}>Remover item</Text>
          <Text style={styles.descriptionText}>
            Se deseja remover o item do carrinho clique em prosseguir.
          </Text>
        </View>
        <View style={styles.buttonsArea}>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={confirmDeleteProduct}>
            <Text style={styles.confirmButtonText}>PROSSEGUIR</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
            <Text style={styles.cancelButtonText}>CANCELAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '50%',

    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 10,

    width: 290,
    height: 166,
    backgroundColor: colors.white,
  },
  descriptionArea: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleModal: {
    fontSize: 14,
    fontFamily: 'WorkSans-Bold',
    color: colors.dimGrey,
  },
  descriptionText: {
    fontSize: 14,
    fontFamily: 'WorkSans-SemiBold',
    color: colors.greyLight,

    textAlign: 'center',
  },
  buttonsArea: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    paddingTop: 5,
  },
  confirmButton: {
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderColor: colors.greyPlatinum,
  },
  confirmButtonText: {
    fontSize: 12,
    fontFamily: 'WorkSans-Bold',
    color: colors.blueGray,
  },
  cancelButton: {
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderColor: colors.greyPlatinum,
  },
  cancelButtonText: {
    fontSize: 12,
    fontFamily: 'WorkSans-Bold',
    color: colors.salmon,
  },
});

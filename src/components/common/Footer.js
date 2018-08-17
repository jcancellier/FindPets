import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../../global';

const Footer = (props) => {
  return (
    <View style={[styles.container, props.style]}>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: Colors.flat.clouds,
    borderTopWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.2)',
  }
});

export { Footer };
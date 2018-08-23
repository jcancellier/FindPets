import React, { Component } from 'react';
import { TouchableOpacity, View, StyleSheet, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

let { height, width } = Dimensions.get('window');

let finalPositionY = height - 150;

export default class Fab extends Component {

  state = {
    hideAnim: new Animated.Value(height),
    visible: false
  }

  hide = () => {
    this.setState({ visible: false }, () => {
      this.props.onVisibilityChanged(this.state.visible);
      Animated.timing(
        this.state.hideAnim,
        {
          toValue: height,
          duration: 500
        }
      ).start();
    })
  }

  show = () => {
    this.setState({ visible: true }, () => {
      this.props.onVisibilityChanged(this.state.visible);
      Animated.timing(
        this.state.hideAnim,
        {
          toValue: finalPositionY,
          duration: 500
        }
      ).start();
    })
  }

  render() {
    let { hideAnim } = this.state;
    return (
      <Animated.View
        style={[
          styles.container,
          { transform: [{ translateY: hideAnim }] }
        ]}
      // ref={this.props.ref}
      >
        <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
          <Ionicons name="ios-arrow-up" size={24} color="white" />
        </TouchableOpacity>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    right: 30
  },
  button: {
    backgroundColor: 'rgba(244, 67, 54, 0.8)',
    width: 50,
    height: 50,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
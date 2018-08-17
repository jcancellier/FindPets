import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';

export default class ToggleIcon extends Component {

  _handlePress = () => {
    this.props.onPress();
    this.viewRef.pulse(250);
  }

  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this._handlePress} activeOpacity={1.0}>
        <Animatable.View ref={(ref) => this.viewRef = ref}>
          <Ionicons name={this.props.toggled ? this.props.activeIconName : this.props.inactiveIconName} size={20} color={this.props.toggled ? this.props.activeOpacity : this.props.inactiveOpacity} style={styles.icon} />
        </Animatable.View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    padding: 8,
    paddingHorizontal: 10
  }
});
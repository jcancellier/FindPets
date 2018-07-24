import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from './Button';

class ButtonSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      selected: this.props.value
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return{ selected: nextProps.value}
  }

  _renderButtons() {
    const items = [this.props.placeholder, ...this.props.items];
    return items.map((item, index) => {
      return (
        <Button 
          textStyle={this.props.textStyle}
          key={item.label}
          selected={this.state.selected == item.value ? true : false}
          renderRightBorder={index != items.length-1} // don't render right border on last button item
          //TODO: add vibration effect when user clicks an item
          onPress={() => this.setState({selected: item.value}, this.props.onValueChange(item.value))}
          // onPress={() => this.setState({selected: item.value})}
        >
            {item.label}
        </Button>
      );
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonListContainer}>
          {this._renderButtons()}
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignSelf: 'stretch',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden'
  },
  buttonListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
});

export { ButtonSelect }
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from './index'
import { Colors } from '../../global';

const Button = (props) => {
  return(
      <TouchableOpacity 
          onPress={props.onPress} 
          style={ 
              [props.selected ? styles.buttonSelected : styles.buttonNotSelected, styles.button, props.style, props.renderRightBorder ? {borderRightWidth: StyleSheet.hairlineWidth} : null ]
          } 
          disabled={props.selected}>
          <Text style={[styles.text, props.textStyle, props.selected ? styles.textSelected : null]} numberOfLines={1} adjustsFontSizeToFit>
              {props.children}
          </Text>
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
      flex: 1, 
      //fill parent
      // alignSelf: 'stretch',
      // backgroundColor: '#fff',
      // borderRadius: 5,
      // borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.2)',
      // marginLeft: 5,
      // marginRight: 5
      // borderRightWidth: StyleSheet.hairlineWidth,
      justifyContent: 'center'
  },
  buttonSelected: {
      backgroundColor: Colors.primary,
  },
  buttonNotSelected: {
      backgroundColor: 'white'
  },
  text: {
      alignSelf: 'center',
      // color: '#007aff',
      fontSize: 16,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 3,
      paddingRight: 3
  },
  textSelected: {
      color: Colors.flat.clouds
  },
  textNotSelected: {
  }
});

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
        >
            {item.label}
        </Button>
      );
    })
  }

  render() {
    return (
      <View style={buttonSelectStyles.container}>
        <View style={buttonSelectStyles.buttonListContainer}>
          {this._renderButtons()}
        </View>
      </View>
    );
  }
};

const buttonSelectStyles = StyleSheet.create({
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
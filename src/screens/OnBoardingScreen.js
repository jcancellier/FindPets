import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Ionicons } from '@expo/vector-icons';
import { Fonts, Colors } from '../global'

const styles = StyleSheet.create({
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 180,
    height: 180,
  },
  title: {
    fontFamily: Fonts.primary
  },
  text: {
    fontFamily: Fonts.primary
  }
})

const slides = [
  {
    key: 'PetLocator',
    title: 'Pet Locator',
    text: 'Find Pets up for adoption near you',
    image: require('../../assets/icons/cat-in-hand.png'),
    imageStyle: styles.image,
    titleStyle: styles.title,
    textStyle: styles.text,
    backgroundColor: Colors.primary // '#59b2ab'
  },
  {
    key: 'Favorites',
    title: 'Favorites',
    text: 'Save your favorite potential pets 😉',
    image: require('../../assets/icons/paw-heart.png'),
    imageStyle: styles.image,
    titleStyle: styles.title,
    textStyle: styles.text,
    backgroundColor: '#febe29',
  },
  {
    key: 'Adopt',
    title: 'Adopt',
    text: 'Call or Email to pick up your new pet!',
    image: require('../../assets/icons/dog.png'),
    imageStyle: styles.image,
    titleStyle: styles.title,
    textStyle: styles.text,
    backgroundColor: Colors.primary,
  },
];

export default class App extends React.Component {
  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-arrow-round-forward"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  };
  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-checkmark"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  };

  _onDone = () => {
    this.props.navigation.navigate('Main');
  }

  render() {
    return (
      <AppIntroSlider
        slides={slides}
        renderDoneButton={this._renderDoneButton}
        renderNextButton={this._renderNextButton}
        onDone={this._onDone}
      />
    );
  }
}


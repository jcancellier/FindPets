import React from 'react';
import { StyleSheet, View, Linking } from 'react-native';
import { connect } from 'react-redux';
import { setInitialLaunch } from '../actions';
import AppIntroSlider from 'react-native-app-intro-slider';
import DefaultSlide from '../components/OnBoarding/DefaultSlide';
import { LinkedText } from '../components/common';
import { Ionicons } from '@expo/vector-icons';
import { Fonts, Colors } from '../global';

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
  },
  privacyPolicyText: {
    color: Colors.material.red300,
    fontSize: 10,
    textDecorationLine: 'underline'
  },
  privacyPolicyTextButton: {
    position: 'absolute',
    alignSelf: 'flex-start',
    paddingLeft: 10,
    bottom: 5,
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
    backgroundColor: Colors.primary
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

class OnBoardingScreen extends React.Component {
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

  _renderItem = (props) => {
    return <DefaultSlide {...props} />
  }

  _onDone = () => {
    this.props.navigation.navigate('SetLocationInitialLaunch');
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <AppIntroSlider
          slides={slides}
          renderItem={this._renderItem}
          renderDoneButton={this._renderDoneButton}
          renderNextButton={this._renderNextButton}
          onDone={this._onDone}
        />
        <View style={styles.privacyPolicyTextButton}>
          <LinkedText
            style={styles.privacyPolicyText}
            onPress={() => Linking.openURL('https://pet-locator-privacy-policy.firebaseapp.com')}
          >
            Privacy Policy
          </LinkedText>
        </View>
      </View>
    );
  }
}

export default connect(null, {
  setInitialLaunch
})(OnBoardingScreen);


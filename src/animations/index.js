import * as Animatable from 'react-native-animatable';

const zoomInBoi = {
  from: {
    opacity: 1,
    scale: 0.95,
  },
  to: {
    opacity: 1,
    scale: 1,
  },
};

const zoomOutBoi = {
  from: {
    opacity: 1,
    scale: 1,
  },
  to: {
    opacity: 1,
    scale: 0.95,
  },
};

const fadeIn = {
  from: {
    opacity: 0
  },
  to: {
    opacity: 1
  }
}

export const initializeAnimations = () => {
  Animatable.initializeRegistryWithDefinitions({
    zoomInBoi,
    zoomOutBoi,
    fadeIn
  });
}
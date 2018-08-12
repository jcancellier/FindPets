import * as Animatable from 'react-native-animatable';

const zoomIn = {
  from: {
    opacity: 1,
    scale: 0.98,
  },
  to: {
    opacity: 1,
    scale: 1,
  },
};

const zoomOut = {
  from: {
    opacity: 1,
    scale: 1,
  },
  to: {
    opacity: 1,
    scale: 0.98,
  },
};

const fadeIn = {
  from: {
    opacity: 0
  },
  to: {
    opacity: 1.0
  }
}

export const initializeAnimations = () => {
  Animatable.initializeRegistryWithDefinitions({
    zoomIn,
    zoomOut,
    fadeIn
  });
}
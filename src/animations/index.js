import * as Animatable from 'react-native-animatable';

const zoomInBoi = {
  from: {
    opacity: 1,
    scale: 0.95,
  },
  // 0.5: {
  //   opacity: 1,
  // },
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
  // 0.5: {
  //   opacity: 1,
  // },
  to: {
    opacity: 1,
    scale: 0.95,
  },
};

export const initializeAnimations = () => {
  Animatable.initializeRegistryWithDefinitions({
    zoomInBoi,
    zoomOutBoi
  });
}
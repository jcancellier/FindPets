import {
  SET_INITIAL_LAUNCH
} from '../actions/types';

const INITIAL_STATE = {
  initialLaunch: true
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_INITIAL_LAUNCH:
      return { ...state, initialLaunch: action.payload }
    default:
      return state;
  }
};

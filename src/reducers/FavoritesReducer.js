import {
  ADD_PET_TO_FAVORITES,
  REMOVE_PET_FROM_FAVORITES
} from '../actions/types';

const INITIAL_STATE = {
  pets: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_PET_TO_FAVORITES:
      return { ...state, pets: [...state.pets, action.payload] }
    case REMOVE_PET_FROM_FAVORITES:
      return { ...state, pets: state.pets.filter(pet => pet.id.$t != action.payload) }
    default:
      return state;
  }
};

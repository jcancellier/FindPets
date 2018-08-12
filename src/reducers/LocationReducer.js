import {
  FETCH_LOCATION_START,
  FETCH_LOCATION_SUCCESS,
  FETCH_LOCATION_FAIL,
  CLEAR_LOCATION_INFO
} from '../actions/types';

const INITIAL_STATE = {
  isLoading: false,
  city: '',
  country: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
      case FETCH_LOCATION_START:
        return {...state, isLoading: true}
      case FETCH_LOCATION_SUCCESS: 
        return {
          ...state, 
          isLoading: false, 
          city: action.city, 
          country: action.country
        }
      case FETCH_LOCATION_FAIL:
        return {...state, isLoading: false}
      case CLEAR_LOCATION_INFO: 
        return {...state, city: '', country: ''}
      default:
          return state;
  }
};
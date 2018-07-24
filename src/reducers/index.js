import { combineReducers } from 'redux';
import PetReducer from './PetReducer';
import FilterReducer from './FilterReducer';

export default combineReducers({
    pets: PetReducer,
    filters: FilterReducer
});
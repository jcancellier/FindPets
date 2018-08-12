import { combineReducers } from 'redux';
import PetReducer from './PetReducer';
import FilterReducer from './FilterReducer';
import LocationReducer from './LocationReducer';
import FavoritesReducer from './FavoritesReducer';

export default combineReducers({
    pets: PetReducer,
    filters: FilterReducer,
    location: LocationReducer,
    favorites: FavoritesReducer
});
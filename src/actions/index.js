import {
    FETCH_PETS_START,
    FETCH_PETS_SUCCESS,
    FETCH_PETS_FAIL,
    SET_ANIMAL_FILTER,
    SET_SIZE_FILTER,
    SET_BREED_FILTER,
    SET_AGE_FILTER
} from './types';

import { urlArgumentBuilder } from '../utils';

import { store } from '../store';
import { apiKey, apiUrl } from '../api';

// PetReducer.js Actions
export const fetchPets = () => {
    let url = apiUrl + buildUrl();
    return (dispatch) => {
        dispatch({ type: FETCH_PETS_START });
        console.log('fetching with url: ' + url);
        fetch(url)
            .then((response) => response.json())
            .then((responseData) => {
                //1. TODO (FIXED): this line will result in error when fetching only 1 pet from api (eventually handle this case)
                //2. TODO (FIXED): if component is unmounted before reaching this line you will get warning "can't call setstate (or forceupdate) on an unmounted component"
                //this may be fixed by using redux since state is outside of this component
                // this.setState({ pets: responseData.petfinder.pets.pet });
                // this.setState({ finishedLoading: true });
                //console.log(this.state.pets[0].id.$t)
                let pets;
                if(responseData.petfinder.pets.pet)
                    pets = responseData.petfinder.pets.pet
                else
                    pets = {}
                dispatch({
                    type: FETCH_PETS_SUCCESS,
                    payload: pets
                })
            })
            .catch((err) => {
                dispatch({
                    type: FETCH_PETS_FAIL,
                    payload: err
                })
            })
    }
}

// Helper function for fetchPets
// prepares the filter keys to be passed into 
// urlArgumentBuilder from '../utils'
// it transforms { "animal": dog, "breed": beagle}
// to [["animal", "dog"], ["breed", "beagle"]];

const buildUrl = () => {
    let filters = store.getState().filters;

    //remove any filters that have a null value
    // i.e. {..., animal: null}
    for (var key in filters) {
        if (!filters[key]) {
            delete filters[key];
        }
    }

    var result = Object.keys(filters).map(key => {
        return [key, filters[key]];
    });
    
    result.push(['key', apiKey]);
    // console.log('this is about to be sent to urlArgumentBuilder');
    // console.log(result);
    return urlArgumentBuilder(result);
}

export const setAnimalFilter = (animal) => {
    return {
        type: SET_ANIMAL_FILTER,
        payload: animal
    }
}

export const setSizeFilter = (size) => {
    return {
        type: SET_SIZE_FILTER,
        payload: size
    }
}

export const setBreedFilter = (breed) => {
    return {
        type: SET_BREED_FILTER,
        payload: breed
    }
}

export const setAgeFilter = (age) => {
    return {
        type: SET_AGE_FILTER,
        payload: age
    }
}
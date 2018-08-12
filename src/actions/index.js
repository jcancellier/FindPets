import {
    FETCH_PETS_START,
    FETCH_PETS_SUCCESS,
    FETCH_PETS_FAIL,
    SET_ANIMAL_FILTER,
    SET_SIZE_FILTER,
    SET_BREED_FILTER,
    SET_AGE_FILTER,
    SET_ZIPCODE_FILTER,
    FETCH_LOCATION_START,
    FETCH_LOCATION_FAIL,
    FETCH_LOCATION_SUCCESS,
    CLEAR_LOCATION_INFO,
    ADD_PET_TO_FAVORITES,
    REMOVE_PET_FROM_FAVORITES
} from './types';
import { Location, Permissions } from 'expo';
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
                if (responseData.petfinder.pets.pet)
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


//FilterReducer.js Actions
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

export const setZipcodeFilter = (zipcode) => {
    return {
        type: SET_ZIPCODE_FILTER,
        payload: zipcode
    }
}

export const fetchLocation = () => {
    return async (dispatch) => {
        //TODO: handle location retrieval on app start
        dispatch({ type: FETCH_LOCATION_START })
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            alert('Permission to access location was denied.\nEnable location services in settings');
            dispatch({ type: FETCH_LOCATION_FAIL });
            return;
        }

        let toSend;
        try {
            let location = await Location.getCurrentPositionAsync({});
            toSend = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            }
        } catch (err) {
            alert(err);
            dispatch({ type: FETCH_LOCATION_FAIL });
            return;
        }

        // let location = await Location.getCurrentPositionAsync({});
        // const toSend = {
        //     latitude: location.coords.latitude,
        //     longitude: location.coords.longitude
        // }

        Location.reverseGeocodeAsync(toSend)
            .then((res) => {
                console.log(res)
                dispatch({
                    type: FETCH_LOCATION_SUCCESS,
                    city: res[0].city,
                    country: res[0].region
                })
                dispatch({
                    type: SET_ZIPCODE_FILTER,
                    payload: res[0].postalCode
                })
            })
            .catch((err) => {
                console.log(err)
                dispatch({ type: FETCH_LOCATION_FAIL })
            })
    }
}

//LocationReducer.js actions
export const clearLocationInfo = () => {
    return {
        type: CLEAR_LOCATION_INFO
    }
}

//FavoritesReducer.js actions
// export const addPetToFavorites = (id) => {
//     return {
//         type: ADD_PET_TO_FAVORITES,
//         payload: id
//     }
// }

// export const removePetFromFavorites = (id) => {
//     return {
//         type: REMOVE_PET_FROM_FAVORITES,
//         payload: id
//     }
// }

export const addPetToFavorites = (id) => {
    return (dispatch) => {
        // let petToAdd = store.getState.pets.posts.find(pet => pet.id.$t === id);
        // console.log(petToAdd);
        let petToAdd = store.getState().pets.posts.find(pet => pet.id.$t === id);
        dispatch({
            type: ADD_PET_TO_FAVORITES,
            payload: petToAdd
        })
    }
}

export const removePetFromFavorites = (id) => {
    return{
        type: REMOVE_PET_FROM_FAVORITES,
        payload: id
    }
}
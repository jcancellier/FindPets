import {
    FETCH_PETS_START,
    FETCH_PETS_SUCCESS,
    FETCH_PETS_FAIL,
    FETCH_MORE_PETS_SUCCESS,
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
    REMOVE_PET_FROM_FAVORITES,
    SET_OFFSET_FILTER,
    FETCH_MORE_PETS_START,
    CLEAR_PET_RECORDS
} from './types';
import { Location, Permissions } from 'expo';
import { urlArgumentBuilder } from '../utils';
import { store } from '../store';
import { apiKey, apiUrl } from '../api';

// PetReducer.js Actions
export const fetchPets = (initialFetch = false, clearPetList = false) => {
    return (dispatch) => {
        if (initialFetch){
            dispatch({
                type: SET_OFFSET_FILTER,
                payload: null
            })
        }
        if(clearPetList){
            dispatch({type: CLEAR_PET_RECORDS});
        }

        let url = apiUrl + buildUrl();
        if (store.getState().filters.offset == null || initialFetch) {
            fetchInitialPets(url, dispatch);
        } else if (!store.getState().pets.isMorePetsLoading) {
            fetchMorePets(url, dispatch);
        }
    }
}

//Helper function for fetchPets
//This function handles the first fetch for a given search
//'fetchMorePets' handles subsequent fetches
const fetchInitialPets = (url, dispatch) => {
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
            console.log('fetch pets success');
            let pets;
            if (responseData.petfinder.pets.pet)
                pets = responseData.petfinder.pets.pet
            else
                pets = {}

            dispatch({
                type: SET_OFFSET_FILTER,
                payload: responseData.petfinder.lastOffset.$t
            })
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

//Helper function for fetchPets
//This function handles the subsequent fetches for a given search
//'fetchInitialPets' handles the first fetch
const fetchMorePets = (url, dispatch) => {
    console.log('fetching with url: ' + url);
    dispatch({ type: FETCH_MORE_PETS_START })
    fetch(url)
        .then((response) => response.json())
        .then((responseData) => {
            console.log('fetch more pets success');
            let pets;
            if (responseData.petfinder.pets.pet)
                pets = removeDuplicatePets(responseData.petfinder.pets.pet)
            else
                pets = {}

            for (let i = 0; i < pets.length; i++) {
                console.log(pets[i].id.$t)
            }
            dispatch({
                type: SET_OFFSET_FILTER,
                payload: responseData.petfinder.lastOffset.$t
            })
            dispatch({
                type: FETCH_MORE_PETS_SUCCESS,
                payload: pets
            })
        })
        .catch((err) => {

        })
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
    return urlArgumentBuilder(result);
}


//Helper function for fetchMorePets
//Purpose: remove pets that have already been fetched from previous api calls
//This is a PetFinder API backend issue where it sends previously sent pet records
//TODO: find alternate method or switch apis
const removeDuplicatePets = (fetchedPets) => {
    currentPets = store.getState().pets.posts;
    return fetchedPets.filter(firstArrayItem =>
        !currentPets.some(
            secondArrayItem => firstArrayItem.id.$t === secondArrayItem.id.$t
        )
    )
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
export const addPetToFavorites = (id) => {
    return (dispatch) => {
        let petToAdd = store.getState().pets.posts.find(pet => pet.id.$t === id);
        dispatch({
            type: ADD_PET_TO_FAVORITES,
            payload: petToAdd
        })
    }
}

export const removePetFromFavorites = (id) => {
    return {
        type: REMOVE_PET_FROM_FAVORITES,
        payload: id
    }
}
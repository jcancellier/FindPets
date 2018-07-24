import {
    FETCH_PETS_START,
    FETCH_PETS_SUCCESS,
    FETCH_PETS_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    posts: [],
    isLoading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_PETS_START:
            return {...state, isLoading: true};
        case FETCH_PETS_SUCCESS:
            return {...state, posts: action.payload, isLoading: false}
        case FETCH_PETS_FAIL:
            alert('error fetching pets!');
            return {...state, isLoading: false}
        default:
            return state;
    }
};

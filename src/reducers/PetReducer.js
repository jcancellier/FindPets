import {
	FETCH_PETS_START,
	FETCH_PETS_SUCCESS,
	FETCH_PETS_FAIL,
	FETCH_MORE_PETS_SUCCESS,
	FETCH_MORE_PETS_START,
	CLEAR_PET_RECORDS
} from '../actions/types';

const INITIAL_STATE = {
	posts: [],
	isLoading: false,
	isMorePetsLoading: false,
	morePetsFetchEmpty: false
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FETCH_PETS_START:
			return { ...state, isLoading: true, morePetsFetchEmpty: false };
		case FETCH_PETS_SUCCESS:
			return { ...state, posts: action.payload, isLoading: false }
		case FETCH_PETS_FAIL:
			return { ...state, isLoading: false, posts: {} }
		case FETCH_MORE_PETS_START:
			console.log('fetched more pets START');
			return { ...state, isMorePetsLoading: true }
		case FETCH_MORE_PETS_SUCCESS:
			console.log("size of more pets: " + action.payload.length)
			return { 
				...state, 
				posts: [
					...state.posts, 
					...action.payload
				], 
				isMorePetsLoading: false,
				morePetsFetchEmpty: action.payload.length == 0 ? true : false
			}
		case CLEAR_PET_RECORDS:
			return { ...state, posts: [] }
		default:
			return state;
	}
};

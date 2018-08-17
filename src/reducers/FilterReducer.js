import {
	SET_ANIMAL_FILTER,
	SET_SIZE_FILTER,
	SET_BREED_FILTER,
	SET_AGE_FILTER,
	SET_ZIPCODE_FILTER,
	SET_OFFSET_FILTER
} from '../actions/types';

const INITIAL_STATE = {
	animal: '',
	size: null,
	breed: '',
	age: null,
	location: '93307',
	format: "json",
	count: 50,
	offset: 0
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SET_ANIMAL_FILTER:
			return { ...state, animal: action.payload };
		case SET_SIZE_FILTER:
			return { ...state, size: action.payload };
		case SET_AGE_FILTER:
			return { ...state, age: action.payload };
		case SET_BREED_FILTER:
			return { ...state, breed: action.payload };
		case SET_ZIPCODE_FILTER:
			return { ...state, location: action.payload };
		case SET_OFFSET_FILTER:
			return { ...state, offset: action.payload };
		default:
			return state;
	}
};

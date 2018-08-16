//PetReducer types
export const FETCH_PETS_START = "fetch_pets_start";
export const FETCH_PETS_SUCCESS = "fetch_pets_success";
export const FETCH_PETS_FAIL = "fetch_pets_fail";
export const FETCH_MORE_PETS_START = "fetch_more_pets_start";
export const FETCH_MORE_PETS_SUCCESS = "fetch_more_pets_success";
export const CLEAR_PET_RECORDS = "clear_pet_records";

//FilterReducer types
export const SET_ANIMAL_FILTER = "set_animal_filter";
export const SET_SIZE_FILTER = "set_size_filter";
export const SET_BREED_FILTER = "set_breed_filter";
export const SET_AGE_FILTER = "set_age_filter";
export const SET_ZIPCODE_FILTER = "set_zipcode_filter";
export const SET_OFFSET_FILTER = "set_offset_filter";
export const FETCH_LOCATION_START = "fetch_location_start";
export const FETCH_LOCATION_SUCCESS = "fetch_location_success";
export const FETCH_LOCATION_FAIL = "fetch_location_fail";

//LocationReducer types
export const CLEAR_LOCATION_INFO = "clear_location_info";

//FavoritesReducer types
export const ADD_PET_TO_FAVORITES = "add_pet_to_favorites";
export const REMOVE_PET_FROM_FAVORITES = "remove_pet_from_favorites";

//UserReducer types
export const SET_INITIAL_LAUNCH = "set_initial_launch";
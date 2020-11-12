import {SET_LOCATION, LOADING_LOCATION, SET_PICTURE, RESET_LOCATION, CLEAR_LOADING_LOCATION} from '../types';

const initialState = {
    locationId: localStorage.getItem('locationId'), 
    locationName: localStorage.getItem('locationName'),
    address: localStorage.getItem('address'),
    loading: false,
    pictures: JSON.parse(localStorage.getItem('pictures')),
    picture: null
};

export default function(state = initialState, action){
    switch(action.type){
        case SET_LOCATION:
            return {
                ...state,
                locationId: action.location,
                locationName: action.locationName,
                address: action.address,
                pictures: action.pictures,
                loading: false
            };
        case LOADING_LOCATION:
            return {
                ...state,
                loading: true
            }
        case SET_PICTURE:
            return{
                ...state,
                picture: action.picture 
            }
        case RESET_LOCATION:
            return{
                locationId: null,
                locationName: null,
                pictures: null,
                picture: null,
                loading: false,
            }
        case CLEAR_LOADING_LOCATION:
            return {
                ...state,
                loading: false,
            }
        default:
            return state;
    }    
} 
import { SET_ERRORS, CLEAR_ERRORS, LOADING_UI, PICTURE_CLICKED, LOCATION_CLICKED} from '../types';

const initialState = {
    loading: false,
    errors: {},
    clicked: false,
    deleteLocation: true,
    hover: null
};

export default function(state = initialState, action){
    switch(action.type){
        case SET_ERRORS:
            return {
                ...state,
                loading: false,
                errors: action.payload,
                deleteLocation: true
            };
        case CLEAR_ERRORS:
            return{
                ...state,
                loading: false,
                errors: {},
                clicked: false,
                deleteLocation: true
            }
        case LOCATION_CLICKED:
            return{
                ...state,
                clicked: true
            }
        case LOADING_UI:
            return{
                ...state,
                loading: true
            };
        case PICTURE_CLICKED:
            return{
                ...state,
                clicked: true,
                deleteLocation: false
            }
        default: 
        return state;
    }
}
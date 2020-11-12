import { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, SEEN_WELCOME } from '../types';

const initialState = {
    authenticated: false,
    credentials: {},
    firstTime: Boolean(localStorage.getItem('firstTime'))
};

export default function(state = initialState, action){
    switch(action.type){
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_USER:
            return {
                ...state,
                authenticated: true,
                ...action.payload
            };
        case SEEN_WELCOME:
            return {
                ...state,
                firstTime: true
            }
        default:
            return state;
    }    
}
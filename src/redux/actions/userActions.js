import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, SEEN_WELCOME } from '../types';

import axios from 'axios';

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .post('/login', userData)
      .then((response) => {
        setAutorizationHeader(response.data.token)
        dispatch(getUserData());
        dispatch({type: CLEAR_ERRORS});
        history.push('/'); 
      }) 
      .catch(err => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
      })
}

export const seenWelcome = () => (dispatch) => {
  localStorage.setItem('firstTime', 'true')
  dispatch({type: SEEN_WELCOME})
  
}

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('FBIdToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: SET_UNAUTHENTICATED })
}

export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/signup', newUserData)
    .then((response) => {
      setAutorizationHeader(response.data.token)
      dispatch(getUserData());
      dispatch({type: CLEAR_ERRORS});
      history.push('/'); 
    }) 
    .catch(err => {
      dispatch({
          type: SET_ERRORS,
          payload: err.response.data
      })
    })
}

//TODO fixa detta så att det går att hämta hem data om usern
export const getUserData = () => (dispatch) => {
    axios
      .get('/user')
      .then(response => {
          dispatch({
            type: SET_USER,
            payload: response.data
          })
      })
      .catch(err => console.log(err));
} 

const setAutorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken;
}
import {PICTURE_CLICKED, CLEAR_ERRORS, SET_PICTURE, LOCATION_CLICKED, CLEAR_LOADING_LOCATION} from '../types';

export const imageClick = (imageId) => (dispatch) => {
  console.log(imageId)
  dispatch({
    type: SET_PICTURE,
    picture: imageId
  })
  dispatch({ type: PICTURE_CLICKED})
}

export const locationClick = () => (dispatch) => {
  dispatch({type: LOCATION_CLICKED})
}

export const imageUnClicked = () => (dispatch) => {
  dispatch({type: CLEAR_ERRORS})
  dispatch({type: CLEAR_LOADING_LOCATION})
} 

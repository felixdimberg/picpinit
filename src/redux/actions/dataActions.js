import { SET_ERRORS, CLEAR_ERRORS, SET_LOCATION, LOADING_UI, RESET_LOCATION, LOADING_LOCATION} from '../types';

import axios from 'axios';

export const setLocation = (location, history) => (dispatch) => {
    axios
      .get(`/location/${location.locationId}`)
      .then((response) => {
        console.log(response.data)
        dispatch({
            type: SET_LOCATION,
            location: location.locationId,
            locationName: location.locationName,
            address: location.address,
            pictures: response.data
        });
        localStorage.setItem('locationId', location.locationId)
        localStorage.setItem('locationName', location.locationName)
        localStorage.setItem('address', location.address)
        localStorage.setItem('pictures', JSON.stringify(response.data))
        dispatch({type: CLEAR_ERRORS});
        history.push(`/location/${location.locationName}`); 
      }) 
      .catch(err => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response
        })
      })
    }

export const uploadImage = (formData, location, history, snackbar) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios.post(`/location/${location.locationId}`, formData,)
  .then( () => {
    dispatch(setLocation(location, history))
    snackbar('Image successfully uploaded', {variant: 'success'});
  })
  .catch(err => 
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
  }));
}

export const deleteImage = (location, history, snackbar) => (dispatch) => {
  dispatch({ type: LOADING_LOCATION});
  axios.delete(`/location/${location.locationId}/${location.picture}`)
  .then( () => {
    dispatch(setLocation(location, history))
    snackbar('Image successfully deleted', {variant: 'success'});
  })
  .catch(err => 
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    })
  )
}

export const addLocation = (newLocationData, history, snackbar) => (dispatch) => {
  dispatch({type: LOADING_UI });
  axios
    .post('/location', newLocationData)
    .then((response) => {
      const location ={
        locationId: response.data.locationId,
        locationName: newLocationData.locationName,
        address: newLocationData.address,
        country: newLocationData.country
      }
      dispatch(setLocation(location, history));
      snackbar('Album successfully added.', {variant: 'success'});
    })
    .catch(err => {
      dispatch({
          type: SET_ERRORS,
          payload: err.response.data
      })
    })
 }
 
export const deleteLocation = (locationId, history, snackbar) => (dispatch) => {
  dispatch({type: LOADING_LOCATION });
  axios
    .delete(`/location/${locationId}`)
    .then((response) => {
      history.push('/')
      dispatch({type: RESET_LOCATION})
      snackbar('Location successfully deleted', {variant: 'success'});
    })
    .catch(err => 
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    )
    
}
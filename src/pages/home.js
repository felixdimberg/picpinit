import React, { Component, } from 'react'
import axios from 'axios';
import {withSnackbar} from 'notistack';

//Component
import IntroDialog from '../components/introDialog';

//Icons
import Background from '../images/background.png'
import markerIcon from '../images/marker.png'
import friendsIcon from '../images/friends.png'
import cameraIcon from '../images/camera.png'
import photoAlbumIcon from '../images/photoAlbum.png'
 
// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
 
// Redux
import { connect } from 'react-redux';
import { setLocation, addLocation } from '../redux/actions/dataActions';
 
 
// Google Maps
import { compose, withProps } from "recompose"
import { GoogleMap, withScriptjs, withGoogleMap,} from "react-google-maps"
import MarkerPin  from '../components/marker.js'
import mapStyles from '../util/mapStyles'
import { Typography } from '@material-ui/core';
 
//MuiTheme
const styles = (theme) => ({
 ...theme.spreadThis
})
 
// Creates google maps 
const MyMapComponent = compose(
 withProps({
   googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=GOOGLE_MAPS_API_KEY&language=en",
   loadingElement: <div style={{ height: `100%` }} />,
   containerElement: <div style={{ height: `100%` }} />,
   mapElement: <div style={{ height: `100%` }} />,
 }),
 withScriptjs,
 withGoogleMap
)((props) =>
 <GoogleMap
   defaultZoom={3}
   defaultCenter={{ lat: 30, lng: 50 }}
   onClick={props.onMapClick}
   options={{styles: mapStyles.dark, minZoom: 3, disableDefaultUI: true}}
 >
   {props.isMarkerShown && props.locationBundle.map(location => 
   <MarkerPin
    location={location} 
    locationBundle={props.locationBundle} 
    onMarkerClick={props.onMapClick} 
    history={props.history}
    />
   )}
 </GoogleMap>
)
 
 
class Home extends Component {
 
 constructor() {
   super()
   this.state = {
     locationBundle: null,
     isMarkerShown: false,
     selectedLocation: false,
     chosenLocation: null,
     open: false,
     locationName: '',
     address: null,
     country: null
   }
 }
 
 componentDidMount(){
   axios.get('/location')
   .then(response => {
       this.setState({
         locationBundle: response.data,
         isMarkerShown: true
        })
 })
 .catch(err => console.log(err))
 }
 
 handleClose(){
   this.setState({ open: false})
 }
 
 mapClick(event){
   let address;

   this.setState({
     longitude: event.latLng.lng(),
     latitude: event.latLng.lat(),
     open: true
   })

   fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.latitude},${this.state.longitude}&key=GOOGLE_MAPS_API_KEY&language=en`)
  .then(response => response.json())
  .then(results => {
    address = results.results[0].formatted_address
    address = address.split(', ')
    this.setState({
      country: address[address.length - 1],
      address: results.results[0].formatted_address
    })
  })
  .catch(err => console.log(err))
 }
 
 handleSubmitLocation(){

   const newLocationData = {
     latitude: this.state.latitude,
     longitude: this.state.longitude,
     locationName: this.state.locationName,
     address: this.state.address,
     country: this.state.country
   }

   this.props.addLocation(newLocationData, this.props.history, this.props.enqueueSnackbar);
   if(!this.props.loading){
     if(this.props.errors){
      this.handleClose()
     }
    }
 }
 
 
 handleChange = (event) => {
   this.setState({
     [event.target.id]: event.target.value
   })
 }

 getStarted(){
   this.props.history.push('/login')
 }
 
 render() {
   const {
     classes,
     user: {
       authenticated
     },
     UI: {
       loading,
       errors
     }
   } = this.props

 
   return (
     <div style={{width: "100%", height: "100%"}}>
       {authenticated ? 
       (
       <div style={{width: "100%", height: "100%"}}>
          <IntroDialog />
          <MyMapComponent
            isMarkerShown={this.state.isMarkerShown}
            locationBundle={this.state.locationBundle}
            onMapClick={this.mapClick.bind(this)}
            history={this.props.history}
          />
          <Dialog className={classes.locationPaper} open={this.state.open} onClose={this.handleClose.bind(this)} aria-labelledby="form-dialog-title">
          <img  src={photoAlbumIcon} className={classes.locationIcon} alt="fireSpot"/>
          <DialogTitle id="form-dialog-title">Create New Album</DialogTitle>
          <DialogContent className={classes.dialogLocation}>
          <TextField
              autoFocus
              margin="dense"
              id="locationName"
              label="Name"
              type="text"
              helperText={errors.locationName}
              error={errors.locationName ? true : false}
              value={this.state.locationName}
              onChange={this.handleChange}
              fullWidth
            />
            <DialogContentText className={classes.locationAddress}>
              {this.state.address}
            </DialogContentText>
          </DialogContent>
          <DialogActions>

              <Button type="submit" variant="contained" className={classes.locationButton} onClick={this.handleSubmitLocation.bind(this)}>
                {loading ? (
                <CircularProgress size={24} className={classes.uploadProgress}/>
              )
              : (<text>Add Album</text>) }
              </Button>

          </DialogActions>
        </Dialog>
        
      </div>
      ) : 
     (
       
      <div style={{position: 'fixed', height: '100%', width: '100%', backgroundSize: 'cover', backgroundImage: `url(${Background})`}}>
        <Grid container row>

          <Grid item xs={12} style={{textAlign: 'center'}}>
            <Typography variant="h1" className={classes.welcomeTitle}>
                Share your Memories.  
            </Typography>
            <div className={classes.iconDiv}>
                <img  src={markerIcon} className={classes.homeIcon} alt="fireSpot"/>Set Location.
                <img  src={cameraIcon} className={classes.homeIcon} alt="fireSpot"/>Take Pictures.
                <img  src={friendsIcon} className={classes.homeIcon} alt="fireSpot"/>Remember it Together.
            </div>
            <Button 
                  onClick={this.getStarted.bind(this)}
                  variant="contained" 
                  className={classes.getStarted}

                >
                <text>Get Started</text>
            </Button>
          </Grid>

        </Grid>
      </div>

     
     )}

     </div>
   )
 }
}
 
const mapStateToProps = (state) => ({
 data: state.data,
 user: state.user,
 UI: state.UI
})
 
const mapActionsToProps = {
 setLocation,
 addLocation
 
}
 
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(withSnackbar(Home)));

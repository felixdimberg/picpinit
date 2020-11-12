import React, { Component } from 'react'

// Redux
import { connect } from 'react-redux';
import { setLocation, addLocation } from '../redux/actions/dataActions';

// Google Maps
import { Marker, InfoWindow } from "react-google-maps"

//Mui
import withStyles from '@material-ui/core/styles/withStyles';


const styles = (theme) => ({
    ...theme.spreadThis
   })

class MarkerPin extends Component {

    constructor(){
        super();
        this.state = {
          showInfoWindow: false
        }
    }

    handleMouseOver(){
        this.setState({
          showInfoWindow: true
        })
    }
      
    handleMouseExit(){
        this.setState({
            showInfoWindow: false
        })
    }

    handleMarkerClick(event) {
  
        let latLng = JSON.parse(JSON.stringify(event.latLng));
        var results = this.props.locationBundle.filter(location => {
          return location.location._latitude === latLng.lat && location.location._longitude === latLng.lng
        })
        const location = results[0];
        this.props.setLocation(location, this.props.history)
      }
      
    render() {
        const {
            classes,
            location: {
                locationId,
                locationName,
                location: {
                    _latitude,
                    _longitude
                },
                country
            }
        } = this.props
        const {showInfoWindow} = this.state
    return (
        <Marker 
            icon = {{url: '/marker.png', scaledSize: new window.google.maps.Size(50,50)}} 
            key = {locationId} 
            position = {{ lat: _latitude, lng: _longitude }} 
            onClick = {this.handleMarkerClick.bind(this)}
            onMouseOver = {this.handleMouseOver.bind(this)} 
            onMouseOut = {this.handleMouseExit.bind(this)}>
            {showInfoWindow && (
                <InfoWindow>
                    <div>
                        <div className={classes.markerLocationName}>
                            {locationName}
                        </div>
                        <div className={classes.country}>
                            {country}
                        </div> 
                    </div>
                </InfoWindow>
                )}

        </Marker> 
    )
  }
}

const mapStateToProps = () => ({
})
    
const mapActionsToProps = {
    setLocation,
    addLocation
}
    
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(MarkerPin));

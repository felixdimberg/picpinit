import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withRouter } from "react-router"
import { withSnackbar } from 'notistack';


// MUI stuff
import IconButton from "@material-ui/core/IconButton";
import Tooltip from '@material-ui/core/Tooltip';
import { Typography } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';

import DeleteIcon from '@material-ui/icons/DeleteOutline';

//Redux
import {connect} from 'react-redux';
import { uploadImage } from '../redux/actions/dataActions'
import { locationClick } from '../redux/actions/uiActions'

const styles = (theme) => ({
    ...theme.spreadThis,
})


class LocationBar extends Component {

    
    fileSelectedHandler = event => { 
        const image = event.target.files[0]
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadImage(formData, this.props.data, this.props.history, this.props.enqueueSnackbar);

    }

    handleEditPicture = () => {
        const fileInput = document.getElementById('fileSelector');
        fileInput.click();
    }
    
    deleteLocationClicked = () => {
        this.props.locationClick(); 
    }
    
    render() {
        const {
            classes, 
            data: {
                locationName,
                address
            },
            UI: {
                loading
            }
        } = this.props;

        return (
            <div className={classes.locationBarContainer}>
                <Typography className={classes.locationName}>
                    {locationName}
                        <IconButton 
                            className={classes.editLocationIcon}
                            onClick={this.deleteLocationClicked.bind(this)}
                        >   
                            <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Delete Album" placement="right">
                                    <DeleteIcon fontSize="small"/>
                            </Tooltip>
                        </IconButton>

                </Typography>
                <Typography className={classes.locationAddress}>
                   {address}
                </Typography>

                <input 
                    type="file"
                    id="fileSelector"
                    onChange={this.fileSelectedHandler}
                    hidden="hidden"
                />
                <Button 
                    className={classes.addButton}
                    onClick={this.handleEditPicture} 
                    variant="contained"
                    disabled={loading}
                    >
                    {loading ? (
                        <CircularProgress size={24} className={classes.uploadProgress}/>
                    ): (<CloudUploadIcon className={classes.uploadProgress}/>)}
                    <text classname={classes.uploadText}>Upload Image</text>
                </Button>
            </div>    
        )
    } 
}

const mapStateToProps = (state) =>({
    data: state.data,
    UI: state.UI
})

const mapActionsToProps = { uploadImage, locationClick };

LocationBar.propTypes = {
    deleteLocation: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired

}

export default withRouter(connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(withSnackbar(LocationBar))));
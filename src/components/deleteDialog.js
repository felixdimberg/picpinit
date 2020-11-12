import React, {Component} from 'react'

import cancelIcon from '../images/cancel.png'
import { withSnackbar } from 'notistack';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';


//Redux
import {connect} from 'react-redux';
import { deleteImage, deleteLocation } from '../redux/actions/dataActions'
import { imageUnClicked} from '../redux/actions/uiActions'

const styles = (theme) => ({
    ...theme.spreadThis
  });


class DeleteDialog extends Component {
  

  handleDelete(){
      this.props.deleteImage(this.props.data, this.props.history, this.props.enqueueSnackbar)
  }

  handleClose(){
      this.props.imageUnClicked()
  }

  deleteLocationClicked = () => {
      this.props.deleteLocation(this.props.data.locationId, this.props.history, this.props.enqueueSnackbar);
  }

  render() {
    const {
        classes,
        UI: { clicked, deleteLocation},
        data: {
            locationName,
            picture, 
            loading
        },
    } =this.props

    let deleteAction;
    let deleteText;
  

    if(deleteLocation){
      deleteAction= this.deleteLocationClicked.bind(this);
      deleteText =` Do you really want to delete the album "${locationName}"? This procces cannot be undone.`;
    }else{
      deleteAction= this.handleDelete.bind(this);
      deleteText =` Do you really want to delete "${picture}" from this album? This procces cannot be undone.`;
    }
    
    return(
      <Dialog
        open={clicked}
        onClose={this.handleClose.bind(this)}
        className={classes.locationPaper}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <img  src={cancelIcon} className={classes.locationIcon} alt="fireSpot"/>
        <DialogTitle className={classes.deleteTitle} id="alert-dialog-title">{`Are you sure?`}</DialogTitle>
        <DialogContent className={classes.dialogLocation}>
          <DialogContentText id="alert-dialog-description">
            {deleteText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" className={classes.cancelButton} onClick={this.handleClose.bind(this)} >
            Cancel
          </Button>
          <Button
            variant="contained"
            className={classes.deleteButton}
            onClick={deleteAction}
          >
            {loading ? (<CircularProgress size={24} className={classes.deleteProgress}/>)
            : (<text>Delete</text>)}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

const mapStateToProps = (state) =>({
    UI: state.UI,
    data: state.data
})

const mapActionsToProps = {deleteImage, imageUnClicked, deleteLocation};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(withSnackbar(DeleteDialog)))
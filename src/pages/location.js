import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';

// Components
import PictureCard from '../components/pictureCard';
import LocationBar from '../components/locationBar';
import DeleteDialog from '../components/deleteDialog';
import deniedIcon from '../images/denied.png';

//Redux
import {connect} from 'react-redux';
import { imageUnClicked } from '../redux/actions/uiActions';

// MUI stuff
import GridList from '@material-ui/core/GridList'
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Container from '@material-ui/core/Container';


const styles = (theme) => ({
  ...theme.spreadThis
});  


class Location extends Component {

  constructor(){
    super();
    this.state = {
      errors: {},
      error: false
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.UI.errors){
      this.setState({
        error: true,
        errors: nextProps.UI.errors
      })
    }
  }

  handleClose(){
      this.props.imageUnClicked()
      this.setState({
        error: false
      })
  }

  render() {
    const {
      classes, 
      data: {pictures},
    } = this.props;
    const {errors, error} = this.state

    let picturesMarkup = pictures.map((picture) => <PictureCard picture={picture}/>)

    return (
        <Container maxWidth='xl'>
          <LocationBar/>
          <div className={classes.root}>
            <GridList cellHeight={300} className={classes.picturesGrid} cols={3}>
              {picturesMarkup}
            </GridList>
          </div>
          {errors.error && (
            <Dialog
              open={error}
              onClose={this.handleClose.bind(this)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              className={classes.deniedPaper}
              BackdropProps={{ style: { backgroundColor: "transparent" } }}
            >
              <img  src={deniedIcon} className={classes.deniedIcon} alt="fireSpot"/>
              <DialogActions>
              </DialogActions>
              <DialogTitle className={classes.deleteTitle} id="alert-dialog-title">{'Denied'}</DialogTitle>
              <DialogContent className={classes.dialogLocation}>
                <DialogContentText id="alert-dialog-description">
                  {errors.error}
                </DialogContentText>
                <Button variant="contained" className={classes.deniedButton} onClick={this.handleClose.bind(this)} >
                  Okay
                </Button>
              </DialogContent>
            </Dialog>
          )}
          <DeleteDialog history={this.props.history}/>

      </Container>
    )
  }
} 
const mapStateToProps = (state) =>({
    data: state.data,
    UI: state.UI
})

const mapActionsToProps = {imageUnClicked};

Location.propTypes = {
    deleteImage: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(withSnackbar(Location)))
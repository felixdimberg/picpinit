import React, {Component }from 'react';

//Components
import infoIcon from '../images/info.png'

//MUI
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';

// Redux
import { connect } from 'react-redux';
import { seenWelcome } from '../redux/actions/userActions';

const styles = (theme) => ({

    ...theme.spreadThis,

    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
      },

    root: {
        margin: 0,
        padding: theme.spacing(2),
        marginTop: "100px"
    },
    infoPaper:{
        maxWidth: "450px",
        minHeight: '600px',
        textAlign: "center",
        padding: '0.1px 20px 80px 20px',
        position: 'absolute',
      },

});

class IntroDialog extends Component {

    handleClose = () => {
        this.props.seenWelcome()
    };

    render(){
        const { classes, user: {firstTime}} = this.props;

        return (
            <div>
              <Dialog 
                aria-labelledby="customized-dialog-title" 
                open={!firstTime}
                disableEnforceFocus
                hideBackdrop
                className={classes.infoPaper}
            >   
                <img  src={infoIcon} className={classes.deniedIcon} alt="fireSpot"/>
                <DialogContent className={classes.dialogLocation}>
                <Typography gutterBottom>
                    <h3>Click on... </h3>
                     ... a <text className={classes.infoHighlight}>Marker</text> to see an album <br/><br/>
                     ... the <text className={classes.infoHighlight}>Map</text> to create a new album
                          

                  </Typography>

                </DialogContent>
 
                <DialogActions>
                  <Button autoFocus onClick={this.handleClose.bind(this)} color="primary" className={classes.button}>
                    Got it
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
        );

    }
}

const mapStateToProps = (state) => ({
    user: state.user

})
    
const mapActionsToProps = {
    seenWelcome
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(IntroDialog))
import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// MUI stuff
import GridListTile from '@material-ui/core/GridListTile'
import DeleteIcon from '@material-ui/icons/Delete'
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';


//Redux
import {connect} from 'react-redux';
import { imageClick } from '../redux/actions/uiActions'

const styles = {
    image: {
        display: 'flex',
        marginBottom: 20,
        maxWidth: 400,
        minWidth: 400,
        height: 400,
        margin: 5,
    },
    icon : {
        color: "white"
    }
};


class PictureCard extends Component {

    constructor(){
        super();
        this.state = {
          hover: false
        }
    }

    deleteClick = (event) => {
        this.props.imageClick(event.currentTarget.id)
    }

    onHover = () => {
        this.setState({hover: true})
    }

    onMouseOut = () => {
        this.setState({hover: false})
    }

    render() {
        const {
          classes,
          picture: { imageUrl, imageId, uploadedBy},
        } = this.props;
        const { hover } = this.state;

    return (
        <div onMouseOver={this.onHover} onMouseOut={this.onMouseOut}>
        <GridListTile key={imageUrl} cols={1} className={classes.image} onClick={this.tileClick}>
            <img alt='' src={imageUrl}/>
            <Slide direction="down" in={hover} mountOnEnter unmountOnExit>
                <GridListTileBar
                title={imageId}
                subtitle={uploadedBy}
                className={classes.tileBar}
                titlePosition="top"
                actionIcon={
                    <IconButton id={imageId} className={classes.icon} onClick={this.deleteClick}>
                        <DeleteIcon />
                    </IconButton>
                }
                actionPosition="right"
                    />
            </Slide>
        </GridListTile>

        </div>
    )
  }
}
const mapStateToProps = (state) =>({
    data: state.data
})

const mapActionsToProps = { imageClick };

PictureCard.propTypes = {
    data: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PictureCard));
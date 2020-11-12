import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

//MUI stuff
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
 
// Redux
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/userActions';
 
const styles = (theme) => ({
  bar: {
    background: '#272727',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  IconButton: {
    "&:hover": {
      color: '#e8ff68',
      background: "#272727"
    }
  },
  title: {
    flexGrow: 1,
  },
});


class Navbar extends Component {

  constructor(){
    super();
    this.state = {
      anchorEl: null,
      open: false
    }
  }

  
  handleMenu = (event) => {
    console.log(event.currentTarget)
    this.setState({anchorEl: event.currentTarget});
    this.setState({open: true});
  };

  logout(props){
    this.setState({anchorEl: null});
    this.setState({open: false});
    props.logoutUser();
  };

  login(){
    this.setState({anchorEl: null});
    this.setState({open: false});
  };

  render(){
    const {
      classes,
      user: { 
        authenticated,
        credentials: {
          username
        }
      },
    } = this.props;

    return (
      <div>
        <AppBar position="fixed" className={classes.bar}>
          <Toolbar className={classes.bar}>
            <Typography variant="h6" className={classes.title}>
            <Button color="inherit" component={Link} to="/">PICPINIT</Button>
            </Typography>
              {!authenticated ? (
                    <Button color="inherit" style={{textTransform: "none"}} component={Link} to="/login">Login</Button>
                  ) : (
                    <div>
                      {username}
                      <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={this.handleMenu}
                        color="inherit"
                      >
                    <AccountCircle />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={this.state.anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={this.state.open}
                      onClose={() => this.setState({open: null})}
                    >
                      <MenuItem onClick={() => this.logout(this.props)}>
                        Logout
                      </MenuItem>
                    </Menu>
                  </div>
                  )
                }
       </Toolbar>
     </AppBar>
   </div>
 );

  }
}

Navbar.propTypes =  {
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
})

const mapActionsToProps = {
  logoutUser
}
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Navbar));
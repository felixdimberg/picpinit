import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Background from '../images/signup.png'
 

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';

//Redux
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

const styles = (theme) => ({
  ...theme.spreadThis
})

class signup extends Component {
  constructor(){
    super();
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      username: '',
      errors: {}
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.UI.errors){
      this.setState({
        errors: nextProps.UI.errors
      })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      username: this.state.username
    }
    this.props.signupUser(newUserData, this.props.history);

  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value 
    })
  }
  render() {
    const {classes, loading} = this.props;
    const { errors } = this.state;
    return (
      <div style={{backgroundAttachment:'fixed',backgroundSize: 'cover',
          backgroundImage: `url(${Background})`}}>
      <Grid container className= {classes.form}>
        <Grid item sm/>
        <Grid item sm>
        <Paper className={classes.thePaper} >
          <Typography variant="h3" className={classes.pageTitle}>
            Signup
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
          <TextField 
              id="username" 
              name="username" 
              type="text" 
              label="Username" 
              className={classes.textField}
              helperText={errors.username}
              error={errors.username ? true : false}
              value={this.state.username}
              onChange={this.handleChange} 
              fullWidth
            />
            <TextField 
              id="email" 
              name="email" 
              type="email" 
              label="Email" 
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange} 
              fullWidth
            />
            <TextField 
              id="password" 
              name="password" 
              type="password" 
              label="Password" 
              className={classes.textField}
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password} 
              onChange={this.handleChange}
              fullWidth
            />
            <TextField 
              id="confirmPassword" 
              name="confirmPassword" 
              type="password" 
              label="Confirm Password" 
              className={classes.textField}
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
              value={this.state.confirmPassowrd} 
              onChange={this.handleChange}
              fullWidth
            />
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>{errors.general}</Typography>
            )}
            <Button 
              type="submit" 
              variant="contained" 
              className={classes.button}
              disabled={loading}
              >
              {loading || 
                <text>Signup</text>
              }
              {loading && (
                <CircularProgress className={classes.progress}/>
              )}
            </Button>
          </form>
          <small>Already have an account? Login <Link to="/login" className={classes.link}>here</Link></small>
          </Paper>
         </Grid>
        <Grid item sm/>
      </Grid>
      </div>
    )
  }
}

signup.propTypes =  {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
})

const mapActionsToProps = {
  signupUser
}
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(signup ));

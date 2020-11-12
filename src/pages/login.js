import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import Background from '../images/login.png'

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';


// Redux
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

const styles = (theme) => ({
  ...theme.spreadThis,
  
})

class login extends Component {

  constructor(){
    super();
    this.state = {
      email: '',
      password: '',
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
    const userData = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.loginUser(userData, this.props.history)
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value 
    })
  }

  render() {
    const { classes, UI: { loading }} = this.props;
    const { errors } = this.state;
    return (
      <div style={{position: 'fixed', height: '100%', width: '100%', backgroundSize: 'cover', backgroundImage: `url(${Background})`}}>
      <Grid container className= {classes.form}>
        <Grid item xs/>
        <Grid item xs style={{justifyContent: 'center', position: 'center'}}>
          <Paper className={classes.thePaper} >
            
              <Typography variant="h3" className={classes.pageTitle}>
                Login
              </Typography>
              <form noValidate onSubmit={this.handleSubmit} className={classes.submitForm}> 
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
                  InputProps={{
                    className: classes.input,
                }}
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
                  InputProps={{
                    className: classes.input,
                  }}
                />
                {errors.general && (
                  <Typography variant="body2" className={classes.customError}>{errors.general}</Typography>
                )}
                {loading ? (
                    <div>
                      <CircularProgress className={classes.progress}/>
                    </div>
                    
                  ) : (
                    <Button 
                      type="submit" 
                      variant="contained" 
                      className={classes.button}
                      disabled={loading}
                    >
                    Login
                </Button>
                  )}
              </form>
              <small>Don't have an account? Sign up <Link to="/signup" className={classes.link}>here</Link></small>

          </Paper>

          </Grid>
        <Grid item xs/>
        
      </Grid>
      </div>
    )
  }
}

login.propTypes =  {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
})

const mapActionsToProps = {
  loginUser
}
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));
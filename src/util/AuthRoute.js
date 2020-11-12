import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const AuthRoute = ({ component: Component, loginAuth, authenticated, ...rest }) => (
    <Route
        {...rest}
        render={
            (props) => !authenticated && !loginAuth ? (<Redirect to='/login'/>) : 
            (authenticated && loginAuth ? (<Redirect to='/'/>) : (<Component {...props}/>))
        }
    />
)

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(AuthRoute);
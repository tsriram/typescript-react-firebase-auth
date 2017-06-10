import * as React from 'react';
import { Route, Switch, Redirect, RouteProps } from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import NotFound from './components/NotFound';

const authed = false;

interface ExtendedRoute extends RouteProps {
    authed?: boolean
}

const PrivateRoute = (props: ExtendedRoute) => {
    const {component: Component, authed, ...rest} = props;
    return (
        <Route
            {...rest}
            render={
                (props) => authed === true
                    ? <Component {...props} />
                    : <Redirect to={{pathname: '/login', state: {from: props.location}}} />
            }
        />
    )
}

const PublicRoute = (props: ExtendedRoute) => {
    const {component: Component, authed, ...rest} = props;
    return (
        <Route
            {...rest}
            render={
                (props) => authed === false
                    ? <Component {...props} />
                    : <Redirect to='/profile' />
            }
        />
    )
}

export const routes = (
    <Switch>
        <PublicRoute authed={authed} exact path='/' component={Home} />
        <PublicRoute authed={authed} path='/login' component={Login} />
        <PrivateRoute authed={authed} path='/profile' component={Profile} />
        <PublicRoute authed={authed} component={NotFound} />
    </Switch>
)

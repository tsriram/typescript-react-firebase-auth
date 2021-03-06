import * as React from 'react';
import { Route, Switch, Redirect, RouteProps } from 'react-router-dom';
import { User } from 'firebase';

export interface ExtendedRouteProps extends RouteProps {
    authed?: boolean,
    user?: User
}

export const PrivateRoute = (props: ExtendedRouteProps) => {
    const {component: Component, authed, user, ...rest} = props;
    const extraProps = {
        user
    };
    return (
        <Route
            {...rest}
            render={
                (rprops) => {
                    return authed === true
                        ? <Component {...rprops} {...extraProps} />
                        : <Redirect to={{pathname: '/login', state: {from: rprops.location}}} />
                }
            }
        />
    )
}

export const PublicRoute = (props: ExtendedRouteProps) => {
    const {component: Component, authed, user, ...rest} = props;
    const extraProps = {
        user
    };
    return (
        <Route
            {...rest}
            render={
                (props) => authed === false
                    ? <Component {...props} {...extraProps} />
                    : <Redirect to='/profile' />
            }
        />
    )
}

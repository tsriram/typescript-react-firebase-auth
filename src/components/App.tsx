import * as React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, RouteProps } from 'react-router-dom';
import { PrivateRoute, PublicRoute } from '../routes';
import { firebaseAuth } from '../util/constants';
import { User } from 'firebase';

import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';
import NotFound from './NotFound';

export default class App extends React.PureComponent<any,any> {
    constructor(props: React.Props<any>) {
        super(props);
        this.state = {
            loading: true,
            authed: false
        }
    }
    removeListener = () => {};

    componentDidMount() {
        this.removeListener = firebaseAuth().onAuthStateChanged((user: User) => {
            if(user) {
                this.setState({
                    authed: true,
                    user: user,
                    loading: false
                });
            } else {
                this.setState({
                    authed: false,
                    user: null,
                    loading: false
                });
            }
        })
    }

    componentWillUnmount() {
        this.removeListener();
    }

    render() {
        const { authed, user }: { authed: boolean, user: User} = this.state;
        if(this.state.loading) {
            return (
                <div className='content is-large has-text-centered'>
                    Loading...
                </div>
            )
        }
        return (
            <div>
                <Router>
                    <Switch>
                        <PublicRoute authed={authed} user={user} exact path='/' component={Home} />
                        <PublicRoute authed={authed} user={user} path='/login' component={Login} />
                        <PublicRoute authed={authed} user={user} path='/signup' component={Signup} />
                        <PrivateRoute authed={authed} user={user} path='/profile' component={Profile} />
                        <PublicRoute authed={authed} user={user} component={NotFound} />
                    </Switch>
                </Router>
            </div>
        )
    }
}

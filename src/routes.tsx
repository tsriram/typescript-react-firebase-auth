import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import NotFound from './components/NotFound';

export const routes = (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/profile' component={Profile} />
        <Route component={NotFound} />
    </Switch>
)

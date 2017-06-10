import * as React from 'react';
import { Route } from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';

export const routes = (
    <div>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/profile' component={Profile} />
    </div>
)

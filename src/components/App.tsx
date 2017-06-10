import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'

import { routes } from '../routes';

export default class App extends React.PureComponent<any,any> {
    constructor(props: React.Props<any>) {
        super(props);
    }

    render(): any {
        return (
            <div>
                <Router>
                    {routes}
                </Router>
            </div>
        )
    }
}
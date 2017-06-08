import * as React from 'react';
import * as ReactDOM from 'react-dom';

// require('./styles/app.scss');
import 'bulma/css/bulma.css';

const App = () => <div>Hello World!</div>;

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
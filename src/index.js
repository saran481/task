import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import ReactDOM from 'react-dom';


import registerServiceWorker from './registerServiceWorker';
import App from './App';

const routes = (
    <BrowserRouter>
        <div>
            <Route exact path='/' component={App.App} />
            <Route path='/:name' component={App.ChartDisplays}>
            </Route>
        </div>
    </BrowserRouter>
);


ReactDOM.render(routes, document.getElementById('root'));
registerServiceWorker();

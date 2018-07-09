import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import LoginPage from './LoginPage';
import { VolunteerPage } from './VolunteerPage';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/volunteer/:id" component={VolunteerPage} />
            <Route path="/" component={LoginPage} />
        </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);
registerServiceWorker();

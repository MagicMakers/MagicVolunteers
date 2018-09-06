import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter, Switch } from "react-router-dom";

import HomePage from "./pages/homepage.react";
import RegisterPage from "./pages/register.react";

import DashboardLayout from "./layouts/dashboardLayout.react";

import registerServiceWorker from "./utils/registerServiceWorker";
import "./index.css";
import "./simple-line-icons.css";

/** Font awesome imports and setup **/
import { library }             from '@fortawesome/fontawesome-svg-core'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

library.add(faExclamationCircle);

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/register" component={ RegisterPage } />
            <Route path="/dashboard" component={ DashboardLayout } />
            <Route path="/" component={ HomePage } />
        </Switch>
    </BrowserRouter>,
    document.getElementById( "root" ),
);
registerServiceWorker();

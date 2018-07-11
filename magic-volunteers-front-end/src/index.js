import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter, Switch } from "react-router-dom";

import LoginPage from "./LoginPage";
import HomePage from "./pages/homepage.react";
import { VolunteerPage } from "./VolunteerPage";
import RegisterPage from "./pages/register.react";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/volunteer/:id" component={VolunteerPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/" component={HomePage} />
        </Switch>
    </BrowserRouter>,
    document.getElementById("root")
);
registerServiceWorker();

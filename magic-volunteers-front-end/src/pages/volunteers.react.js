import React from "react";
import { Route, Switch } from "react-router-dom";

import VolunteerList from "../components/volunteerList.react";
import "./volunteers.css";

function VolunteersPage() {
    return (
        <div className="mv-content">
            <h1>Volunteers</h1>
            <Switch>
                <Route exact path="/dashboard/volunteers/" component={ VolunteerList } page="1" />
                <Route path="/dashboard/volunteers/:page" component={ VolunteerList } />
            </Switch>
        </div>
    );
}

export default VolunteersPage;

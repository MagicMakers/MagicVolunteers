import React from "react";
import { Route, Switch } from "react-router-dom";
import "./coordinator.css";
import MapComponent from "../components/mapComponent.react";
import VolunteerList from "../components/volunteerList.react";

function CoordinatorPage() {
    return (
        <div className="mv-content">
            <h1>Coordinators</h1>
            <Switch>
                <Route exact path="/dashboard/coordinators/" component={ VolunteerList } page="1" />
                <Route path="/dashboard/coordinators/:page" component={ VolunteerList } />
            </Switch>
            <MapComponent />
        </div>
    );
}

export default CoordinatorPage;

import React from "react";
import VolunteerPage from "../pages/volunteer.react";
import CoordinatorPage from "../pages/coordinator.react";
import { Route, Switch } from "react-router-dom";

function DashboardLayout() {
    return (
        <div className="mv-dashboard-layout">
            <Switch>
                <Route path="/dashboard/volunteer" component={VolunteerPage} />
                <Route
                    path="/dashboard/coordinator"
                    component={CoordinatorPage}
                />
            </Switch>
        </div>
    );
}

export default DashboardLayout;

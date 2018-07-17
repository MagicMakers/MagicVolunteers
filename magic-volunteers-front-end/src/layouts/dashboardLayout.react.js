import React from "react";
import { Route, Switch } from "react-router-dom";
import VolunteersPage from "../pages/volunteers.react";
import CoordinatorPage from "../pages/coordinator.react";
import MagicCamp from "../pages/magiccamp.react";
import MagicBox from "../pages/magicbox.react";
import Dashboard from "../pages/dashboard.react";
import { VolunteerPage } from "../pages/VolunteerPage";

import Header from "../components/header.react";

function DashboardLayout() {
    return (
        <div className="mv-dashboard-layout">
            <Header />
            <Switch>
                <Route path="/dashboard/volunteers" component={VolunteerPage} />
                <Route path="/dashboard/volunteer/:id" component={VolunteerPage} />
                <Route path="/dashboard/coordinators" component={CoordinatorPage} />
                <Route path="/dashboard/magicbox" component={MagicBox} />
                <Route path="/dashboard/magiccamp" component={MagicCamp} />
                <Route path="/dashboard" component={Dashboard} />
            </Switch>
        </div>
    );
}

export default DashboardLayout;

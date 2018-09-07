import React from "react";
import "./coordinator.css";
import MapComponent from "../components/mapComponent.react";

function CoordinatorPage() {
    return (
        <div className="mv-content">
            <h1>Coordinators</h1>
            <MapComponent />
        </div>
    );
}

export default CoordinatorPage;

import React from "react";
import "./coordinator.css";
import MapComponent from "../components/mapComponent.react";

function CoordinatorPage() {
    return (
        <div className="app">
            <div className="container">
                <div className="content">
                    <MapComponent />
                </div>
            </div>
        </div>
    );
}

export default CoordinatorPage;

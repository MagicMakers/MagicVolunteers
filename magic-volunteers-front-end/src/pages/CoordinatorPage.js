import React from "react";
import "./CoordinatorPage.css";
import MapComponent from "../components/MapComponent";

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

import React from "react";
import "./CoordinatorPage.css";
import MapComponent from "./components/MapComponent";
import MagicNav from "./components/MagicNav";

function CoordinatorPage() {
    return (
        <div className="app">
            <MagicNav />
            <MapComponent />
        </div>
    );
}

export default CoordinatorPage;

import React from "react";
import loadingIcon from "../assets/loader.gif";

const Loading = () => (
    <div className="loader">
        <img src={ loadingIcon } alt="Loading" />
    </div>
);

export default Loading;

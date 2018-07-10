import React from 'react';
import PropTypes from "prop-types";
import packageIcon from "../assets/package-icon.png";
import volunteerIcon from "../assets/volunteer-icon.png";

const MapIconComponent = ({ text, volunteer }) => (
    <div>
        <img src={volunteer ? volunteerIcon : packageIcon} alt="package" width="25" height="25" />{" "}
        {text}
    </div>
);

MapIconComponent.propTypes = {
    text: PropTypes.string,
    volunteer: PropTypes.bool,
};

MapIconComponent.defaultProps = {
    text: "",
    volunteer: false,
};

export default MapIconComponent;
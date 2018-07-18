import React from "react";
import PropTypes from "prop-types";
import packageIcon from "../assets/package-icon.png";
import volunteerIcon from "../assets/volunteer-icon.png";

const MapIconComponent = ( {
    text, volunteer, width, height,
} ) => (
    <div>
        <img
            src={ volunteer ? volunteerIcon : packageIcon }
            alt="package"
            width={ width }
            height={ height }
        />{" "}
        {text}
    </div>
);

MapIconComponent.propTypes = {
    text: PropTypes.string,
    volunteer: PropTypes.bool,
    width: PropTypes.number,
    height: PropTypes.number,
};

MapIconComponent.defaultProps = {
    text: "",
    volunteer: false,
    width: 25,
    height: 25,
};

export default MapIconComponent;

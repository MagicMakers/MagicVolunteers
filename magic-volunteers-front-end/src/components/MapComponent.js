import React, { Component } from "react";
import PropTypes from "prop-types";
import GoogleMapReact from "google-map-react";
import Geocode from "react-geocode";
import MapIconComponent from "./MapIconComponent";

import { getBoxes, getVolunteers } from "../utils/apiServices";

const apiKey = "AIzaSyCH_tbMMOg_9dT6_rsO3TqXkJKQip2j0GM";
Geocode.setApiKey(apiKey);

class MapComponent extends Component {
    static propTypes = {
        center: PropTypes.shape({
            lat: PropTypes.number,
            lng: PropTypes.number,
        }),
        zoom: PropTypes.number,
    };

    static defaultProps = {
        center: {
            lat: 46.046169,
            lng: 25.0472072,
        },
        zoom: 6,
    };

    constructor(props) {
        super(props);
        this.state = {
            volunteers: [],
            boxes: [],
        };
    }

    componentWillMount() {
        this.setState({ isLoading: true });
        getVolunteers().then(resp => {
            resp.payload.results.forEach(data => {
                const address = data.address.city + data.address.details;
                Geocode.fromAddress(address).then(response => {
                    const objData = response.results[0].geometry.location;
                    objData.volunteer = data;
                    this.setState({
                        volunteers: [...this.state.volunteers, objData],
                    });
                });
            });
        });

        // getBoxes().then(resp => {
        //     resp.payload.results.forEach(data => {
        //         const address = data.address.city + data.address.details;
        //         Geocode.fromAddress(address).then(response => {
        //             const objData = response.results[0].geometry.location;
        //             objData.box = data;
        //             this.setState({
        //                 boxes: [...this.state.boxes, objData],
        //             });
        //         });
        //     });
        // });
    }

    render() {
        return (
            <div className="container">
                <div className="content">
                    <div style={{ height: "50vh", width: "90%" }}>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: apiKey }}
                            defaultCenter={this.props.center}
                            defaultZoom={this.props.zoom}
                        >
                            {this.state.volunteers.map(data => (
                                <MapIconComponent
                                    key={data.volunteer.id}
                                    lat={data.lat}
                                    lng={data.lng}
                                    text={data.volunteer.name}
                                    volunteer
                                />
                            ))}
                            {this.state.boxes.map(data => (
                                <MapIconComponent
                                    key={data.box.id}
                                    lat={data.lat}
                                    lng={data.lng}
                                    text={data.box.name}
                                    volunteer={false}
                                />
                            ))}
                        </GoogleMapReact>
                    </div>
                </div>
            </div>
        );
    }
}

export default MapComponent;

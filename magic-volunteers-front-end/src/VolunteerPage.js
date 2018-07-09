import React from "react";
import { MyBoxes } from "./components/MyBoxes";
import { AvailableBoxes } from "./components/AvailableBoxes";
import MagicNav from "./components/MagicNav";
import "./VolunteerPage.css";
export class VolunteerPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            myBoxes: [],
            availableBoxes: []
        };
    }
    render() {
        return (
            <div className="app">
                <MagicNav />
                <MyBoxes boxes={this.state.myBoxes} />
                <AvailableBoxes boxes={this.state.availableBoxes} />
            </div>
        );
    }
    componentDidMount() {
        fetch("/boxes?status=available")
            .then(response => response.json())
            .then(data => this.setState({ availableBoxes: data.payload }));
        fetch(`/boxes?assignedVolunteer=${this.props.match.params.id}`)
            .then(response => response.json())
            .then(data => this.setState({ myBoxes: data.payload }));
    }
}

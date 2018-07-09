import React from "react";
import Button from "@material-ui/core/Button";

export class AvailableBoxes extends React.Component {
    render() {
        const rows = this.props.boxes.map(box => (
            <li key={box._id}>
                <span>{box.name}</span>
                <span>
                    {box.address.city} {box.address.details}
                </span>
                <span>{box.status}</span>
                <Button>Adopta</Button>
            </li>
        ));
        return (
            <div>
                <h1>Cutii disponibile</h1>
                <ul>{rows}</ul>
            </div>
        );
    }
}

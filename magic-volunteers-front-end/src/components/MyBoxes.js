import React from "react";

export class MyBoxes extends React.Component {
    render() {
        const rows = this.props.boxes.map(box => (
            <li key={box._id}>
                <span>{box.name}</span>
                <span>
                    {box.address.city} {box.address.details}
                </span>
                <span>{box.status}</span>
            </li>
        ));
        return (
            <div>
                <h1>Cutiile mele</h1>
                <ul>{rows}</ul>
            </div>
        );
    }
}

import React from "react";

export default class MyBoxes extends React.Component {
    handleStatusChange( id, e ) {
        this.props.onBoxStatusChange( id, e.target.value );
    }
    render() {
        const rows = this.props.boxes.map( box => (
            <li key={ box._id }>
                <span>{box.name}</span>
                <span>
                    {box.address.city} {box.address.details}
                </span>
                <select value={ box.status } onChange={ e => this.handleStatusChange( box._id, e ) }>
                    <option value="assigned">assigned</option>
                    <option value="confirmed">confirmed</option>
                    <option value="delivered">delivered</option>
                </select>
            </li>
        ) );
        return (
            <section className="content">
                <h1 className="blue-text list-title">Cutiile mele</h1>
                <ul className="box-list">{rows}</ul>
            </section>
        );
    }
}

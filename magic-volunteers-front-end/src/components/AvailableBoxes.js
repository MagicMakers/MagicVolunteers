import React from "react";

function AvailableBoxes(props) {
    const rows = props.boxes.map(box => (
        <li key={box._id}>
            <span>{box.name}</span>
            <span>
                {box.address.city} {box.address.details}
            </span>
            <span>{box.status}</span>
            <button onClick={props.onAssignBox(box._id)}>Adopta</button>
        </li>
    ));
    const countyOptions = props.counties.map(county => (
        <option key={county} value={county}>
            {county}
        </option>
    ));
    return (
        <section className="content">
            <h1 className="green-text list-title">Cutii disponibile</h1>
            <select onChange={props.onSelectCounty}>
                <option value="">Toate</option>
                {countyOptions}
            </select>
            <ul className="box-list">{rows}</ul>
        </section>
    );
}

export default AvailableBoxes;

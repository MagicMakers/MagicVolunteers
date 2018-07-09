import React, { Component } from "react";
import { Link } from "react-router-dom";

import CredentialsUtils from "../utils/CredentialsUtils";
import "./RegisterForm.css";

const activities = [
    {
        label: "Medic",
        value: "medic"
    },
    {
        label: "IT",
        value: "it"
    },
    {
        label: "Asistent medical",
        value: "asistent_medical"
    },
    {
        label: "Asistent social",
        value: "asistent_social"
    },
    {
        label: "Psiholog",
        value: "psiholog"
    },
    {
        label: "Economist",
        value: "economist"
    },
    {
        label: "Juridic",
        value: "juridic"
    },
    {
        label: "Constructii",
        value: "constructii"
    },
    {
        label: "Artist",
        value: "artist"
    }
];

class RegisterForm extends Component {
    state = {};

    handleSubmit = evt => {
        evt.preventDefault();
    };

    render() {
        const allActivities = buildActivities(activities);
        return (
            <form onSubmit={this.handleSubmit}>
                <h1>Inregistrare</h1>
                <div className="mv-form-group">
                    <label htmlFor="name">Nume</label>
                    <input id="name" type="text" placeholder="Nume" />
                </div>

                <div className="mv-form-group">
                    <label htmlFor="birthdate">Data nasterii</label>
                    <input id="birthdate" type="date" />
                </div>

                <div className="mv-form-group">
                    <label htmlFor="address">Localitate/Judet</label>
                    <input id="address" type="text" />
                </div>

                <div className="mv-form-group">
                    <label htmlFor="phone">Telefon mobil</label>
                    <input id="phone" type="text" />
                </div>

                <div className="mv-form-group">
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" />
                </div>
                <label htmlFor="" className="mv-job-description">
                    Ocupatie:
                </label>
                <div className="mv-activities">
                    {allActivities}
                    <div className="mv-form-group mv-radio">
                        <input
                            type="radio"
                            name="activity"
                            value="altele"
                            id="altele"
                        />
                        <label htmlFor="altele">Altceva:</label>
                        <input type="text" name="ocupatie" id="" />
                    </div>
                </div>

                <button className="mv-btn mv-btn-primary">Inregistrare</button>

                <div className="mv-info-box">
                    <p>
                        Ai deja un cont? <Link to="/login">Click aici</Link>{" "}
                        pentru logare.
                    </p>
                </div>
            </form>
        );
    }
}

function buildActivities(activities) {
    return activities.map(activity => {
        return (
            <div className="mv-form-group mv-radio">
                <input
                    type="radio"
                    name="activity"
                    value={activity.value}
                    id={activity.value}
                />
                <label htmlFor={activity.value}>{activity.label}</label>
            </div>
        );
    });
}

export default RegisterForm;

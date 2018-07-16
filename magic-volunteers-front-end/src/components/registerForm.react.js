import React, { Component } from "react";
import { Link } from "react-router-dom";

import CredentialsUtils from "../utils/CredentialsUtils";
import "./registerForm.css";

const activities = [
  {
    label: "Medic",
    value: "medic",
    id: 1
  },
  {
    label: "IT",
    value: "it",
    id: 2
  },
  {
    label: "Asistent medical",
    value: "asistent_medical",
    id: 3
  },
  {
    label: "Asistent social",
    value: "asistent_social",
    id: 4
  },
  {
    label: "Psiholog",
    value: "psiholog",
    id: 5
  },
  {
    label: "Economist",
    value: "economist",
    id: 6
  },
  {
    label: "Juridic",
    value: "juridic",
    id: 7
  },
  {
    label: "Constructii",
    value: "constructii",
    id: 8
  },
  {
    label: "Artist",
    value: "artist",
    id: 9
  }
];

class RegisterForm extends Component {
  state = {
    role: "volunteer",
    isGDPRCompliant: false,
    projects: {
      proj1: false,
      proj2: false,
      proj3: false,
      proj4: false
    }
  };

  handleSubmit = evt => {
    evt.preventDefault();

    const data = buildData(this.state);

    CredentialsUtils.register(
      data,
      credentials => {
        CredentialsUtils.storeCredentials(
          credentials.userName,
          credentials.token
        );

        // TODO show success messages
      },
      message => {
        // TODO show error messages
      }
    );
  };

  handleChange = evt => {
    const target = evt.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleProjects = evt => {
    const target = evt.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const newProjectsState = { [name]: value };
    this.setState(oldstate => {
      return {
        projects: Object.assign({}, oldstate.projects, newProjectsState)
      };
    });
  };

  render() {
    const allActivities = buildActivities(activities, this);
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Inregistrare</h1>
        <div className="mv-fieldset">
          <h3>User si parola</h3>
          <div className="mv-form-group">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              id="email"
              type="email"
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="mv-form-group">
            <label htmlFor="email">Password</label>
            <input
              name="password"
              id="password"
              type="password"
              onChange={this.handleChange}
              required
            />
          </div>
        </div>
        <div className="mv-fieldset">
          <h3>Date personale</h3>

          <div className="mv-form-group">
            <label htmlFor="name">Nume</label>
            <input
              name="name"
              id="name"
              type="text"
              placeholder="Nume"
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="mv-form-group">
            <label htmlFor="dob">Data nasterii</label>
            <input
              name="dob"
              id="dob"
              type="date"
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="mv-form-group">
            <label htmlFor="phone">Telefon mobil</label>
            <input
              name="phone"
              id="phone"
              type="text"
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="mv-form-group">
            <label htmlFor="city">Localitate</label>
            <input
              name="city"
              id="city"
              type="text"
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="mv-form-group">
            <label htmlFor="judet">Judet</label>
            <input
              name="county"
              id="judet"
              type="text"
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="mv-form-group">
            <label htmlFor="details">Adresa</label>
            <input
              name="details"
              id="details"
              type="text"
              onChange={this.handleChange}
              required
            />
          </div>
        </div>
        {/* .date-personale */}

        <div className="mv-fieldset">
          <h3>Activitate profesionala:</h3>
          <div className="mv-activities">
            {allActivities}
            <div className="mv-form-group mv-radio">
              <input
                type="radio"
                name="jobExperience"
                value="altele"
                id="altele"
                onChange={this.handleChange}
              />
              <label htmlFor="other">Altceva:</label>
              <input
                type="text"
                name="jobExperience"
                id="other"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="mv-form-group">
            <label htmlFor="jobExperience">
              Ai experienta in lucrul cu copiii?
            </label>
            <input
              name="experienceDetails"
              id="jobExperience"
              type="text"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="mv-form-group mv-radio">
            <label>Ai mai facut voluntariat?</label>
            <div className="mv-form-group mv-radio">
              <input
                type="radio"
                name="hasExperience"
                id="da"
                value="da"
                checked={this.state.hasExperience === "da"}
                onChange={this.handleChange}
                required
              />
              <label htmlFor="da">Da</label>
            </div>
            <div className="mv-form-group mv-radio">
              <input
                type="radio"
                name="hasExperience"
                id="nu"
                value="nu"
                checked={this.state.hasExperience === "nu"}
                onChange={this.handleChange}
                required
              />
              <label htmlFor="nu">Nu</label>
            </div>
          </div>
        </div>
        {/* .activitate-profesionala */}

        <div className="mv-fieldset">
          <h3>Referinte</h3>
          <span className="mv-fieldset-subtitle">
            (Te rugam sa indici o persoana care sa poata oferi referinte despre
            tine)
          </span>
          <div className="mv-form-group">
            <label htmlFor="referenceName">Nume:</label>
            <input
              name="referenceName"
              id="referenceName"
              type="text"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="mv-form-group">
            <label htmlFor="contactDetails">
              Date de contact ale persoanei care te-a recomanda
            </label>
            <input
              name="contactDetails"
              id="contactDetails"
              type="text"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="mv-form-group">
            <label htmlFor="relationship">
              Care este relatia dintre tine si persoana de mai sus?
            </label>
            <input
              name="relationship"
              id="relationship"
              type="text"
              onChange={this.handleChange}
              required
            />
          </div>
        </div>

        <div className="mv-fieldset">
          <h3>De ce MagiCAMP?</h3>
          <div className="mv-form-group">
            <label htmlFor="personalDrive">
              De ce iti doresti sa fii voluntar in MagiCAMP?
            </label>
            <input
              name="personalDrive"
              id="personalDrive"
              type="text"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="mv-form-group mv-radio">
            <label>
              La care dintre programele MagiCAMP ai vrea sa participi?
            </label>
            <div className="mv-form-group mv-radio">
              <input
                type="checkbox"
                name="proj1"
                id="proj-1"
                value="1"
                checked={this.state.projects.camps}
                onChange={this.handleProjects}
              />
              <label htmlFor="proj-1">Taberele de vara 2018</label>
            </div>
            <div className="mv-form-group mv-radio">
              <input
                type="checkbox"
                name="proj2"
                id="proj-2"
                value="2"
                checked={this.state.projects.magicbox}
                onChange={this.handleProjects}
              />
              <label htmlFor="proj-2">MagicBOX</label>
            </div>
            <div className="mv-form-group mv-radio">
              <input
                type="checkbox"
                name="proj3"
                id="proj-3"
                value="3"
                checked={this.state.projects.magichomeBuc}
                onChange={this.handleProjects}
              />
              <label htmlFor="proj-3">MagicHOME Bucuresti</label>
            </div>
            <div className="mv-form-group mv-radio">
              <input
                type="checkbox"
                name="proj4"
                id="proj-4"
                value="4"
                checked={this.state.projects.magichomeCluj}
                onChange={this.handleProjects}
              />
              <label htmlFor="proj-4">MagicHOME Cluj</label>
            </div>
          </div>
        </div>

        <button className="mv-btn mv-btn-primary">Inregistrare</button>
        <div className="mv-info-box">
          <p>
            Ai deja un cont? <Link to="/login">Click aici</Link> pentru logare.
          </p>
        </div>
      </form>
    );
  }
}

function buildData(data) {
  const projects = {
    proj1: {
      id: 1,
      name: "Taberele de vara 2018"
    },
    proj2: {
      id: 2,
      name: "MagicBOX"
    },
    proj3: {
      id: 3,
      name: "MagicHome Bucuresti"
    },
    proj4: {
      id: 4,
      name: "MagicHome Cluj"
    }
  };
  const subscribedProjects = Object.keys(data.projects)
    .map(proj => {
      if (data.projects[proj]) {
        return projects[proj];
      }
    })
    .filter(proj => proj);

  return {
    isGDPRCompliant: data.isGDPRCompliant,
    role: data.role,
    name: data.name,
    username: data.name,
    email: data.email,
    password: data.password,
    dob: data.dob, // new Date
    phone: data.phone,

    address: {
      city: data.city,
      county: data.county,
      details: data.details
    },

    background: {
      hasExperience: data.hasExperience === "da" ? true : false,
      jobExperience: data.jobExperience,
      experienceDetails: data.experienceDetails
    },

    references: {
      name: data.referenceName,
      contactDetails: data.contactDetails,
      relationship: data.relationship
    },

    personalDrive: data.personalDrive,
    subscribedProjects
  };
}

function buildActivities(activities, registerForm) {
  return activities.map((activity, index) => {
    return (
      <div className="mv-form-group mv-radio" key={index}>
        <input
          type="radio"
          name="jobExperience"
          value={activity.value}
          id={activity.value}
          onChange={registerForm.handleChange}
          required
        />
        <label htmlFor={activity.value}>{activity.label}</label>
      </div>
    );
  });
}

export default RegisterForm;

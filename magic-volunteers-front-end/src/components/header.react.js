import React, { Component } from "react";
import { Link } from "react-router-dom";
import headerLogo from "../assets/magiclogo.png";

import "./header.css";

class Header extends Component {
    render() {
        return (
            <div className="mv-header">
                <div className="mv-header-branding">
                    <Link className="mv-dashboard-logo" to="/dashboard">
                        <img src={headerLogo} alt="" />
                    </Link>
                    <button className="mv-btn-icon mv-hamburger">
                        <i className="icons icon-menu" />
                    </button>
                </div>
                <div className="mv-header-actions">
                    <button className="mv-btn-icon mv-actions-cog">
                        <i className="icon-settings icons" />
                    </button>
                </div>
                <div className="mv-header-sidebar">
                    <div className="mv-sidebar-user">
                        <div className="mv-user-picture">
                            <img
                                src="https://semantic-ui.com/images/avatar2/large/elyse.png"
                                alt=""
                            />
                        </div>
                        <dl className="mv-user-details">
                            <dt>John Doe</dt>
                            <dd>john.doe@gmail.com</dd>
                        </dl>
                    </div>
                    <ul className="mv-sidebar-menu">
                        <li className="mv-active">
                            <Link to="/dashboard">
                                <i className="mv-icon-main icon-speedometer icons" />
                                <span className="mv-text">Dashboard</span>
                                <i className="icons icon-arrow-down" />
                            </Link>

                            <ul className="mv-siderbar-submenu">
                                <li>
                                    <Link to="/dashboard">
                                        <i className="mv-icon-main icons icon-paper-plane" />
                                        <span className="mv-text">
                                            Submenu Item
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to="/dashboard/volunteers">
                                <i className="mv-icon-main icon-people icons" />
                                <span className="mv-text">Volunteers</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/dashboard/coordinators">
                                <i className="mv-icon-main icon-people icons" />
                                <span className="mv-text">Coordinators</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/dashboard/magicbox">
                                <i className="mv-icon-main icon-drawer icons" />
                                <span className="mv-text">MagicBOX</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/dashboard/magiccamp">
                                <i className="mv-icon-main icon-map icons" />
                                <span className="mv-text">Magicamp</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Header;

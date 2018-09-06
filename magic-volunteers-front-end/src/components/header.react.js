import React from "react";
import { getUserData } from "../utils/adminService";
import { Link } from "react-router-dom";
import headerLogo from "../assets/magiclogo.png";

import "./header.css";

function Header() {
    const user = getUserData();

    const logout = () => {
		const cookies = document.cookie.split(";");

		for (let i = 0; i < cookies.length; i++) {
			const cookie = cookies[i];
			const eqPos = cookie.indexOf("=");
			const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
			document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
		}
	};

	const { isCoordinator, name, email } = user;

    return (
        <div className="mv-header">
            <div className="mv-header-branding">
                <Link className="mv-dashboard-logo" to="/dashboard">
                    <img src={ headerLogo } alt="" />
                </Link>
                <button className="mv-btn-icon mv-hamburger">
                    <i className="icons icon-menu" />
                </button>
            </div>
            <div className="mv-header-sidebar">
                <div className="mv-sidebar-user">
                    <div className="mv-user-picture">
                        <img src="https://semantic-ui.com/images/avatar2/large/elyse.png" alt="" />
                    </div>
                    <dl className="mv-user-details">
                        <dt>{ name }</dt>
                        <dd>{ email }</dd>
						<dd className="logout">
							<Link to="/" onClick={logout}>logout</Link>
						</dd>
                    </dl>
                </div>
                <ul className="mv-sidebar-menu">
					{isCoordinator ?
						(<React.Fragment>
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
                                <Link to="/dashboard/magiccamp">
                                    <i className="mv-icon-main icon-map icons" />
                                    <span className="mv-text">Magicamp</span>
                                </Link>
                            </li>
                        </React.Fragment>)
                        :
                        ''
                    }
					<li>
						<Link to="/dashboard/magicbox">
							<i className="mv-icon-main icon-drawer icons" />
							<span className="mv-text">MagicBOX</span>
						</Link>
					</li>
                </ul>
            </div>
        </div>
    );
}

export default Header;

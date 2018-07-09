import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Divider from "@material-ui/core/Divider";

import LoginComponent from "./components/LoginComponent";
import "./LoginPage.css";
import headerLogo from "./assets/magiclogo.png";
import phoneIcon from "./assets/phone.png";
import emailIcon from "./assets/email.png";
import fbIcon from "./assets/fb.png";
import instaIcon from "./assets/instagram.png";
import ytIcon from "./assets/yt.png";

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentProfile: {
                userName: "Denis Stan",
                iconUrl:
                    "https://pickaface.net/gallery/avatar/myspacedixson5247bbe83039a.png"
            },
            drawerOpen: false
        };
    }

    toggleDrawer = open => () => {
        if (typeof open === "boolean") {
            this.setState({
                drawerOpen: open
            });
        } else {
            const auxOpen = this.state.drawerOpen;
            this.setState({
                drawerOpen: !auxOpen
            });
        }
    };

    render() {
        return (
            <div className="app">
                <AppBar position="static" color="default" className="app-bar">
                    <div className="header">
                        <div className="contact">
                            <a href="mailto:contact@magicamp.ro">
                                <span>
                                    <strong>SCRIE-NE</strong>:{" "}
                                    <span className="info">
                                        contact@magicamp.ro
                                    </span>
                                </span>
                            </a>
                            <a href="tel:+40 766 890 999">
                                <span>
                                    <strong>SUNA LA</strong>:{" "}
                                    <span className="info">
                                        +40 766 890 999
                                    </span>
                                </span>
                            </a>
                        </div>
                        <div className="social">
                            <a>
                                <span>
                                    <span className="info">
                                        Ne putem intalni si pe:
                                    </span>
                                </span>
                            </a>
                            <a href="https://m.facebook.com/magicamp.ro/">
                                <img src={fbIcon} />
                            </a>
                            <a href="https://www.instagram.com/">
                                <img src={instaIcon} />
                            </a>
                            <a href="https://www.instagram.com/">
                                <img src={ytIcon} />
                            </a>
                        </div>
                    </div>
                    <Toolbar className="toolbar">
                        <img src={headerLogo} className="header-logo" />
                        <div className="appbar-right-side">
                            <div className="appbar-drawer-button">
                                <IconButton
                                    color="inherit"
                                    aria-label="Menu"
                                    onClick={this.toggleDrawer()}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </div>
                        </div>
                    </Toolbar>
                </AppBar>

                <SwipeableDrawer
                    className="drawer"
                    open={this.state.drawerOpen}
                    onClose={this.toggleDrawer(false)}
                    onOpen={this.toggleDrawer(true)}
                >
                    <div className="drawer-profile" />
                    <Divider className="divider" />
                    <div className="drawer-contact-line">
                        <a href="mailto:contact@magicamp.ro">
                            <img src={emailIcon} />
                        </a>
                        <a href="tel:+40 766 890 999">
                            <img src={phoneIcon} />
                        </a>
                    </div>
                    <div className="drawer-contact-line">
                        <a href="https://m.facebook.com/magicamp.ro/">
                            <img src={fbIcon} />
                        </a>
                        <a href="https://www.instagram.com/">
                            <img src={instaIcon} />
                        </a>
                    </div>
                </SwipeableDrawer>

                <LoginComponent />
            </div>
        );
    }
}

export default LoginPage;

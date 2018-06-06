import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Info from '@material-ui/icons/Info';
import './MagicNav.css';
import headerLogo from '../assets/magiclogo.png';
import phoneIcon from '../assets/phone.png';
import emailIcon from '../assets/email.png';
import fbIcon from '../assets/fb.png';
import instaIcon from '../assets/instagram.png';
import ytIcon from '../assets/yt.png';


class MagicNav extends Component {


  constructor(props){
    super(props);
    this.state = {
		    currentProfile:{
				      userName:"Denis Stan",
                                      iconUrl:"https://pickaface.net/gallery/avatar/myspacedixson5247bbe83039a.png"
				   },
                    drawerOpen:false
		 };
  }

  toggleDrawer = (open) => () => {
    if(typeof open === "boolean")
    this.setState({
      drawerOpen: open,
    });
    else{
      let auxOpen = this.state.drawerOpen;
      this.setState({
        drawerOpen: !auxOpen
      });
    }	

  };


	
  render() {
    return ( 
     <div class="nav-container">	
      <AppBar position="static" color="default" className="app-bar">
	<div className="header">
                    <div className="contact">
                        <a href="mailto:contact@magicamp.ro"><span><strong>SCRIE-NE</strong>: <span className="info">contact@magicamp.ro</span></span></a>
                        <a href="tel:+40 766 890 999"><span><strong>SUNA LA</strong>: <span className="info">+40 766 890 999</span></span></a>
                    </div>
                    <div className="social">
                        <a><span><span className="info">Ne putem intalni si pe:</span></span></a>
			<a href="https://m.facebook.com/magicamp.ro/">
				<img src={fbIcon}/>		
			</a>		
			<a href="https://www.instagram.com/">
		 		<img src={instaIcon}/>	
			</a>
			<a href="https://www.instagram.com/">
		 		<img src={ytIcon}/>	
			</a>	
                    </div>
                </div>
        <Toolbar className="toolbar">
	   <img src={headerLogo} className="header-logo"/>
	   <div className="header-menu">
                        <ul>
                            <li>PACHETELE MELE</li>
                            <li>OPTIUNE 1</li>
                            <li>OPTIUNE 2</li>
                            <li>CONTUL MEU</li>
                            <li><a href="http://magicamp.ro/">CONTACT</a></li>
                        </ul>
            </div>
	   <div className="appbar-right-side">
		<div className="appbar-drawer-button">
		  <IconButton color="inherit" aria-label="Menu" onClick={this.toggleDrawer()}>
                     <MenuIcon/>
                  </IconButton>
		</div>
		<div className="appbar-profile">
		  <Avatar
                    className="avatar"
		    src={this.state.currentProfile.iconUrl}
                    alt={this.state.currentProfile.userName}
		  />
		 <Typography>
		   {this.state.currentProfile.userName}
                 </Typography>
		</div>
	   </div>
        </Toolbar>
      </AppBar>

      <SwipeableDrawer className="drawer"
          open={this.state.drawerOpen}
          onClose={this.toggleDrawer(false)}
 	  onOpen={this.toggleDrawer(true)}
      >
         <div className="drawer-profile">
		  <Avatar
                    className="avatar"
		    src={this.state.currentProfile.iconUrl}
                    alt={this.state.currentProfile.userName}
		  />
		 <Typography className="username">
		   {this.state.currentProfile.userName}
                 </Typography>
	</div>
    <Divider className="divider" />
    <List>
 	<ListItem button>
          <ListItemText primary="Pachetele mele" />
	 <ListItemIcon>
            <Info />
          </ListItemIcon>
        </ListItem>
	<ListItem button>
          <ListItemText primary="Optiune 1" />
	 <ListItemIcon>
            <Info />
          </ListItemIcon>
        </ListItem>
	<ListItem button>
          <ListItemText primary="Optiune 2" />
	 <ListItemIcon>
            <Info />
          </ListItemIcon>
        </ListItem>
	<ListItem button>
          <ListItemText primary="Contul meu" />
	 <ListItemIcon>
            <Info />
          </ListItemIcon>
        </ListItem>     
    </List>
 	<Divider className="divider" />
	<div className="drawer-contact-line">
	         <a href="mailto:contact@magicamp.ro">
		 <img src={emailIcon}/>		
		</a>		
		<a href="tel:+40 766 890 999">
		 <img src={phoneIcon}/>	
		</a>		
	</div>
	<div className="drawer-contact-line">
	         <a href="https://m.facebook.com/magicamp.ro/">
		 <img src={fbIcon}/>		
		</a>		
		<a href="https://www.instagram.com/">
		 <img src={instaIcon}/>	
		</a>		
	</div>

      </SwipeableDrawer>
    </div>    
    );
  }

}

export default MagicNav;

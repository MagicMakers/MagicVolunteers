import React from 'react';
import LoginPage from './LoginPage';
import VolunteerPage from './VolunteerPage';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {Route, BrowserRouter, Switch} from 'react-router-dom';

ReactDOM.render(<BrowserRouter>
		  <Switch>
			<Route path="/volunteer" component={VolunteerPage}/>
		  	<Route path="/" component={LoginPage}/>
		  </Switch>    		
		</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();

import React, { Component } from 'react';
import MagicNav from './components/MagicNav';
import './VolunteerPage.css';

class VolunteerPage extends Component {


  constructor(props){
    super(props);
   
  }

  render() {
    return (
      <div className="app">
      
      	 <MagicNav/>

      </div>
    );
  }

}

export default VolunteerPage;

import React, { Component } from 'react';
import './LoginComponent.css';
import loadingIcon from '../assets/loader.gif';
import CredentialsUtils from '../utils/CredentialsUtils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Checkbox from '@material-ui/core/Checkbox';

class LoginComponent extends Component {


  selectTab(e){
      window.document.querySelector(".action-selector").childNodes.forEach((a)=>a.classList.remove("active"));
      e.target.parentNode.classList.add("active");
      window.document.querySelector(e.target.getAttribute("target")).scrollIntoView({behavior:'smooth'});
  }

  constructor(props){
    super(props);
    this.state = {isLoading:false};
    this.selectTab = this.selectTab.bind(this);
    this.logInHandle = this.logInHandle.bind(this);
  };


  componentDidMount() {


      this.setState({isLoading:true});
      var credUtils = new CredentialsUtils();
      //Check if the credentials are stored in the cookies. If are not, display the login form.
      if(!credUtils.areCredentialsStored())
      {
          this.setState({isLoading:false});
          return ;
      }

      //If the credential are set, check if they are still valid. If they are, bypass login. Otherwise, the user has to login again
      let contextThis = this;
      credUtils.checkStoredCredentialsValid(function Valid(){
        console.log("valid");
      },
      function notValid(){
        contextThis.setState({isLoading:false});
      });

  }


  logInHandle(e){
      e.preventDefault();
      this.setState({isLoading:true});
      var userName = document.getElementById("username").value;
      var password = document.getElementById("password").value;

      var credUtils = new CredentialsUtils();


      let contextThis = this;

      credUtils.logIn(
          userName,
          password,
          function onSuccess(credentials){
            contextThis.setState({isLoading:false});


            let keepSession = document.getElementById("keep-session-cb").checked;
            let cookieDuration = 0;

            if(keepSession === true)
              cookieDuration = 20; //20 days

            credUtils.storeCredentials(credentials.userName,credentials.uid,credentials.token,cookieDuration);


            //Test purposes.
            toast.success(credentials.token, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false
            });

          },

          function onError(message){
            toast.error(message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false
            });

            contextThis.setState({isLoading:false});
          }
      );
  }

  getLoaderBehaviourStyle(){
      return {
        opacity: this.state.isLoading ? '1' : '0',
        pointerEvents: this.state.isLoading ? 'auto' : 'none'
      }
  };

  render() {

    return (
      <div className="container">
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
        /><ToastContainer />
        <div className="content">
          <div className="loader" style={this.getLoaderBehaviourStyle()}>
            <img src={loadingIcon}/>
          </div>
          <div className="login-container">
          <ul className="action-selector">
            <li className="active"><span target=".login" onClick={(e) => this.selectTab(e)}>Logare</span></li>
            <li><span target=".signup" onClick={(e) => this.selectTab(e)}>Cont nou</span></li>
          </ul>
          <div className="action-container-wrapper">
           <div className="action-container">
            <div className="tab login">
                <div className="login-form">
                  <input id="username" type="email" placeholder="e-mail address"/>
                  <input id="password" type="password" placeholder="password"/>
                  <span class="keep-session">
                  <input id="keep-session-cb" type="checkbox"/>
                  <label for="keep-session-cb">Tine-ma minte</label>
                  </span>
                  <button onClick={(e) => this.logInHandle(e)}>SIGN IN</button>
                </div>
            </div>
            <div className="tab signup">
                <div className="signup-form">
                    <input id="name" type="name" placeholder="Nume" />
                    <input id="birthdate" type="date" placeholder="Data nasterii" />
                    <input id="adress" type="name" placeholder="Localitate/Judet" />
                    <input id="phone" type="number" placeholder="Telefon mobil" />
                    <input id="email" type="email" placeholder="Email" />
                    <div className="background">Background</div>
                    <span className="activitate"><strong>Activitate profesionala</strong></span>
                </div>
                <div className="formGroup">
                    <form method="get">
                        <ul>
                            <li><input type="checkbox" name="activity" value="medic"></input><span>Medic</span></li>
                            <li><input type="checkbox" name="activity" value="it"></input><span>IT</span></li>
                            <li><input type="checkbox" name="activity" value="asistent_medical"></input><span>Asistent medical</span></li>
                            <li><input type="checkbox" name="activity" value="asistent_social"></input><span>Asistent social</span></li>
                            <li><input type="checkbox" name="activity" value="psiholog"></input><span>Psiholog</span></li>
                            <li><input type="checkbox" name="activity" value="economist"></input><span>Economist</span></li>
                            <li><input type="checkbox" name="activity" value="juridic"></input><span>Juridic</span></li>
                            <li><input type="checkbox" name="activity" value="constructii"></input><span>Constructii</span></li>
                            <li><input type="checkbox" name="activity" value="artist"></input><span>Artist</span></li>
                            <li><input type="checkbox" name="activity" value="altele"></input><span>Altele: <input type="text"></input></span></li>
                        </ul>
                    <button>INREGISTRARE</button>
                    </form>
                </div>
            </div>
           </div>
          </div>
        </div>
      </div>
    </div>
    );
  }

}

export default LoginComponent;

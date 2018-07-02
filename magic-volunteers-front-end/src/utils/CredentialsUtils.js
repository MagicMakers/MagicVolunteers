class CredentialsUtils {
   static setCookie(cname, cvalue, exdays) {
    const d = new Date();
    let expires = "";
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    if(exdays >= 0) expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  static getCookie(cname) {
    const name = cname + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
  }

  static storeCredentials(userName, token, duration){
  	CredentialsUtils.setCookie("username",userName,duration);
  	CredentialsUtils.setCookie("token",token,duration);
  }

  static areCredentialsStored(){
  	const userName = CredentialsUtils.getCookie("username");
  	const token = CredentialsUtils.getCookie("token");

  	return (userName !== null && token !== null);
  }

  checkStoredCredentialsValid(onTrue, onFalse){
  	const userName = CredentialsUtils.getCookie("username");
  	const token = CredentialsUtils.getCookie("token");

    // Do the usual XHR stuff
    const req = new XMLHttpRequest();
    req.open('GET', 'https://api.magicvolunteers.tech/test');

    req.onload = function(req) {
      if (req.currentTarget.status === 200) {
      	if(JSON.parse(req.currentTarget.responseText).success === true)
      	  onTrue();
        else
         onFalse();
      } else {
      	onFalse();
      }
    };

    // Handle network errors
    req.onerror = function() {
      onFalse();
    };

    // Make the request
    req.send(JSON.stringify({
    	token: token
    }));
  }

  logIn(userName, password, onSuccess, onError){
  	const req = new XMLHttpRequest();
    req.open('POST', 'https://api.magicvolunteers.tech/users/login');

    req.onload = function(req) {
      if (req.currentTarget.status === 200) {
        onSuccess({
          userName: userName,
          token: JSON.parse(req.currentTarget.responseText).token
        });
      } else onError("Nume / Parola gresite");
    };

    // Handle network errors
    req.onerror = function() {
      onError("Sistem momentan indisponibil. Revenim curand");
    };

    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    // Make the request
    req.send(JSON.stringify({
  		username: userName,
  		password: password
    }));
  }
}

export default CredentialsUtils;

class CredentialsUtils {
   setCookie(cname, cvalue, exdays) {
    var d = new Date();
    var expires = "";
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    if(exdays >= 0)
    expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
  }

  storeCredentials(userName,uid,token,duration){
  	this.setCookie("username",userName,duration);
  	this.setCookie("userid",uid,duration);
  	this.setCookie("token",token,duration);
  }

  areCredentialsStored(){
  	var userId = null;
  	var userName = null;
  	var token = null;

  	userId = this.getCookie("userid");
  	userName = this.getCookie("username");
  	token = this.getCookie("token");

  	if(userId === null || userName === null || token === null)
  		return false;
  	else
  		return true;
  }

  checkStoredCredentialsValid(onTrue,onFalse){

  	var userId = null;
  	var userName = null;
  	var token = null;

  	userId = this.getCookie("userid");
  	userName = this.getCookie("username");
  	token = this.getCookie("token");

    // Do the usual XHR stuff
    var req = new XMLHttpRequest();
    req.open('POST', 'https://api.magicvolunteers.tech/test');

    req.onload = function(req) {
      if (req.currentTarget.status == 200) {
      	if(JSON.parse(req.currentTarget.responseText).success == true)
         onTrue();
    	else
    	 onFalse();
      }
      else {
      	onFalse();
      }
    };

    // Handle network errors
    req.onerror = function() {
      onFalse();
    };

    // Make the request
    req.send(JSON.stringify({
    	uid:userId,
    	token:token
    }));

  }

  logIn(userName,password,onSuccess,onError){
  	var req = new XMLHttpRequest();
    req.open('POST', 'https://api.magicvolunteers.tech/users/login');

    req.onload = function(req) {
      if (req.currentTarget.status == 200) {
      	if(JSON.parse(req.currentTarget.responseText).success == true)
         onSuccess({
         	userName: userName,
         	uid: 123456789, //JSON.parse(req.currentTarget.responseText).uid
         	token:JSON.parse(req.currentTarget.responseText).token
         });
    	else
    	 onError("Nume/Parola gresite");
      }
      else {
      	var errMsg = "Nume/Parola gresite";
      	try{
      	 errMsg = JSON.parse(req.currentTarget.responseText).error;
      	}
      	catch(e){}
      	onError(errMsg);
      }
    };

    // Handle network errors
    req.onerror = function() {
      onError("Sistem momentan indisponibil. Revenim curand");
    };

    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    // Make the request
    req.send(JSON.stringify({
  		id: 123456789,
  		username: userName,
  		password: password
    }));
  }

}

export default CredentialsUtils;
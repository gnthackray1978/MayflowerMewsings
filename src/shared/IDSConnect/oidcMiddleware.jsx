
import { UserManager, WebStorageStateStore, Log } from "oidc-client";
import { push } from 'react-router-redux';

var retryCount =0;

const formatDate = (current_datetime,isUtc)=>{
    if(current_datetime instanceof Date && !isNaN(current_datetime.valueOf())){
      let formatted_date =
         (current_datetime.getMonth() + 1) +
           "-" + current_datetime.getDate() + " "
           + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
        if(isUtc)
          return formatted_date + 'UTC';

        return formatted_date;
    }
    return "Invalid Date";
  };

const getCurrentTime = function(utc){
  let addMinutes = function (date, minutes) {
    return new Date(date.getTime() + minutes*60000);
  };

  var d = new Date(Date.now());

  if(utc){
    let now = d.getTimezoneOffset();
    d = addMinutes(d,now);
  }
  return d;
};

const userExpired = (user)=>{
  let jsUserExpiresAt = new Date(user.expires_at *1000);

  let now = getCurrentTime();

  if(jsUserExpiresAt > now){
    console.log('IDS user token NOT expired - expires at: '   +  user.expires_at + ' ' + formatDate(jsUserExpiresAt)  + ' now ' +  formatDate(now));
    return false;
  }

  console.log('IDS user token expired - expired at: ' +  user.expires_at + ' ' + formatDate(jsUserExpiresAt) + ' now ' + formatDate(now));
  return true;
};

const validateUser = (user, success, failed)=>{
  if(!user || userExpired(user))
  {
    if(!user)
      failed("Could not find logged in user. getUser returned undefined");
    else{
      failed("No valid user. User expired");

    }
  }
  else{
    localStorage.setItem("loginAttemptCounter", "0");
    success('IDS user appears logged in OK. Attempting to get google token.');
  }
};

const manageGoogleTokenRetrieval = (storeAPI, responce, user)=>{

  //Retrieval States
  const RS = {
      TOKENVALID: 'existing token valid',
      FETCHEDEXPIRED: 'fetched expired token',
      FETCHEDVALID: 'fetched valid token',
      USERLOOKUPFAILED: 'user lookup failed',
      USEREXPIRED : 'user expired'
  };

  let mgr;

  mgr = ensureValidUserManage(mgr,storeAPI);

  const retrieveGoogleToken = (storeAPI,google_token_uri,access_token,googleToken,response)=>{

    const googleTokenExpired = (token)=>{

        if(!token){
          throw "invalid token received";
        }

        let expirationDate = new Date(token.expires);

        let now = getCurrentTime(true);


        if(expirationDate > now){
          console.log('google token NOT expired - date: ' + formatDate(expirationDate,true) + ' now ' + formatDate(now,true));
          return false;
        }

        console.log('google token expired - date: ' + formatDate(expirationDate,true) + ' now ' + formatDate(now,true));
        return true;
      };

    const getTokenFromAPI = (google_token_uri,access_token,callback)=>{
        //  var url = 'https://msgauth01.azurewebsites.net/token/test';
        console.log('--getTokenFromAPI--');
        var xhr = new XMLHttpRequest();
        xhr.open("GET", google_token_uri);
        xhr.onload =  () => {
            var resp = JSON.parse(xhr.response);
            console.log('--Fetched google token');
            callback(resp);
        }
        xhr.setRequestHeader("Authorization", "Bearer " + access_token);
        xhr.send();
      };

    console.log('**Retrieve Google Token**');


    // we already have a valid token and it hasn't expired.
    // so dont set anything
    if(googleToken && !googleTokenExpired(googleToken)){
      console.log('**Existing Token Valid No call to API made');
      response({type: RS.TOKENVALID,  payload :googleToken});
      return;
    }

    // we assume that user is valid and has not expired
    getTokenFromAPI(google_token_uri, access_token, (tokenObj)=>{
        let token = tokenObj;
        if(googleTokenExpired(tokenObj)){
          response({type : RS.FETCHEDEXPIRED, payload :undefined});
        }
        else{
          response({type : RS.FETCHEDVALID, payload :token});
        }
      });

  };

  const googleFetchOnGoing =  storeAPI.getState().ids.googleFetchOnGoing;


  const makeLoginDetailAction = (user, action)=>{

    let actionObj = {
              type: "SET_USERINFO_SUCCESS",
              profileObj :{
                name : user.profile.name,
                email :'not retrieved',
                givenName : user.profile.given_name,
                familyName : user.profile.family_name,
                userName : 'not retrieved',
                imageUrl : user.profile.picture
              },
              access_token : user.access_token,
              expires_at : user.expires_at,
              token : action.payload


            };

    return actionObj;
  };


  if(!googleFetchOnGoing){

    // set state to say we're trying to retrieve a google token
    storeAPI.dispatch({
              type: "RETRIEVE_GOOGLE_TOKEN",
            });

    const google_token_uri = storeAPI.getState().ids.IdServParams.google_token_uri;
    const googleToken = storeAPI.getState().google.googleRawToken;


    let googleTokenAction = retrieveGoogleToken(storeAPI,google_token_uri,user.access_token,googleToken, (action)=>{
      switch(action.type){
        //makes multiple attempts to get a new token after previous one has expired
        case RS.FETCHEDEXPIRED:
      //    mgr.getUser().then(function (user) {

              storeAPI.dispatch({type: "DISCONNECT"});
              // let retCount = Number(localStorage.retryCount);
              // if(retCount  < 1){
              //   console.log('valid user - trying to get refreshed google token by signing in to ID Server again!  '+retCount);
              //   retCount++;
              //   localStorage.setItem("retryCount", retCount.toString());
              //   signInSilent(storeAPI,mgr);
              // }
              // //ok so give up trying to get a new token.
              // //things have gone very wrong.
              // else{
              //   storeAPI.dispatch({type: "AUTH_FAILED"});
              // }


          //  });
          break;
        case RS.TOKENVALID:
        case RS.FETCHEDVALID:
          //set state to reflect we have valid ids user and valid google token
          storeAPI.dispatch(makeLoginDetailAction(user, action));
          break;
        case RS.USERLOOKUPFAILED:
        case RS.USEREXPIRED:
          storeAPI.dispatch({type: "AUTH_FAILED"});
          break;
      }
    });

  }

};

const fetchUser = (storeAPI, mgr, failed, success)=>{
//  console.log('fetchUser method will getuser');

  mgr.getUser().then((user) =>{

    validateUser(user, (message)=>{
      if(success)
        success(message);

      manageGoogleTokenRetrieval(storeAPI,()=>{},user);
    },(message)=>{
      failed(storeAPI,message);
    });

  });
};

const ensureValidUserManage= (userManager,storeAPI, params)=>{

  // event callback when the user has been loaded (on silent renew or redirect)
  //currently does nothing
  let onUserLoaded = (user) => {
    //console.log('> user found');
    console.log('> user loaded(ignored)');
    // storeAPI.dispatch({
    //           type: "SET_USER_FOUND",
    //           user :user
    //         });
  };

  // event callback when silent renew errored
  let onSilentRenewError = (error) => {
    console.log('> silent renew error');
    storeAPI.dispatch({
              type: "SET_SILENT_RENEW_ERROR",
              error :error
            });
  };

  // event callback when the access token expired
  let onAccessTokenExpired = () => {
    console.log('> access token expired');
    storeAPI.dispatch({
              type: "SET_ACCESS_TOKEN_EXPIRED"
            });
  };

  // event callback when the user is logged out
  let onUserUnloaded = () => {
    console.log('> user loaded(ignored)');
    // storeAPI.dispatch({
    //           type: "SET_USER_LOADED"
    //         });
  };

  // event callback when the user is expiring
  let onAccessTokenExpiring = () => {
    console.log('> user expiring');
    storeAPI.dispatch({
              type: "SET_USER_EXPIRING"
            });
  }

  // event callback when the user is signed out
  let onUserSignedOut = () => {
    console.log('> user signed out');
    storeAPI.dispatch({
              type: "SET_USER_SIGNOUT"
            });
  }

  let setEvents = (mgr)=>{
    mgr.events.addUserLoaded(onUserLoaded);
    mgr.events.addSilentRenewError(onSilentRenewError);
    mgr.events.addAccessTokenExpired(onAccessTokenExpired);
    mgr.events.addAccessTokenExpiring(onAccessTokenExpiring);
    mgr.events.addUserUnloaded(onUserUnloaded);
    mgr.events.addUserSignedOut(onUserSignedOut);
  };

  let unsetEvents = (mgr)=>{
    mgr.events.removeUserLoaded(onUserLoaded);
    mgr.events.removeSilentRenewError(onSilentRenewError);
    mgr.events.removeAccessTokenExpired(onAccessTokenExpired);
    mgr.events.removeAccessTokenExpiring(onAccessTokenExpiring);
    mgr.events.removeUserUnloaded(onUserUnloaded);
    mgr.events.removeUserSignedOut(onUserSignedOut);
  };

  //reset usermanager
  //this might be unecessary but the example i looked at did thus
  //in future need to experiment removing this because it seems
  //not needed to me
  if(params){
    if(userManager)
      unsetEvents(userManager);

    userManager = new UserManager(params);
    setEvents(userManager);
    return userManager;
  }

  if(userManager)
    return userManager;

  const ids = storeAPI.getState().ids.IdServParams;
  const connected = storeAPI.getState().ids.connected;

  var config = {
      authority: ids.authority,
      client_id: ids.client_id,
      redirect_uri: ids.redirect_uri,
      response_type: ids.response_type,
      scope:ids.scope,
      post_logout_redirect_uri: window.location.origin ,
      loadUserInfo:ids.loadUserInfo,
      IsExternalLoginOnly :ids.loadUserInfo,
      silent_redirect_uri : ids.silent_redirect_uri,
      automaticSilentRenew  : ids.automaticSilentRenew
  };


  if(!userManager){
    userManager = new UserManager(config);
    setEvents(userManager);
  }

  return userManager;
}

const signInSilent = (storeAPI, mgr)=>{

  const makeSignInConfig = (storeAPI)=>{

    const ids = storeAPI.getState().ids.IdServParams;

    var config = {
        authority: ids.authority,
        client_id: ids.client_id,
        redirect_uri: ids.redirect_uri,
        response_type: ids.response_type,
        scope:ids.scope,
        post_logout_redirect_uri: window.location.origin ,
        loadUserInfo:ids.loadUserInfo,
        IsExternalLoginOnly :ids.loadUserInfo,
        silent_redirect_uri : ids.silent_redirect_uri,
        automaticSilentRenew  : ids.automaticSilentRenew
    };

    return config;
  };

  let response = ()=>{

  };



  let loginAttemptCounter = localStorage.getItem("loginAttemptCounter");

  if(loginAttemptCounter > 2)
    return; // let's not try this anymore it's clearly not working.


  loginAttemptCounter++;

  localStorage.setItem("loginAttemptCounter",loginAttemptCounter);

  let config = makeSignInConfig(storeAPI);

  mgr.signinSilent(config)
      .then((user) =>
      {
        //manageGoogleTokenRetrieval(storeAPI,response,user);
        console.log('sign in silent returned user will validate now');

        validateUser(user, (message)=>{
          console.log('sign in silent user validation was a success');
          manageGoogleTokenRetrieval(storeAPI,response,user);
        },(message)=>{
          console.log('sign in silent user validation failed ' + message);
        });

      })
      .catch((error) =>
      {
          console.log('sign in silent failed: ' + error);
         //Work around to handle to Iframe window timeout errors on browsers
          mgr.getUser()
              .then((user) =>
              {
                console.log('sign in silent making another attempt to get google token after previous failure');
                validateUser(user, (message)=>{
                  console.log('sign in silent user validation was a success');
                  manageGoogleTokenRetrieval(storeAPI,response,user);
                },(message)=>{
                  console.log('sign in silent user validation failed ' + message);
                });
              });
      });

};

const connectRedirect = (connected,mgr,storeAPI)=>{

  if(!connected)
  {
      mgr = ensureValidUserManage(mgr,storeAPI,{ response_mode: "query" });

      //try getting user from manager
      console.log('connect Redirect system set to NOT connected calling fetchuser');
      fetchUser(storeAPI,mgr, (dispatcher,message)=>{
        console.log('connect Redirect fetch user couldnt find user with error:' + message);
        //console.log('connectRedirect calling signinRedirectCallback');
        console.log('connect Redirect calling signinredirect');
        mgr.signinRedirectCallback().then( ()=> {
            console.log('connect Redirect in signinRedirectCallback calling fetchuser to check we have logged in');

            //try getting user from manager
            fetchUser(dispatcher,mgr, (dispatcher,message)=>{
              console.log('connect Redirect failure 2 ' + message);
              dispatcher.dispatch({type: "AUTH_FAILED"});
            },(message)=>{
              console.log('connect Redirect success 2 ' + message);
            });

            dispatcher.dispatch(push("/"));
       }).catch( (e)=> {
           console.log('connect Redirect Exception signinRedirectCallback' + e);
           dispatcher.dispatch(push("/"));
       });
     },(successMessage)=>{
       console.log('connect Redirect success 1 ' + successMessage);
     });


   }
   else{
     console.log('connect Redirect already connected');
   }

};

const loadUser =(mgr,storeAPI)=>{
  console.log('LOAD_USER reached');

  const ids = storeAPI.getState().ids;
  //if we are not logged in i.e. if we dont have a valid user already
  if(!ids.connected){
    localStorage.setItem("retryCount", "0");

    mgr = ensureValidUserManage(mgr,storeAPI);

    fetchUser(storeAPI,mgr,(dispatcher, message)=>{
        console.log('fetch user failed inside load user: '+message);
    },(successMessage)=>{

    });
  }

}




const oidcMiddleware = (url) => {
    let mgr;

    return storeAPI => next => action => {

        const connected = storeAPI.getState().ids.connected;

        const expires_at_desc = storeAPI.getState().ids.expiresAtDesc;
        const expires_at  = storeAPI.getState().ids.expiresAt;

        const google_token_uri = storeAPI.getState().ids.IdServParams.google_token_uri;
        const access_token = storeAPI.getState().ids.access_token;
        const googleToken = storeAPI.getState().google.googleRawToken;

        const googleFetchOnGoing =  storeAPI.getState().ids.googleFetchOnGoing;



        switch(action.type) {
            // case "GOOGLE_TOKEN_EXPIRED":{
            //   handleExpiredToken(mgr,storeAPI,retryCount);
            //   break;
            // }

            case "LOAD_USER" :
              localStorage.setItem("loginAttemptCounter",0);
              loadUser(mgr,storeAPI);
              break;

            case "SET_USER_EXPIRING":
              console.log('SET_USER_EXPIRING - calling signInSilent');
              mgr = ensureValidUserManage(mgr,storeAPI);
            // disabled this because automatic silent renew is enabled
            // i think that might do this anyway.
            //  signInSilent(storeAPI,mgr);

              return;

            case "IDS_ATTEMPT_CONNECT":
                console.log('ATTEMPT_CONNECT starting connection attempt');

                const ids = storeAPI.getState().ids;
                // we aren't already logged in and
                // in the middle of an existing auto login
                if(!ids.connected){
                  mgr = ensureValidUserManage(mgr,storeAPI);
                  mgr.signinRedirect();
                }

                return;

            case "RELOAD":

               const query = action.payload;

               if(query.code){
                 console.log('reload with: ' + query.code);
                 connectRedirect(connected,mgr,storeAPI);
               }
               else{
                 if(query.state){
                   console.log('reload with: ' + query.state + ' ' + query.error);
                    storeAPI.dispatch({
                             type: "SET_USER_LOGOUT"
                           });
                   storeAPI.dispatch(push("/"));
                 }else{
                   console.log('loginRedirect Nothing in query string assumed page has been reloaded somehow');
                   loadUser(mgr,storeAPI);
                 }


               }

               break;

            case "DISCONNECT":
                console.log('=DISCONNECT action reached in middleware=');
                console.log('=Attempting to log out');

                let logOutUrl =  window.location.origin;

                mgr = ensureValidUserManage(mgr,storeAPI);

                mgr.getUser().then(function (user) {
                    if (user) {
                        mgr.signoutRedirect({
                          'id_token_hint': user.id_token ,
                          'post_logout_redirect_uri' : logOutUrl,
                          'state' : 'zzzz'
                        }).then(function() {
                          console.log('=signoutRedirect 1');
                        })
                        .finally(function() {
                            console.log('=signoutRedirect 3');

                        });
                    }
                    else {
                        console.log('=couldnt log out because there is no user');
                    }
                });
                return;


            case "SET_USER_SIGNOUT":
                console.log('User signed out');

                break;
            case "SET_ACCESS_TOKEN_EXPIRED":
                console.log('SET_ACCESS_TOKEN_EXPIRED - calling signInSilent');
                mgr = ensureValidUserManage(mgr,storeAPI);

                signInSilent(storeAPI,mgr);

                break;

        }

        return next(action);
    };
};

export default oidcMiddleware;

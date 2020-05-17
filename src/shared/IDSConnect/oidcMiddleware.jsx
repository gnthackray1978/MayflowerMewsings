
import { UserManager, WebStorageStateStore, Log } from "oidc-client";
import { push } from 'react-router-redux';

var retryCount =0;

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

        if(expirationDate > Date.now()){
          return false;
        }

        return true;
      };

    const getTokenFromAPI = (google_token_uri,access_token,callback)=>{
        //  var url = 'https://msgauth01.azurewebsites.net/token/test';
        console.log('--getTokenFromAPI--');
        var xhr = new XMLHttpRequest();
        xhr.open("GET", google_token_uri);
        xhr.onload =  () => {
            var resp = JSON.parse(xhr.response);
            console.log('--Fetched google token with expiration: ' + resp.expires);
            callback(resp);
        }
        xhr.setRequestHeader("Authorization", "Bearer " + access_token);
        xhr.send();
      };

    const userExpired = (user)=>{
      let jsUserExpiresAt = new Date(user.expires_at *1000);
      let now = new Date(Date.now());
      console.log('ids token expiration ' +  user.expires_at + ' ' + jsUserExpiresAt.toString());
      console.log('time now' + now.toString());

      if(jsUserExpiresAt > now){
        return false;
      }

      return true;
  };


    console.log('**Retrieve Google Token**');


    // we already have a valid token and it hasn't expired.
    // so dont set anything
    if(googleToken && !googleTokenExpired(googleToken)){
      console.log('**Existing Token Valid No call to API made');
      response({type: RS.TOKENVALID,  payload :googleToken});
      return;
    }



    mgr.getUser().then(function (user) {
        if (user && !userExpired(user)) {
            getTokenFromAPI(google_token_uri, access_token, (tokenObj)=>{
              let token = tokenObj;
              if(googleTokenExpired(tokenObj)){
                response({type : RS.FETCHEDEXPIRED, payload :undefined});
              }
              else{
                response({type : RS.FETCHEDVALID, payload :token});
              }

            });
        }
        else {
            console.log('**couldnt get valid user');

            if (user && userExpired(user)){
              response({type :  RS.USEREXPIRED, payload :undefined});
            }
            else {
              response({type :  RS.USERLOOKUPFAILED, payload :undefined});
            }
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
          mgr.getUser().then(function (user) {
              if(retryCountArg < 1){
                console.log('valid user - trying to get refreshed google token by signing in to ID Server again!');
                signInSilent(storeAPI,mgr,config);
              }
              //ok so give up trying to get a new token.
              //things have gone very wrong.
              else{
                storeAPI.dispatch({type: "AUTH_FAILED"});
              }
              retryCountArg++;
            });
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

const fetchUser = (storeAPI, mgr, failed)=>{

  const userExpired = (user)=>{
    let jsUserExpiresAt = new Date(user.expires_at *1000);
    let now = new Date(Date.now());
    console.log('ids token expiration ' +  user.expires_at + ' ' + jsUserExpiresAt.toString());
    console.log('time now' + now.toString());

    if(jsUserExpiresAt > now){
      return false;
    }

    return true;
  };

  mgr.getUser().then((user) =>{

    if(!user || userExpired(user))
    {
      if(!user)
        failed(storeAPI,"Could not find logged in user. getUser returned undefined");
      else
        failed(storeAPI,"No valid user. User expired");
    }
    else{
      manageGoogleTokenRetrieval(storeAPI,()=>{},user);
    }

  });
};

const ensureValidUserManage= (userManager,storeAPI, params)=>{

  // event callback when the user has been loaded (on silent renew or redirect)
  //currently does nothing
  let onUserLoaded = (user) => {
    storeAPI.dispatch({
              type: "SET_USER_FOUND",
              user :user
            });
  };

  // event callback when silent renew errored
  let onSilentRenewError = (error) => {
    storeAPI.dispatch({
              type: "SET_SILENT_RENEW_ERROR",
              error :error
            });
  };

  // event callback when the access token expired
  let onAccessTokenExpired = () => {
    storeAPI.dispatch({
              type: "SET_ACCESS_TOKEN_EXPIRED"
            });
  };

  // event callback when the user is logged out
  let onUserUnloaded = () => {
    storeAPI.dispatch({
              type: "SET_USER_LOADED"
            });
  };

  // event callback when the user is expiring
  let onAccessTokenExpiring = () => {
    storeAPI.dispatch({
              type: "SET_USER_EXPIRING"
            });
  }

  // event callback when the user is signed out
  let onUserSignedOut = () => {
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


  let config = makeSignInConfig(storeAPI);

  mgr.signinSilent(config)
      .then((user) =>
      {
        manageGoogleTokenRetrieval(storeAPI,response,user);
        console.log('token expiring got user');
      })
      .catch((error) =>
      {
          console.log('token expiring: ' + error);
         //Work around to handle to Iframe window timeout errors on browsers
          mgr.getUser()
              .then((user) =>
              {
               manageGoogleTokenRetrieval(storeAPI,response,user);
              });
      });

};

const connectRedirect = (connected,mgr,storeAPI)=>{

  if(!connected)
  {
      mgr = ensureValidUserManage(mgr,storeAPI,{ response_mode: "query" });

      //try getting user from manager
      //dispatch action to redux that user loaded if found
      fetchUser(storeAPI,mgr, (dispatcher,message)=>{
        console.log('connectRedirect 1st attempt to fetch user failed ' + message);
        console.log('connectRedirect calling signinRedirectCallback');
        mgr.signinRedirectCallback().then( ()=> {
            console.log('connectRedirect in signinRedirectCallback');

            //try getting user from manager
            //dispatch action to redux that user loaded if found
            fetchUser(dispatcher,mgr, (dispatcher,message)=>{
              console.log('connectRedirect 2nd attempt to fetch user failed ' + message);
              dispatcher.dispatch({type: "AUTH_FAILED"});
            });

            dispatcher.dispatch(push("/"));
       }).catch( (e)=> {
           console.log('connectRedirect Exception signinRedirectCallback' + e);
           dispatcher.dispatch(push("/"));
       });
      });


   }
   else{
     console.log('CONNECT_REDIRECT already connected');
   }

};

const loadUser =(mgr,storeAPI)=>{
  console.log('LOAD_USER reached');

  const ids = storeAPI.getState().ids;
  //if we are not logged in i.e. if we dont have a valid user already
  if(!ids.connected){
    mgr = ensureValidUserManage(mgr,storeAPI);

    fetchUser(storeAPI,mgr,(dispatcher, message)=>{
        console.log(message);
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
              loadUser(mgr,storeAPI);
              break;


            case "SET_USER_EXPIRING":
              console.log('token expiring');
              mgr = ensureValidUserManage(mgr,storeAPI);



              signInSilent(storeAPI,mgr,config);

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
                   console.log('reload with: ' + query.state);
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


            case "CONNECT_REDIRECT":
                  console.log('CONNECT_REDIRECT reached');
                  connectRedirect(connected,mgr,storeAPI);

                return;


            case "SET_USER_SIGNOUT":
                console.log('User signed out');

                break;





        }

        return next(action);
    };
};

export default oidcMiddleware;


import { UserManager, WebStorageStateStore, Log } from "oidc-client";
import { push } from 'react-router-redux';

var retryCount =0;

const userInfoFail = (dispatcher)=>{
  dispatcher.dispatch({
            type: "AUTH_FAILED",
            profileObj :{}
          });
};

const userInfoSuccess = (dispatcher, user)=>{

  const googleFetchInGoing =  dispatcher.getState().ids.googleFetchInGoing;


  dispatcher.dispatch({
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
            expires_at : user.expires_at
          });

          if(!googleFetchInGoing){
            dispatcher.dispatch({
              type: "RETRIEVE_GOOGLE_TOKEN",
            });
          }
};

const fetchUser = (dispatcher, mgr, failed)=>{
  mgr.getUser().then((user) =>{
    if(!user || userExpired(user))
      failed(dispatcher);
    else
      userInfoSuccess(dispatcher,user);
  });
};

const ensureValidUserManage= (userManager,storeAPI, params)=>{

    // event callback when the user has been loaded (on silent renew or redirect)
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

const requestGoogleToken = (dispatcher, google_token_uri,access_token,callback)=>{
  var xhr = new XMLHttpRequest();
  xhr.open("GET", google_token_uri);
  xhr.onload =  () => {
      var resp = JSON.parse(xhr.response);
      console.log('fetched google token with expiration: ' + resp.expires);
      callback(resp);
  }
  xhr.setRequestHeader("Authorization", "Bearer " + access_token);
  xhr.send();
};

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

const signInSilent = (storeAPI, mgr,config)=>{
  mgr.signinSilent(config)
      .then((user) =>
      {
         userInfoSuccess(storeAPI,user);
        //  this.handleUser(user);
          console.log('token expiring got user');
      })
      .catch((error) =>
      {
          console.log('token expiring: ' + error);
         //Work around to handle to Iframe window timeout errors on browsers
          mgr.getUser()
              .then((user) =>
              {
                //  this.handleUser(user);
                userInfoSuccess(storeAPI,user);
              });
      });

};

const notifyGoogleTokenFetchFinished = (storeAPI)=>{
  storeAPI.dispatch({
            type: "FINISHED_GOOGLE_TOKEN_CALL"
          });
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

const oidcMiddleware = (url) => {
    let mgr;

    return storeAPI => next => action => {

        const connected = storeAPI.getState().ids.connected;
        const access_token = storeAPI.getState().ids.access_token;
        const expires_at_desc = storeAPI.getState().ids.expiresAtDesc;
        const expires_at  = storeAPI.getState().ids.expiresAt;

        const google_token_uri = storeAPI.getState().ids.IdServParams.google_token_uri;

        const googleToken = storeAPI.getState().google.googleRawToken;
        const googleFetchInGoing =  storeAPI.getState().ids.googleFetchInGoing;



        switch(action.type) {
            case "GOOGLE_TOKEN_EXPIRED":{
                console.log('google token expired attempting to fetch new one');
                mgr = ensureValidUserManage(mgr,storeAPI);

                mgr.getUser().then(function (user) {
                    if (user) {
                      if(retryCount < 1){
                        console.log('valid user found');
                        console.log('trying to get refreshed google token by signing in to ID Server again!');
                        let config = makeSignInConfig(storeAPI)
                        signInSilent(storeAPI,mgr,config);
                      }
                      retryCount++;
                    }
                    else{
                      console.log('no valid user found so attempt to sign in silently ');

                      let config = makeSignInConfig(storeAPI)
                      signInSilent(storeAPI,mgr,config);
                    }
                  });

                break;
              }

            case "RETRIEVE_GOOGLE_TOKEN" :{

              if(googleToken && !googleTokenExpired(googleToken)){
                console.log('RETRIEVE_GOOGLE_TOKEN: valid token already present');
                notifyGoogleTokenFetchFinished(storeAPI);
                return;
              }

              console.log('RETRIEVE_GOOGLE_TOKEN: ');

              mgr = ensureValidUserManage(mgr,storeAPI);

              mgr.getUser().then(function (user) {
                  if (user && !userExpired(user)) {
                      requestGoogleToken(storeAPI, google_token_uri, access_token, (tokenObj)=>{
                        notifyGoogleTokenFetchFinished(storeAPI);

                        if(googleTokenExpired(tokenObj)){
                          storeAPI.dispatch({
                                    type: "GOOGLE_TOKEN_EXPIRED",
                                    google_token_expired : true,
                                    token :tokenObj
                                });
                        }
                        else {
                          storeAPI.dispatch({
                                    type: "SET_GOOGLE_TOKEN",
                                    token :tokenObj,
                                    google_token_expired : false
                                  });

                          storeAPI.dispatch({
                                    type: "LOAD_AUTH2",
                                    token :tokenObj,
                                    google_token_expired : false
                                });
                              }
                      });
                  }
                  else {
                      console.log(' couldnt get valid user');
                      notifyGoogleTokenFetchFinished(storeAPI);
                  }
              });

              break;
            }

            case "LOAD_USER" : {
              console.log('LOAD_USER reached');

              mgr = ensureValidUserManage(mgr,storeAPI);

              fetchUser(storeAPI,mgr,(dispatcher)=>{
                  console.log('unhandled fetchUser failure');
              });
              break;
            }

            case "SET_USER_EXPIRING":{
              console.log('token expiring');
              mgr = ensureValidUserManage(mgr,storeAPI);

              let config = makeSignInConfig(storeAPI)

              signInSilent(storeAPI,mgr,config);

              return;
            }

            case "IDS_ATTEMPT_CONNECT": {
                console.log('ATTEMPT_CONNECT starting connection attempt');

                mgr = ensureValidUserManage(mgr,storeAPI);

                mgr.signinRedirect();
                return;
            }

            case "DISCONNECT": {
                console.log('DISCONNECT reached');
                let logOutUrl =  window.location.origin;

                mgr = ensureValidUserManage(mgr,storeAPI);

                mgr.getUser().then(function (user) {
                    if (user) {
                        mgr.signoutRedirect({
                          'id_token_hint': user.id_token ,
                          'post_logout_redirect_uri' : logOutUrl,
                          'state' : 'zzzz'
                        }).then(function() {
                          console.log('signoutRedirect 1');
                        })
                        .finally(function() {
                            console.log('signoutRedirect 3');

                        });
                    }
                    else {
                        console.log('couldnt log out because there is no user');
                    }
                });
                return;
            }

            case "CONNECT_REDIRECT": {
                  console.log('CONNECT_REDIRECT reached');

                  if(!connected)
                  {
                      mgr = ensureValidUserManage(mgr,storeAPI,{ response_mode: "query" });

                      //try getting user from manager
                      //dispatch action to redux that user loaded if found
                      fetchUser(storeAPI,mgr, (dispatcher)=>{
                        console.log('CONNECT_REDIRECT user not found');
                        console.log('CONNECT_REDIRECT calling signinRedirectCallback');
                        mgr.signinRedirectCallback().then( ()=> {
                            console.log('CONNECT_REDIRECT in signinRedirectCallback');

                            //try getting user from manager
                            //dispatch action to redux that user loaded if found
                            fetchUser(dispatcher,mgr, (dispatcher)=>{
                              userInfoFail(dispatcher);
                            });

                            dispatcher.dispatch(push("/"));
                       }).catch( (e)=> {
                           console.log('CONNECT_REDIRECT ERROR signinRedirectCallback' + e);
                           dispatcher.dispatch(push("/"));
                       });
                      });


                   }
                   else{
                     console.log('CONNECT_REDIRECT already connected');
                   }
                return;
            }

            case "SET_USER_SIGNOUT": {
                console.log('User signed out');

                break;
              }




        }

        return next(action);
    };
};

export default oidcMiddleware;

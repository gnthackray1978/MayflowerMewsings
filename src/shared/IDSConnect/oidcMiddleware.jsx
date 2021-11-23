
import { UserManager, WebStorageStateStore, Log } from "oidc-client";
import {evtAccessTokenExpired, evtAccessTokenExpiring,evtOnUserSignedOut,
  evtOnUserUnloaded,evtOnSilentRenewError,evtOnUserLoaded} from './idsActions.jsx';

  import {formatDate, getCurrentTime,userExpired,makeLoginDetailAction,
    RS,validateUser,loginLib,ensureValidUserManage,fetchUser,connectRedirect,loadUser} from '../oidcFuncLib.jsx';

//import { push } from 'react-router-redux';

var retryCount =0;






const signInSilent = async (storeAPI, mgr, success)=>{


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


  let config = makeSignInConfig(storeAPI);

  let validationResult;

  let user = null;
  let tokenResult = null;

  return new Promise(async (resolve, reject) => {

    let loginAttemptCounter = localStorage.getItem("loginAttemptCounter");



    if(loginAttemptCounter > 2){
      //console.log('signinsilent login attempt cutoff reached: ' +loginAttemptCounter );
      resolve({type: RS.TOOMANYATTEMPTS, message : 'attempted signin limit reached'});
      return; // let's not try this anymore it's clearly not working.
    }

    loginAttemptCounter++;

    localStorage.setItem("loginAttemptCounter",loginAttemptCounter);
    //console.log('signinSilent: '+loginAttemptCounter);
    user = await mgr.signinSilent(config)
        .catch(async (error) =>
        {
            //console.log('sign in silent failed reattempting: ' + error);
           //Work around to handle to Iframe window timeout errors on browsers
            user = await mgr.getUser().catch(async (error) =>
            {
              //console.log('sign in silent get user error: ' + error);
              resolve({type: RS.USERUNDEFINED ,message : 'sign in silent resulted in no valid user'});
            });

            if(user){
              //console.log('sign in silent 2nd attempt seems to have been a success');

              resolve({type: RS.USERVALID ,user: user, message : 'sign in silent 2nd attempt seems to have been a success'});
            }
            else{
              //console.log('sign in silent 2nd attempt failed');
            }
        });
        //console.log('signinSilent finished 2');
        if(user)
        {
          resolve({type: RS.USERVALID ,user: user, message : 'sign in silent 1st attempt seems to have been a success'});
        }
        else{
          resolve({type: RS.USERUNDEFINED ,message : 'sign in silent resulted in no valid user'});
        }

  });
};



const oidcMiddleware =  (url) => {
    let mgr;

    return storeAPI => next => async (action) => {

        const connected = storeAPI.getState().ids.connected;
        const ids = storeAPI.getState().ids;
        const googleRawToken =  storeAPI.getState().google.googleRawToken;
      
        const expirationHandled = storeAPI.getState().ids.expirationHandled;
       
        const config = {
          authority: ids.IdServParams.authority,
          client_id: ids.IdServParams.client_id,
          redirect_uri: ids.IdServParams.redirect_uri,
          response_type: ids.IdServParams.response_type,
          scope:ids.IdServParams.scope,
          post_logout_redirect_uri: window.location.origin ,
          loadUserInfo:ids.IdServParams.loadUserInfo,
          IsExternalLoginOnly :ids.IdServParams.loadUserInfo,
          silent_redirect_uri : ids.IdServParams.silent_redirect_uri,
          automaticSilentRenew  : ids.IdServParams.automaticSilentRenew
        };

        let tokenResult = undefined;
        let signInResult = undefined; //fix compiler errors

        switch(action.type) {
            case "IDS_ATTEMPT_CONNECT":
                //console.log('ATTEMPT_CONNECT starting connection attempt');

          
                // we aren't already logged in and
                // in the middle of an existing auto login
                if(!ids.connected){

                  mgr = new UserManager(config);

                  mgr.signinRedirect();
                }

                return;

            //called by IDSConnect     componentdidmount
            //called by loginRedirect in IDSRedirect componentdidmount
            case "PAGE_LOAD":
             //  console.log('reload');
               const query = action.payload;

               //if we're connected already we shouldn't
               //need to do anything
               if(connected){
                //console.log('reload no action required already connected');
                break;
               }

               if(query.code){
                
                 console.log('reload with: ' + query.code);

  

                 if(sessionStorage.getItem("googleFetchOnGoing") === true)
                   break;

                 let connectRedirectResult = await connectRedirect(mgr,ids.IdServParams);

                 if(connectRedirectResult.type == RS.USERVALID){
                
                  sessionStorage.setItem("googleFetchOnGoing", true);

                   tokenResult = await manageGoogleTokenRetrieval(
                      connectRedirectResult.user,ids.IdServParams,googleRawToken);

                   sessionStorage.setItem("googleFetchOnGoing", false); 

                
                   if(tokenResult.type == RS.TOKENVALID || tokenResult.type == RS.FETCHEDVALID){
                     storeAPI.dispatch(makeLoginDetailAction(connectRedirectResult.user, tokenResult.user));
                   }
                 }
                 else{
                    storeAPI.dispatch({type: "AUTH_FAILED"});
     
                 }

               }
               else{
                 if(query.state){
                
                    storeAPI.dispatch({
                             type: "SET_USER_LOGOUT"
                           });

              //     storeAPI.dispatch(push("/"));
                 }else{
                   //console.log('PAGE_LOAD Nothing in query string assumed page has been reloaded somehow');
                   localStorage.setItem("loginAttemptCounter",0);
                                     
                   var lu = loadUser(mgr,ids,googleRawToken)
                   .then(value => { console.log('test: ' +value) })
                   .catch(err => { console.log(err) });
                   
            
                   storeAPI.dispatch(lu);
                 }


               }

               break;

            case "DISCONNECT":
                //console.log('=DISCONNECT action reached in middleware=');
                //console.log('=Attempting to log out');

                let logOutUrl =  window.location.origin;

                mgr = ensureValidUserManage(mgr,storeAPI.getState().ids.IdServParams);

                mgr.getUser().then(function (user) {
                    if (user) {
                        mgr.signoutRedirect({
                          'id_token_hint': user.id_token ,
                          'post_logout_redirect_uri' : logOutUrl,
                          'state' : 'zzzz'
                        }).then(function() {
                          //console.log('=signoutRedirect 1');
                        })
                        .finally(function() {
                            //console.log('=signoutRedirect 3');

                        });
                    }
                    else {
                        //console.log('=couldnt log out because there is no user');
                    }
                });
                return;

            case "AccessTokenExpired":
                //console.log('AccessTokenExpired - calling signInSilent');

                if(expirationHandled)
                  break;

                storeAPI.dispatch({type: 'expirationHandled'});

                mgr = ensureValidUserManage(mgr,storeAPI.getState().ids.IdServParams);

                signInResult = await signInSilent(storeAPI,mgr);

                if(signInResult.type == RS.USERVALID){
                  tokenResult = await manageGoogleTokenRetrieval( 
                    signInResult.user,
                    storeAPI.getState().ids.IdServParams,
                    storeAPI.getState().google.googleRawToken);
                  if(tokenResult.type == RS.TOKENVALID ||
                        tokenResult.type == RS.FETCHEDVALID){
                          storeAPI.dispatch(makeLoginDetailAction(signInResult.user, tokenResult.googleToken));
                        }
                }



                break;

        }

        return next(action);
    };
};

export default oidcMiddleware;

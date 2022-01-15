const queryString = require('query-string');


import { UserManager, WebStorageStateStore, Log } from "oidc-client";


export const formatDate = (current_datetime,isUtc)=>{
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

export const getCurrentTime = function(utc){
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

export const userExpired = (user)=>{
let jsUserExpiresAt = new Date(user.expires_at *1000);

let now = getCurrentTime();

if(jsUserExpiresAt > now){
  //console.log('IDS user token NOT expired - expires at: '   +  user.expires_at + ' ' + formatDate(jsUserExpiresAt)  + ' now ' +  formatDate(now));
  return false;
}

//console.log('IDS user token expired - expired at: ' +  user.expires_at + ' ' + formatDate(jsUserExpiresAt) + ' now ' + formatDate(now));
return true;
};


export const makeLoginDetailAction = (user, googleToken)=>{
 // console.log('makeLoginDetailAction:'+ user + ' ' + googleToken);

  let actionObj = {
            type: "SET_USERINFO_SUCCESS",
            profileObj :{
              name : user.profile.name,
              email :user.profile.email,
              givenName : user.profile.given_name,
              familyName : user.profile.family_name,
              userName : 'not retrieved',
              imageUrl : user.profile.picture
            },
            access_token : user.access_token,
            expires_at : user.expires_at,
            googleToken : googleToken.value,
            googleObj :{
              userId: googleToken.userId, 
              expires: googleToken.expires,
              id: googleToken.id,
              imageUrl: googleToken.imageUrl,
              issued: googleToken.issued,
              locale: googleToken.locale,
              name: googleToken.name,
              provider: googleToken.provider,
              refresh: googleToken.refresh,
              type: googleToken.type, 
              value: googleToken.value
            }
          };

  return actionObj;
};

//Retrieval States
export const RS = {
  TOKENVALID: 'existing token valid',
  SIGNINFAILED : 'signinRedirectCallback errored ',
  FETCHEDEXPIRED: 'fetched expired token',
  FETCHEDVALID: 'fetched valid token',
  USERLOOKUPFAILED: 'user lookup failed',
  USEREXPIRED : 'user expired',
  USERUNDEFINED : 'user undefined',
  USERVALID : 'valid user',
  APIERROR : 'api error',
  TOOMANYATTEMPTS : 'too many attempts'
};


export const manageGoogleTokenRetrieval = async (user, idServParams) => {
  
  const {googleToken} = makeStateFromSession();

  const  google_token_uri = idServParams.google_token_uri;

   const retrieveGoogleToken =  (google_token_uri,access_token,googleToken)=>{

   const googleTokenExpired = (token)=>{

       if(!token){
         throw "invalid token received";
       }

       let expirationDate = new Date(token.expires);

       let now = getCurrentTime(true);


       if(expirationDate > now){
         //console.log('google token NOT expired - date: ' + formatDate(expirationDate,true) + ' now ' + formatDate(now,true));
         return false;
       }

       //console.log('google token expired - date: ' + formatDate(expirationDate,true) + ' now ' + formatDate(now,true));
       return true;
     };

   const getTokenFromAPI = (google_token_uri,access_token)=>{
       //  var url = 'https://msgauth01.azurewebsites.net/token/test';
       return new Promise((resolve, reject) => {
         //console.log('--getTokenFromAPI--');
         var xhr = new XMLHttpRequest();
         xhr.open("GET", google_token_uri);
         xhr.onload = () => {
             //console.log('--Fetched google token');
             if (xhr.status >= 200 && xhr.status < 300)
                 resolve(JSON.parse(xhr.response));
              else
                 reject(xhr.statusText);
         }
         xhr.setRequestHeader("Authorization", "Bearer " + access_token);
         xhr.send();
       });

     };

   //console.log('**Retrieve Google Token**');


   return new Promise(async (res, rej) => {
       // we already have a valid token and it hasn't expired.
       // so dont set anything
       if(googleToken && !googleTokenExpired(googleToken)){
         //console.log('**Existing Token Valid No call to API made');
         res({type: RS.TOKENVALID,  googleToken :googleToken});
       }

       // we assume that user is valid and has not expired
       let tokenObj = await getTokenFromAPI(google_token_uri, access_token).catch((e)=>{
         //console.log(e);
         res({type: RS.APIERROR,  message :e});
       });

       if(tokenObj){
         if(googleTokenExpired(tokenObj)){
           res({type : RS.FETCHEDEXPIRED, googleToken :undefined});
         }
         else{
           res({type : RS.FETCHEDVALID, googleToken :tokenObj});
         }
       };


     });

 };



 let mgr;

 ensureValidUserManage(mgr,idServParams);

 let validationResult = validateUser(user);//

 validationResult.user = user;

 return new Promise(async (resolve, reject) => {

   if(validationResult.type != RS.USERVALID){
     //console.log('sign in silent user validation failed ' + validationResult.message);
     resolve(validationResult);
     return;
   }
 
   let tokenResult = await retrieveGoogleToken(google_token_uri,user.access_token,googleToken);

   resolve(tokenResult);
 });
};



export const validateUser = (user)=>{
  if(!user || userExpired(user))
  {
    if(!user)
      return { type: RS.USERUNDEFINED, message : 'Could not find logged in user. getUser returned undefined' };
    else{
      return { type: RS.USEREXPIRED, message : 'No valid user. User expired' };
    }
  }
  else{

    return { type: RS.USERVALID, message : 'IDS user appears logged in OK. Attempting to get google token.' };
  }
};

//rename  this later
export const loginLib = (config,connected)=>{

  var userManager = new UserManager(config);
  console.log('login');
 
  userManager.getUser().then((user)=>{
    if(user){
      
      let tp = userExpired(user);

      if(tp)
      {
        userManager.signinRedirect();
      } 
      else{
        console.log('already connected');
        connected();
      }

    }
    else{

      userManager.signinRedirect();
    }



  });


}

export const logoutLib = (idServParams)=>{

  let logOutUrl =  window.location.origin;
  
  let mgr;

  mgr = ensureValidUserManage(mgr,idServParams);
 
   
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

  sessionStorage.setItem("loginDetail", 'user logged out'); 

}



export const ensureValidUserManage= (userManager,idServParams, params)=>{

  // event callback when the user has been loaded (on silent renew or redirect)

  //onUserLoaded evtOnUserLoaded
  let onUserLoaded = (user) => {
    ////console.log('> user found');
    //console.log('> user loaded');
 

  };

  // event callback when silent renew errored
  // onSilentRenewError evtOnSilentRenewError
  let onSilentRenewError = (error) => {
    //console.log('> silent renew error');
 
  };

  // event callback when the access token expired
  //onAccessTokenExpired evtAccessTokenExpired
  let onAccessTokenExpired = () => {
    //console.log('> access token expired');
 
  };

  // event callback when the user is logged out
  //onUserUnloaded evtOnUserUnloaded
  let onUserUnloaded = () => {
    //console.log('> user loaded');
  
  };

  // event callback when the user is expiring
  //onAccessTokenExpiring evtAccessTokenExpiring
  let onAccessTokenExpiring = () => {
    //console.log('> user expiring');
    
  }

  // event callback when the user is signed out
  //onUserSignedOut evtOnUserSignedOut
  let onUserSignedOut = () => {
    //console.log('> user signed out');
  
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
  // if(params){
  //   if(userManager)
  //     unsetEvents(userManager);

  //   userManager = new UserManager(params);
  //   setEvents(userManager);
  //   return userManager;
  // }

  if(userManager)
    return userManager;

 
  var config = {
      authority: idServParams.authority,
      client_id: idServParams.client_id,
      redirect_uri: idServParams.redirect_uri,
      response_type: idServParams.response_type,
      scope:idServParams.scope,
      post_logout_redirect_uri: window.location.origin ,
      loadUserInfo:idServParams.loadUserInfo,
      IsExternalLoginOnly :idServParams.loadUserInfo,
      silent_redirect_uri : idServParams.silent_redirect_uri,
      automaticSilentRenew  : idServParams.automaticSilentRenew
  };


  if(!userManager){
    userManager = new UserManager(config);
    setEvents(userManager);
  }

  return userManager;
}


export const fetchUser = (mgr)=>{
  
  return new Promise((resolve, reject) => {
    mgr.getUser().then((user)=>{
      let result = validateUser(user);
      result.message = result.message;
      result.user = user;
      resolve(result);
    });
  }).catch((e)=>{
    resolve({ status: 'failure', message : e });
  });
 
};


export const connectRedirect = async (mgr,idServParams)=>{

  //try getting user from manager
  console.log('connectRedirect');
  
     mgr = ensureValidUserManage(mgr,idServParams,{ response_mode: "query" });
 
   
     let userResult = await fetchUser(mgr);
 
 
     return new Promise(async (resolve, reject) => {
       if(userResult.type == RS.USERVALID)
       {
         console.log('connect Redirect success 1 ' + userResult.message);
       //  localStorage.setItem("loginAttemptCounter", "0");
         resolve(userResult);
       }
       else
       {
          //console.log('connect Redirect fetch user couldnt find user with error:' + userResult.message);
          console.log('connect Redirect calling signinredirect');
 
          let signInResult = await mgr.signinRedirectCallback().catch((e)=> {
          console.log('Exception connect Redirect signinRedirectCallback' + e);
           //   storeAPI.dispatch({type: "AUTH_FAILED"});
           //   storeAPI.dispatch(push("/"));
              resolve({type:RS.SIGNINFAILED, message :'Exception connect Redirect signinRedirectCallback' + e });
          });
 
          if(signInResult){
            console.log('connect Redirect in signinRedirectCallback calling fetchuser to check we have logged in');
 
            userResult = await fetchUser(mgr);
 
            resolve(userResult);
           //  if(userResult.type == RS.USERVALID){
           // //   localStorage.setItem("loginAttemptCounter", "0");
           // //   //console.log('connect Redirect success 2 ' + userResult.message);
           //
           //   resolve(userResult);
           //  }
           //  else{
           //    //console.log('connect Redirect failure 2 ' + userResult.message);
           //    storeAPI.dispatch({type: "AUTH_FAILED"});
           //  }
 
         //   storeAPI.dispatch(push("/"));
          }
       };
     });
 
 
 
 
 };
 
 export const loadUser = async (mgr,ids,googleRawToken)=>{
   //console.log('loadUser reached');
  
    var idServParams = ids;
   
 
   //if we are not logged in i.e. if we dont have a valid user already
   
     localStorage.setItem("loginAttemptCounter", "0");
 
     mgr = ensureValidUserManage(mgr,idServParams);
 
     let signInResult = await fetchUser(mgr);
 
     if(signInResult.type == RS.USERVALID){
 
     //  storeAPI.dispatch({ type: "RETRIEVE_GOOGLE_TOKEN"});
       sessionStorage.setItem("googleFetchOnGoing", true);
 
       let tokenResult = await manageGoogleTokenRetrieval(signInResult.user,idServParams,googleRawToken);
       //storeAPI.dispatch({ type: "FINISHED_GOOGLE_FETCH"});
       sessionStorage.setItem("googleFetchOnGoing", false);
 
       if(tokenResult.type == RS.TOKENVALID || tokenResult.type == RS.FETCHEDVALID){
         return makeLoginDetailAction(signInResult.user, tokenResult.googleToken);        
       }
       else {
         //console.log('loadUser couldnt get google token :' + tokenResult.message);
       }
     }
     else{
       //console.log('loadUser couldnt get user :' + signInResult.message);
     }
   
 
   return;
 }
 


 export const redirectHandler = async (ids)=>{

  var mgr = new UserManager(ids);
  var query = queryString.parse(window.location.search);

  //  let mgr = ensureValidUserManage(mgr,ids,params);
  const {googleToken,Connected} = makeStateFromSession();
  
  //if query string has state in it then we've logged out and reloaded the page.
  //doesn't matter if we're connected or not.
  if(query.state && !query.code){
    
    sessionStorage.setItem("loginDetail", 'user logged out');  
    // This will replace the current entry in the browser's history, without reloading
    var uri = window.location.toString();
    if (uri.indexOf("?") > 0) {
        var clean_uri = uri.substring(0, uri.indexOf("?"));
        window.history.replaceState({}, document.title, clean_uri);
    } 

    return false;
  }

  // we have valid google oidc tokens and they haven't expired.
  // so we don't need to do anything.
  if(Connected && query.code){
    //ensure that the query string is empty.
    var uri = window.location.toString();
    if (uri.indexOf("?") > 0) {
        var clean_uri = uri.substring(0, uri.indexOf("?"));
        window.history.replaceState({}, document.title, clean_uri);
    } 

    return;
  }
  
    // we have a code in the query string and we're not connected
    // so attempt to login and then get google token.
    if(query.code && !Connected){
    
      //console.log('reload with: ' + query.code);

      if(sessionStorage.getItem("googleFetchOnGoing") === true)
        return false;

      let connectRedirectResult = await connectRedirect(mgr,ids);

      if(connectRedirectResult.type == RS.USERVALID){
    
          sessionStorage.setItem("googleFetchOnGoing", true);

          let tokenResult = await manageGoogleTokenRetrieval(
            connectRedirectResult.user,ids,googleToken);

          sessionStorage.setItem("googleFetchOnGoing", false); 

      
          if(tokenResult.type == RS.TOKENVALID || tokenResult.type == RS.FETCHEDVALID){
            var loginDetail = makeLoginDetailAction(connectRedirectResult.user, tokenResult.googleToken);
            
            var loginDetailStr = JSON.stringify(loginDetail);

            sessionStorage.setItem("loginDetail", loginDetailStr); 

            var uri = window.location.toString();
            if (uri.indexOf("?") > 0) {
                var clean_uri = uri.substring(0, uri.indexOf("?"));
                window.history.replaceState({}, document.title, clean_uri);
            } 
    
          }
          
          //indicates we're connected which we should be!
          return true;
      }
      else{
        
        sessionStorage.setItem("loginDetail", 'login failed'); 
        return false;

      } 
    }


   // so we have no query code and we're not connected.
   // for example if the site has just been loaded
   // and no one has logged in.
   // or 
   // if tokens have expired.

   // the oidc token can sometimes be expired and the google token not expired
   // loading the user in this situation will cause the program 
   // to attempt to get a new google token.

   
   var result = await loadUser(mgr,ids,googleToken)
      .then(value => { 

        if(value){
          var loginDetailStr = JSON.stringify(value);
        //  console.log('set logindetail to session in redirecthandler ');

          sessionStorage.setItem("loginDetail", loginDetailStr); 
          return true;
        }else{
        //  console.log('no user could be loaded');
          return false;
        }
      })
      .catch(err => { 
        console.log(err) 
        return false;
      });
      
  //  console.log('returning');
    return result;

 };



 export const makeStateFromSession = ()=>{


  const googleTokenExpired = (token)=>{

    if(!token){
      throw "invalid token received";
    }

    let expirationDate = new Date(token.expires);

    let now = getCurrentTime(true);


    if(expirationDate > now){
      //console.log('google token NOT expired - date: ' + formatDate(expirationDate,true) + ' now ' + formatDate(now,true));
      return false;
    }

   // console.log('google token expired - date: ' + formatDate(expirationDate,true) + ' now ' + formatDate(now,true));
    return true;
  };


  //todo add something which gets the access_token and google token
  //checks they haven't expire
  //if not then return connected = true
  var sessionState = sessionStorage.getItem("loginDetail"); 

  var loginState; 
  
  if(sessionState && sessionState!= 'undefined'
                  && sessionState != 'login failed'
                  && sessionState != 'user logged out')
    loginState = JSON.parse(sessionState);

  let connected =false;
  let profileObj;
  let access_token;
  let expires_at;
  let googleToken;
  let googleObj;
  if(loginState){
    
    profileObj = loginState.profileObj;
    access_token = loginState.access_token,
    expires_at = loginState.expires_at,
    googleToken = loginState.googleToken,
    googleObj = loginState.googleObj
  }

  let isImageButton = false;
  let isFabButton =false;


  if(loginState && loginState.profileObj){
    if(loginState.profileObj.imageUrl!= '')
      isImageButton = true;
    else{
      if(loginState.profileObj.name!= '')
        isFabButton = true;
    }
  }

  let profileObjName ='';
  let imageUrl ='';

  let validGoogleToken = false;
  if(googleObj && !googleTokenExpired(googleObj)){
    validGoogleToken = true;
  }

  let validAccessToken = false;

  let jsUserExpiresAt = new Date();

  if(expires_at)
   jsUserExpiresAt = new Date(expires_at *1000);

  let now = getCurrentTime();

  if(jsUserExpiresAt > now){
    //console.log('IDS user token NOT expired - expires at: '   + expires_at + ' ' + formatDate(jsUserExpiresAt)  + ' now ' +  formatDate(now));
    validAccessToken = true;
  }

  if(validAccessToken && validGoogleToken){
    connected = true;
  }

  if(loginState && loginState.profileObj && loginState.profileObj.name)
    profileObjName = loginState.profileObj.name.charAt();

  if(loginState && loginState.profileObj)
    imageUrl = loginState.profileObj.imageUrl;


  let googleTokenExpiration = Date();

  if(googleObj)
    googleTokenExpiration =  new Date(googleObj.expires);

  var sessionState = {
    profileObjName,
    imageUrl,
    ProfileObj : profileObj,
    Connected : connected,
    isImageButton : isImageButton,
    isFabButton : isFabButton,
     access_token,
     expires_at,
     googleToken,
     googleObj : googleObj,
     GoogleConnected : validGoogleToken,
     IDSConnected : validAccessToken,
     googleTokenExpiration : googleTokenExpiration,
     idsTokenExpiration : jsUserExpiresAt
  };

 // console.log('returning state : ' + sessionState.Connected + ' ' + access_token + ' ' + googleToken);

  return sessionState;
};
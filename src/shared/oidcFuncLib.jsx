
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
            token : googleToken
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
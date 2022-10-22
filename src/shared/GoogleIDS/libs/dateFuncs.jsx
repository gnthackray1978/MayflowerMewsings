const queryString = require('query-string');


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
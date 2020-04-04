
export default (state = {

  profileObj : {},

  IdServParams :{
    authority: "http://localhost:5000",
    client_id: "js",
    redirect_uri: "http://localhost:1234",
    response_type: "code",
    scope:"openid profile api1",
    post_logout_redirect_uri: "http://localhost:1234",
    loadUserInfo: true,
    IsExternalLoginOnly :true,
    silent_redirect_uri: 'http://localhost:1234/redirect',
    automaticSilentRenew: true,
    google_token_uri :'http://localhost:5000/token'
  //  AllowOfflineAccess : true,
  },
  connected :false,
  infoloaded :false,
  googleToken :undefined,
  expiring :false,
  expired :false,
  silentRenewError : '',
  access_token : undefined,
  expiresAt : undefined,
  expiresAtDesc : undefined,
  googleFetchInGoing : false
}, action) => {

  switch (action.type) {

    case "SET_USER_FOUND":
      return {
        ...state
      };

    case "SET_SILENT_RENEW_ERROR":
      return {
        ...state,
        silentRenewError : action.error
      };

//silentRenewError
    case "SET_ACCESS_TOKEN_EXPIRED":
      return {
        ...state,
        connected :false,
        expiring :false,
        expired :true
      };

    case "SET_USER_LOADED":
      return {
        ...state,
        connected :true,
        expiring :false,
        expired :false
      };

    case "SET_USER_EXPIRING":
      return {
        ...state,
        expiring :true
      };

    case "SET_USER_SIGNOUT":
      return {
        ...state,
        connected : false,
        infoloaded :false,
        googleToken :undefined
      };

      case "CONNECT_REDIRECT":
        return {
          ...state,
        //  connected : action.connected,
        };

        case "SET_CONNECTED":
          return {
            ...state,
            connected : action.connected,
          };

      case "SET_USERINFO_SUCCESS":

        let expires = new Date('1970-01-01T00:00:00Z');

        expires.setSeconds( expires.getSeconds() + action.expires_at);

        return {
          ...state,
          infoloaded : true,
          connected : true,
          profileObj : action.profileObj,
          access_token : action.access_token,
          expiring :false,
          expired :false,
          expiresAt :action.expires_at,
          expiresAtDesc : expires.toString()
        };

      case "AUTH_FAILED":
        return {
          ...state,
          infoloaded : false,
          connected : false
        };

      case "SET_USERINFO_LOGOUT":
        return {
          ...state,
          infoloaded : false,
          connected : false

        };

        case "RETRIEVE_GOOGLE_TOKEN":
          return {
            ...state,
             googleFetchInGoing :true
          };

        case "FINISHED_GOOGLE_TOKEN_CALL":
          return {
            ...state,
             googleFetchInGoing :false
          };


      // case "SET_GOOGLE_TOKEN":
      //   return {
      //       ...state,
      //       googleToken : action.token
      //   };

      default:
          return state;

    }
};

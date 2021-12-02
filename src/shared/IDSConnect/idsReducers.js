
export default (state = {

  IdServParams :{
    authority: "https://msgauth01.azurewebsites.net",
    client_id: "js",
    redirect_uri: "http://localhost:1234",
    response_type: "code",
    scope:"openid profile api1",
    post_logout_redirect_uri: "http://localhost:1234",
    loadUserInfo: true,
    IsExternalLoginOnly :true,
    silent_redirect_uri: 'http://localhost:1234',
    automaticSilentRenew: true,
    google_token_uri :'https://msgauth01.azurewebsites.net/token'

  },

  infoloaded :false,
  IdsLogInDetailsVisible :false
}, action) => {


  switch (action.type) {

    case "SET_IDSLOGINLOADVISIBLE":
      //console.log('reducer SET_IDSLOGINLOADVISIBLE');
      return {
        ...state,
        IdsLogInDetailsVisible : action.payload,
      };


      default:
          return state;

    }
};

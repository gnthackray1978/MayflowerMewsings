import {settings} from '../../common.js';

export default (state = {

  IdServParams :settings.IdServParams,
  GNTServParams :settings.GNTServParams,
  infoloaded :false,
  IdsLogInDetailsVisible :false,
  tokenExpiresAt : undefined
}, action) => {


  switch (action.type) {

    case "SET_IDSLOGINLOADVISIBLE":
      //console.log('reducer SET_IDSLOGINLOADVISIBLE');
      return {
        ...state,
        IdsLogInDetailsVisible : action.payload,
      };

    case "SET_TOKENEXPIRATION":
      //console.log('reducer SET_TOKENEXPIRATION');
    
      if(state.tokenExpiresAt != action.payload){
        return {
            ...state,  
            tokenExpiresAt : action.payload
        };
      }
      else{
        return {
          ...state
        };
      };

      default:
          return state;
  }
};

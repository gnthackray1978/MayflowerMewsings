
export const setIdsLoginScreenVisible = (isVisible) =>{
  return async (dispatch, getState)  => {
      dispatch({
        type: "SET_IDSLOGINLOADVISIBLE",
        payload : isVisible
      });
    }
};

export const setTokenExpiration = (time) =>{
  return async (dispatch, getState)  => {
      dispatch({
        type: "SET_TOKENEXPIRATION",
        payload : time
      });
    }
};
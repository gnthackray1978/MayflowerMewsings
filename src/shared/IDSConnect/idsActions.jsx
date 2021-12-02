
//
export const setIdsLoginScreenVisible = (isVisible) =>{
  return async (dispatch, getState)  => {
      dispatch({
        type: "SET_IDSLOGINLOADVISIBLE",
        payload : isVisible
      });
    }
};

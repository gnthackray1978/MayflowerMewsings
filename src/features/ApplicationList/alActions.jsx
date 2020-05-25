export const userLogsIn = () =>{
  return async (dispatch, getState)  => {
      dispatch({
        type: "IDS_ATTEMPT_CONNECT"
      });
    }
};

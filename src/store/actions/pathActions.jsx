import { push } from 'react-router-redux';


export const setPath = () =>{
  return async (dispatch, getState)  => {
      dispatch(push("/"));
    }
};

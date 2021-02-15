
import { APPLICATIONLISTLOADED, APPLICATIONSELECTED} from './actionTypes.jsx';


export const applicationListLoad = (state) =>{
  console.log('applicationListLoaded action');


  return async (dispatch, getState)  => {
       dispatch({
         type: APPLICATIONLISTLOADED,
         payload : state
       });
    }


};


export const applicationSelected = (state) =>{
  console.log('applicationSelected action');


  return async (dispatch, getState)  => {
       dispatch({
         type: APPLICATIONSELECTED,
         payload : state
       });
    }


};


import {APPLICATIONLISTLOADED, APPLICATIONLISTLOADING} from './actionTypes.jsx';


export const applicationListLoad = (state) =>{
  console.log('applicationListLoaded action');


  return async (dispatch, getState)  => {
       dispatch({
         type: APPLICATIONLISTLOADED,
       });
    }


};

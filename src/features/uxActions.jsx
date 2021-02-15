
import { APPLICATIONLISTLOADED, APPLICATIONSELECTED, APPDIALOGOPEN ,APPDIALOGCLOSED} from './actionTypes.jsx';


export const applicationListLoad = (state) =>{
  //console.log('applicationListLoaded action');


  return async (dispatch, getState)  => {
       dispatch({
         type: APPLICATIONLISTLOADED,
         payload : state
       });
    }


};

export const applicationSelected = (state) =>{
  //console.log('applicationSelected action');


  return async (dispatch, getState)  => {
       dispatch({
         type: APPLICATIONSELECTED,
         payload : state
       });
    }


};

export const siteDialogOpen = (state) =>{
  //console.log('siteDialogOpen action');

  return async (dispatch, getState)  => {
       dispatch({
         type: APPDIALOGOPEN,
         showAppListDialog : true
       });
    }
};

export const siteDialogClose = (state) =>{
  //console.log('siteDialogClose action');

  return async (dispatch, getState)  => {
       dispatch({
         type: APPDIALOGCLOSED,
         showAppListDialog : false
       });
    }
};

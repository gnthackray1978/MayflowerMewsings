import { METADATALOADED, APPLICATIONSELECTED,
  FUNCTIONSELECTED, APPDIALOGOPEN ,APPDIALOGCLOSED,FUNCDIALOGOPEN,
  FUNCDIALOGCLOSED, TREESELECTED ,TREEPERSONSELECTED,DIAGRAMSELECTED,
  TREESELECTORDIALOGOPEN,TREESELECTORDIALOGCLOSED,
  DISPLAYDIAGRAMCONTROLS,HIDEDIAGRAMCONTROLS, TOGGLEDIAGRAMCONTROLS} from './actionTypes.jsx';
 

export const setTreePerson = (state) =>{
  //console.log('applicationSelected action');

    return async (dispatch, getState)  => {
        dispatch({
          type: TREEPERSONSELECTED,
          payload : state
        });
      }    
};

export const setTree = (state) =>{
  //

    return async (dispatch, getState)  => {
//        console.log('applicationSelected action');  /
      var tp = getState();

      if(tp.ux.selectedTreeData.originDescription != state.originDescription 
        || tp.ux.selectedTreeData.origin != state.origin)
      {
        dispatch({
          type: TREESELECTED,
          payload : state
        });
      }
    }
  
};

export const setDiagram = (state) =>{
  //console.log('applicationSelected action');
  return async (dispatch, getState)  => {
        dispatch({
          type: DIAGRAMSELECTED,
          payload : state
        });
    }
};

export const funcSelected = (state) =>{
  //console.log('applicationSelected action');
  return async (dispatch, getState)  => {
       dispatch({
         type: FUNCTIONSELECTED,
         payload : state
       });
    }
};

export const metaDataLoaded = (state) =>{
  //console.log('applicationListLoaded action');
  return async (dispatch, getState)  => {
       dispatch({
         type: METADATALOADED,
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

export const siteDialogOpen = () =>{
  //console.log('siteDialogOpen action');

  return async (dispatch, getState)  => {
       dispatch({
         type: APPDIALOGOPEN
       });
    }
};

export const siteDialogClose = () =>{
  //console.log('siteDialogClose action');

  return async (dispatch, getState)  => {
       dispatch({
         type: APPDIALOGCLOSED
       });
    }
};

export const funcDialogOpen = () =>{
  //console.log('siteDialogOpen action');

  return async (dispatch, getState)  => {
       dispatch({
         type: FUNCDIALOGOPEN
       });
    }
};

export const funcDialogClose = () =>{
  //console.log('siteDialogClose action');

  return async (dispatch, getState)  => {
       dispatch({
         type: FUNCDIALOGCLOSED
       });
    }
};

export const treeSelectorDialogOpen = () =>{
  //console.log('siteDialogOpen action');

  return async (dispatch, getState)  => {
       dispatch({
         type: TREESELECTORDIALOGOPEN
       });
    }
};

export const treeSelectorDialogClose = () =>{
  //console.log('siteDialogClose action');

  return async (dispatch, getState)  => {
       dispatch({
         type: TREESELECTORDIALOGCLOSED
       });
    }
};
 
export const toggleDiagramControls = () =>{
  //console.log('siteDialogClose action');

  return async (dispatch, getState)  => {
       dispatch({
         type: TOGGLEDIAGRAMCONTROLS
       });
    }
}; 

export const showDiagramControls = () =>{
  //console.log('siteDialogClose action');

  return async (dispatch, getState)  => {
       dispatch({
         type: DISPLAYDIAGRAMCONTROLS
       });
    }
};

export const hideDiagramControls = () =>{
  //console.log('siteDialogClose action');

  return async (dispatch, getState)  => {
       dispatch({
         type: HIDEDIAGRAMCONTROLS
       });
    }
};


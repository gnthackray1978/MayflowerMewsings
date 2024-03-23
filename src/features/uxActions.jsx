import { METADATALOADED, APPLICATIONSELECTED,
  FUNCTIONSELECTED, APPDIALOGOPEN ,APPDIALOGCLOSED,FUNCDIALOGOPEN,
  FUNCDIALOGCLOSED, TREESELECTED ,TREEPERSONSELECTED,DIAGRAMSELECTED,
  TREESELECTORDIALOGOPEN,TREESELECTORDIALOGCLOSED,
  ADDCACHETREE,
  ADDCACHETREEPERSON,  
  CONTROLPANELTOOLSDIALOGCLOSED,
  CONTROLPANELTOOLSDIALOGOPEN,
  DISPLAYDIAGRAMCONTROLS,HIDEDIAGRAMCONTROLS, TOGGLEDIAGRAMCONTROLS, NEWLOCATIONS, SETTITLE} from './actionTypes.jsx';
 

  
  export const setTitle = (state) =>{
    //console.log('applicationSelected action');
  
      return async (dispatch, getState)  => {
          dispatch({
            type: SETTITLE,
            payload : state
          });
        }    
  };



  export const setLocations = (state) =>{
    //console.log('applicationSelected action');
  
      return async (dispatch, getState)  => {
          dispatch({
            type: NEWLOCATIONS,
            payload : state
          });
        }    
  };

export const addTreePersonToCache = (state) =>{
 // console.log('setTreePerson action');

    return async (dispatch, getState)  => {

        var tp = getState();

        let isFound  = tp.ux.selectedPersonCache.length == 0 ? false : true;
        
        for(var rec of tp.ux.selectedPersonCache){                  
          if(!state.find((r) => r.id == rec.id)){
            isFound = false;
            break;
          }
        }

        if(!isFound){ 
          let newRows =[];
          for(var rec of state){
            newRows.push({
              id : rec.id,
              name : rec.firstName + ' ' + rec.surname              
            });
          }

          dispatch({
            type: ADDCACHETREEPERSON,
            payload : newRows
          });        
        }
      }    
};

export const addTreeToCache = (state) =>{
 // console.log('setTreePerson action');

    return async (dispatch, getState)  => {

        var tp = getState();

        let isFound  =tp.ux.selectedTreeCache.length == 0 ? false : true;
        
        for(var rec of tp.ux.selectedTreeCache){                  
          if(!state.find((r) => r.id == rec.id)){
            isFound = false;
            break;
          }
        }

        if(!isFound){         
          let newRows =[];
          for(var rec of state){
            newRows.push({
              id : rec.id,
              name : rec.name           
            });
          }

          dispatch({
            type: ADDCACHETREE,
            payload : [...tp.ux.selectedTreeCache, ...newRows]
          });
        }
      }    
};

export const setTree = (state) =>{
  // console.log('setTree action');
  return async (dispatch, getState)  => {
    var tp = getState();
    if(tp.ux.selectedTree == state)
      state = '';

    dispatch({
      type: TREESELECTED,
      payload : state
    });
  }
  
};

export const setPerson = (state) =>{
  // console.log('setTree action');
  return async (dispatch, getState)  => {
    var tp = getState();
    if(tp.ux.selectedTreePerson == state )
      state = '';

      dispatch({
        type: TREEPERSONSELECTED,
        payload : state
      });
    
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
 

export const controlPanelDialogOpen = () =>{
  //console.log('siteDialogOpen action');

  return async (dispatch, getState)  => {
       dispatch({
         type: CONTROLPANELTOOLSDIALOGOPEN
       });
    }
};

export const controlPanelDialogClose = () =>{
  //console.log('siteDialogClose action');

  return async (dispatch, getState)  => {
       dispatch({
         type: CONTROLPANELTOOLSDIALOGCLOSED
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


import { APPLICATIONLISTLOADED, APPLICATIONSELECTED, FUNCTIONLISTLOADED,METADATALOADED,
  FUNCTIONSELECTED,APPDIALOGOPEN,APPDIALOGCLOSED,FUNCDIALOGOPEN,FUNCDIALOGCLOSED,
   TREESELECTED ,
   TREEPERSONSELECTED,
   ADDCACHETREE,
   ADDCACHETREEPERSON,
   DIAGRAMSELECTED,
   CONTROLPANELTOOLSDIALOGCLOSED,
   CONTROLPANELTOOLSDIALOGOPEN,
    TREESELECTORDIALOGCLOSED,TREESELECTORDIALOGOPEN,
    DISPLAYDIAGRAMCONTROLS,HIDEDIAGRAMCONTROLS,TOGGLEDIAGRAMCONTROLS, NEWLOCATIONS, SETTITLE, INDEXSTATE} from './actionTypes.jsx';



export default (state = {
  appName :1,
  locations : [],
  ancestorConfig :{
    backgroundcolour : 'white', 
    linecolour : 'black',
    textcolour :'black',
    spousecolour :'slateblue'
  },
  appList : [
      {
        id: 1,
        name: 'Front Page',
        defaultPageName : 'default',
        defaultPageTitle :'Default',
        __typename: 'SiteType'
      }],

  funcName :0,
  funcList : [],

  loadedAppList :false,
  loadedFuncList :false,
  showAppListDialog :false,
  showFuncListDialog :false,
  showTreeSelectorDialog :false,
  showControlPanelDialog :false,
  showDiagramControls : false,
  selectedTree : '93',
  selectedTreePerson : '96',
  selectedTreeCache : [],
  selectedPersonCache : [],
  title : '',
  diagramId : 0,
  error: undefined
}, action) => {


  switch (action.type) {
    case INDEXSTATE:  {
        const { payload } = action;
        // Assuming action.title is a distinct field on the action object itself,
        // as per the original logic's `action.title` access.
        const actionLevelTitle = action.title;

        // Default to current state values. These will be updated if conditions are met.
        let nextAppName = state.appName;
        let nextFuncName = state.funcName;
        let nextTitle = state.title;
        let nextSelectedTree = state.selectedTree;

        // Extract values from payload, assuming payload exists and is an object.
        const payloadAppId = payload?.appId;
        const payloadTitle = payload?.title;
        const payloadSelectedTree = payload?.selectedTree;

        // Update selectedTree based on payload.selectedTree (common logic for all branches)
        if (payloadSelectedTree) {
            nextSelectedTree = payloadSelectedTree;
        }
 

        if (payloadAppId) { // If appId is present in payload
            if (state.appName !== payloadAppId) {
                // App changed
                nextAppName = payloadAppId;
                nextFuncName = 0;
                if (payloadTitle) { // title from payload.title
                    nextTitle = payloadTitle;
                }
            } else {
                // App did not change, but appId was present in payload
                if (actionLevelTitle) { // title from action.title (the distinct part)
                    nextTitle = actionLevelTitle;
                }
            }
        } else { // No appId in payload
            if (payloadTitle) { // title from payload.title
                nextTitle = payloadTitle;
            }
        }

        // Only create a new state object if something actually changed
        if (state.appName !== nextAppName ||
            state.funcName !== nextFuncName ||
            state.title !== nextTitle ||
            state.selectedTree !== nextSelectedTree) {
            return {
                ...state,
                appName: nextAppName,
                funcName: nextFuncName,
                title: nextTitle,
                selectedTree: nextSelectedTree,
            };
        }
        return state; // No changes, return the original state
    }  

      case APPLICATIONSELECTED: 
          // if we have a new app selected
          // then invalidate the func list & selected Function
          // if same app nothing will change
          if(state.appName != action.payload){
            return {
               ...state, 
               funcName : 0,
               appName : action.payload
            };
          }
          else{
            return {
              ...state
            };
          }

    case TREESELECTED:
        //console.log('APPLICATIONSELECTED');
        
        return {
          ...state,
           selectedTree : action.payload
        };

    case SETTITLE:
    {        
        // If the title is the same as the current state, do not update
        if (state.title === action.payload) {
          return state;
        }
        // Otherwise, update the title in the state
        return {
          ...state,
          title : action.payload
        };
    }
    case NEWLOCATIONS:
      return {
        ...state,
        locations : action.payload
      };
    case TOGGLEDIAGRAMCONTROLS:
      return {
        ...state,
        showDiagramControls : !state.showDiagramControls
      }; 
     
    case DISPLAYDIAGRAMCONTROLS:
       //console.log('APPLICATIONSELECTED');
       return {
         ...state,
         showDiagramControls : true
       }; 
    case HIDEDIAGRAMCONTROLS:
        //console.log('APPLICATIONSELECTED');
        return {
          ...state,
          showDiagramControls : false
        };



    case ADDCACHETREE:
        //console.log('ADDCACHETREE');
        return {
          ...state,
          selectedTreeCache : action.payload
        };
        
    case ADDCACHETREEPERSON:
      //console.log('ADDCACHETREEPERSON');
      return {
        ...state,
        selectedPersonCache : action.payload
      };




    case TREEPERSONSELECTED:
      //console.log('APPLICATIONSELECTED');
      return {
        ...state,
          selectedTreePerson : action.payload
      };

    case DIAGRAMSELECTED:
        //console.log('APPLICATIONSELECTED');
        return {
          ...state,
           diagramId : action.payload
        };



    case METADATALOADED:
        //console.log('APPLICATIONLISTLOADED');
        return {
          ...state,
           appList: action.payload.sites,
           funcList: action.payload.funcs,
           appName : action.payload.appId,
           funcName :action.payload.pageId
        };

    case FUNCTIONSELECTED:
        //
        return {
          ...state,
           funcName : action.payload
        };


        case APPDIALOGOPEN:
            //console.log('APPDIALOGOPEN');
            return {
              ...state,
               showAppListDialog : true
            };

        case APPDIALOGCLOSED:
            //console.log('APPDIALOGCLOSED');
            return {
              ...state,
               showAppListDialog : false
            };

        case FUNCDIALOGOPEN:
            //console.log('APPDIALOGOPEN');
            return {
              ...state,
               showFuncListDialog : true
            };

        case FUNCDIALOGCLOSED:
            //console.log('APPDIALOGCLOSED');
            return {
              ...state,
               showFuncListDialog : false
            };       
        case TREESELECTORDIALOGOPEN:
            //console.log('TREESELECTORDIALOGOPEN');
            return {
              ...state,
              showTreeSelectorDialog : true
            };

        case TREESELECTORDIALOGCLOSED:
            //console.log('TREESELECTORDIALOGCLOSED');
            return {
              ...state,
              showTreeSelectorDialog : false
            };

        case CONTROLPANELTOOLSDIALOGOPEN:
            console.log('CONTROLPANELTOOLSDIALOGOPEN');
            return {
              ...state,
              showControlPanelDialog : true
            };

        case CONTROLPANELTOOLSDIALOGCLOSED:
            console.log('CONTROLPANELTOOLSDIALOGCLOSED');
            return {
              ...state,
              showControlPanelDialog : false
            };


      default:
          return state;

    }
};

import { APPLICATIONLISTLOADED, APPLICATIONSELECTED, FUNCTIONLISTLOADED,METADATALOADED,
  FUNCTIONSELECTED,APPDIALOGOPEN,APPDIALOGCLOSED,FUNCDIALOGOPEN,FUNCDIALOGCLOSED,
   TREESELECTED ,TREEPERSONSELECTED,DIAGRAMSELECTED,
    TREESELECTORDIALOGCLOSED,TREESELECTORDIALOGOPEN,
    DISPLAYDIAGRAMCONTROLS,HIDEDIAGRAMCONTROLS,TOGGLEDIAGRAMCONTROLS, NEWLOCATIONS} from './actionTypes.jsx';



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
  showDiagramControls : false,
  selectedTreeData : {origin : 93, originDescription : '|21|Alan!Douglas'},
  selectedTreePersonData : {personId:96},
  diagramId : 0,
  error: undefined
}, action) => {


  switch (action.type) {
  
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



    case TREEPERSONSELECTED:
        //console.log('APPLICATIONSELECTED');
        return {
          ...state,
           selectedTreePersonData : action.payload
        };
    case TREESELECTED:
        //console.log('APPLICATIONSELECTED');
        return {
          ...state,
           selectedTreeData : action.payload
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
        //showTreeSelectorDialog TREESELECTORDIALOGCLOSED,TREESELECTORDIALOGOPEN
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
//showTreeSelecto

      default:
          return state;

    }
};

import { APPLICATIONLISTLOADED, APPLICATIONSELECTED, FUNCTIONLISTLOADED,
  FUNCTIONSELECTED,APPDIALOGOPEN,APPDIALOGCLOSED,FUNCDIALOGOPEN,FUNCDIALOGCLOSED} from './actionTypes.jsx';

export default (state = {
  appName :1,
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

  error: undefined
}, action) => {


  switch (action.type) {


    case FUNCTIONLISTLOADED:
        //console.log('APPLICATIONLISTLOADED');
        return {
          ...state,
           funcList: action.payload,
           loadedFuncList :true,
           error: ''
        };

    case FUNCTIONSELECTED:
        //console.log('APPLICATIONSELECTED');
        return {
          ...state,
           funcName : action.payload
        };


      case APPLICATIONLISTLOADED:
          //console.log('APPLICATIONLISTLOADED');
          return {
            ...state,
             appList: action.payload,
             loadedAppList :true,
             error: ''
          };

      case APPLICATIONSELECTED:
          // if we have a new app selected
          // then invalidate the func list & selected Function
          // if same app nothing will change
          if(state.appName != action.payload){
            return {
               ...state,
               funcList: [],
               loadedFuncList :false,
               funcName : 0,
               appName : action.payload
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


      default:
          return state;

    }
};

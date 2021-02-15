import { APPLICATIONLISTLOADED, APPLICATIONSELECTED,APPDIALOGOPEN,APPDIALOGCLOSED} from './actionTypes.jsx';

export default (state = {
  appName :1,
  appList : [
      {
        id: 1,
        name: 'Front Page',
        __typename: 'SiteType'
      }],
  loadedAppList :false,
  showAppListDialog :true,

  error: undefined
}, action) => {


  switch (action.type) {

      case APPLICATIONLISTLOADED:
          console.log('APPLICATIONLISTLOADED');
          return {
            ...state,
             appList: action.payload,
             loadedAppList :true,
             error: ''
          };

      case APPLICATIONSELECTED:
          console.log('APPLICATIONSELECTED');
          return {
            ...state,
             appName : action.payload
          };

        case APPDIALOGOPEN:
            console.log('APPDIALOGOPEN');
            return {
              ...state,
               showAppListDialog : true
            };

        case APPDIALOGCLOSED:
            console.log('APPDIALOGCLOSED');
            return {
              ...state,
               showAppListDialog : false
            };


      default:
          return state;

    }
};

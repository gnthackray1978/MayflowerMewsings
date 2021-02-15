import { APPLICATIONLISTLOADED, APPLICATIONSELECTED} from './actionTypes.jsx';

export default (state = {
  appName :undefined,
  appList : [],
  loadedAppList :false,
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

      default:
          return state;

    }
};

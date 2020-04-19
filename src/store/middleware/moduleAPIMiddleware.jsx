import { gapi, loadAuth2 } from 'gapi-script'


const moduleAPIMiddleware = (params) => {


    return storeAPI => next => action => {

        switch(action.type) {
            case "SAMPLE": {
                console.log('CONNECT reached');
                return;
            }      
        }

        return next(action);
    };
};

export default googleMiddleware;

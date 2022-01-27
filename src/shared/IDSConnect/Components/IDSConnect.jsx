import Fab from '@material-ui/core/Fab';
import React, { Component, useEffect } from 'react';
import { connect  } from "react-redux";
import {PropTypes} from 'prop-types';

import loadScript from "../../LoginShared/load-script.js";
import ImageButton from "../../LoginShared/ImageButton.jsx";
import GooglePopup from "../../LoginShared/GooglePopup.jsx";
import GoogleButton from "../../LoginShared/GoogleButton.jsx";
import { UserManager, WebStorageStateStore, Log } from "oidc-client";

import {setIdsLoginScreenVisible} from "../idsActions.jsx";
import {loginLib,redirectHandler,makeStateFromSession,logoutLib} from '../../oidcFuncLib.jsx';
import { useTheme } from '@material-ui/core/styles';

import {styles} from "./styles.jsx";




function renderLogin(props) {

   const {profileObjName,
    imageUrl,
    ProfileObj,
    isImageButton,
    isFabButton, IDSConnected,googleTokenExpiration,idsTokenExpiration} = makeStateFromSession();
 
  const {IdsLogInDetailsVisible,setIdsLoginScreenVisible,config} = props;

  const theme = useTheme();
  const classes = styles(theme);

  let buttons ;

  if(IDSConnected){
      if(isImageButton)
        buttons = <div><ImageButton url = {imageUrl} onClick={()=>setIdsLoginScreenVisible(true)}/></div>

      if(isFabButton)
        buttons = <Fab color="primary" aria-label="Add" className={classes.fab}
          onClick={()=>setIdsLoginScreenVisible(true)}>{profileObjName}</Fab>
  }
  else{
      buttons = (
          <GoogleButton label ="Login" mode = "login" onClick ={e=>{
              if (e) e.preventDefault();
              loginLib(config,()=>{
             
              });
        }}/>);
  }

   return (
       <div>
           {buttons}
            <GooglePopup open={IdsLogInDetailsVisible} 
            ProfileObj ={ProfileObj} 
            googleTokenExpiration ={googleTokenExpiration}
            idsTokenExpiration ={idsTokenExpiration}
            >
                <div>
                    <GoogleButton label ="Logout" mode = "logout" onClick ={()=>{
                        // //console.log('Logout: ');

                          logoutLib(config);
                          setIdsLoginScreenVisible(false);
                        }}/>
                    <GoogleButton label ="Cancel" mode = "cancel" onClick ={()=>setIdsLoginScreenVisible(false)}/>
                </div>
            </GooglePopup>
       </div>
   )

}



function IDSConnect(props)  {

    const [connected, setConnected] = React.useState(makeStateFromSession().Connected);

    const { classes,config,metaSubset} = props;
     
    console.log('loading IDSConnect: ' + connected);

    redirectHandler(config).then((c)=>{
      //console.log('IDSConnect redirected : ' + c + ' , ' + connected)
      if(c!= undefined){
        if(connected!=c){
          setConnected(c);
        }
      }
    });

    var mgr = new UserManager(config);




    mgr.events.addAccessTokenExpiring(() =>
    {
      console.log("token expiring...");

        mgr.signinSilent({scope: config.scope, response_type: config.response_type})
            .then((user) =>
            {
                redirectHandler(config).then((c)=>{
                      if(c!= undefined){
                        if(connected!=c){
                          setConnected(c);
                        }
                      }
                    });
            })
            .catch((error) =>
            {
                redirectHandler(config).then((c)=>{
                  if(c!= undefined){
                    if(connected!=c){
                      setConnected(c);
                    }
                  }
              });
            });
    });


    mgr.events.addAccessTokenExpired(function(){

    console.log("token expired...");

    mgr.signinSilent({scope: config.scope, response_type: config.response_type})
    .then((user) =>
    {
        redirectHandler(config).then((c)=>{
              if(c!= undefined){
                if(connected!=c){
                  setConnected(c);
                }
              }
            });
    })
    .catch((error) =>
    {
        redirectHandler(config).then((c)=>{
          if(c!= undefined){
            if(connected!=c){
              setConnected(c);
            }
          }
      });
    });

    });


    if(metaSubset.siteCount < 3 && !metaSubset.loading && connected)
    {
      metaSubset.fnRefetch();
      console.log('refreshing');
    } 


    let buttons = renderLogin(props);

    return(
        <div>
            {buttons}
        </div>
    );
   
}




const mapStateToProps = state => {
 
  let config = state.ids.IdServParams;

  if(window.location.origin.includes('gnthackray'))
    config = state.ids.GNTServParams;   

  return {
    config : config,
    IdsLogInDetailsVisible : state.ids.IdsLogInDetailsVisible,

    LogInDetailsVisible : state.google.LogInDetailsVisible,
    type: state.google.GoogleApiParams.type,     
    buttonText: state.google.GoogleApiParams.buttonText,
    GoogleApiLoggedIn : state.google.googleApiLoggedIn,

    DisplayName : state.displayName
  };
};

const mapDispatchToProps = dispatch => {
   
  return {    
    setIdsLoginScreenVisible :isVisible =>{
      dispatch(setIdsLoginScreenVisible(isVisible))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IDSConnect);

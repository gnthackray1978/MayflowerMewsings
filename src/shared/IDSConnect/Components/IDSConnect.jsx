import Fab from '@material-ui/core/Fab';
import React, { Component, useEffect } from 'react';
import { connect  } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import {PropTypes} from 'prop-types';

import loadScript from "../../LoginShared/load-script.js";
import ImageButton from "../../LoginShared/ImageButton.jsx";
import GooglePopup from "../../LoginShared/GooglePopup.jsx";
import GoogleButton from "../../LoginShared/GoogleButton.jsx";
import { UserManager, WebStorageStateStore, Log } from "oidc-client";

import {setIdsLoginScreenVisible,connected} from "../idsActions.jsx";
import {loginLib,redirectHandler,makeStateFromSession,logoutLib} from '../../oidcFuncLib.jsx';


import styles from "./styles.jsx";




function renderLogin(props) {

   const {profileObjName,
    imageUrl,
    ProfileObj,
    isImageButton,
    isFabButton, IDSConnected,googleTokenExpiration,idsTokenExpiration} = makeStateFromSession();
 
  const { classes,IdsLogInDetailsVisible,setIdsLoginScreenVisible,config} = props;

  let buttons ;

  if(IDSConnected){
      if(isImageButton)
        buttons = <ImageButton url = {imageUrl}
          onClick={()=>setIdsLoginScreenVisible(true)}/>

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
     
    
    redirectHandler(config).then((c)=>{
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


    if(metaSubset.siteCount < 2 && !metaSubset.loading && connected)
    {
      metaSubset.fnRefetch();
     // console.log('refreshing');
    } 


    let buttons = renderLogin(props);

    return(
        <div>
            {buttons}
        </div>
    );
   
}

IDSConnect.propTypes = {
  handleClick : PropTypes.func,
  //jsSrc: PropTypes.string,
  isImageButton: PropTypes.bool,
  isFabButton: PropTypes.bool,
  imageUrl: PropTypes.string,
  profileObjName: PropTypes.string,
  ProfileObj : PropTypes.object,
  LogInDetailsVisible: PropTypes.bool,
  onClick : PropTypes.func,
  mode: PropTypes.string,
  disabled : PropTypes.bool,
  render : PropTypes.func,
  type: PropTypes.string,
  //tag: PropTypes.string,
  //icon: PropTypes.bool,
  Connected : PropTypes.bool
};



const mapStateToProps = state => {
 
 
     
  return {
    config : state.ids.IdServParams,
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

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(IDSConnect));

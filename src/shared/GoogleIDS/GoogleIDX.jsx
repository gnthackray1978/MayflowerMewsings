
import React, { Component, useEffect,useState } from 'react';
import jwt_decode from 'jwt-decode';
import { connect  } from "react-redux";
import {PropTypes} from 'prop-types';
 import Box from '@mui/material/Box';
import ImageButton from "./ImageButton.jsx";
import GooglePopup from "./GooglePopup.jsx";
import GoogleButton from "./GoogleButton.jsx"; 
import { useApolloClient } from '@apollo/client';
import {setIdsLoginScreenVisible, setTokenExpiration} from "./redux/idsActions.jsx";
import {authLink,httpLink} from '../../apollo-client.js';
import { useTheme } from '@mui/material/styles';

import {styles} from "./styles/styles.jsx";



 function RenderLogin(props) {

    /* global google */

    const {IdsLogInDetailsVisible,setIdsLoginScreenVisible,user, LoggedOut, TestLogin} = props;

    return (
      <div>
         <Box id = "spacerbox"  sx={{
              "position": "absolute",
              "top": "-1",
              "right": "1",
              "width": "125px",
              "height": "70px",
              "backgroundColor": "white",
              /* opacity: 0.5; */
              "borderRadius": "1px 1px 1px 25px",
              "zIndex": "-1"
            }}
          ></Box>

        <div><ImageButton url = {user.picture} onClick={()=>setIdsLoginScreenVisible(true)}/></div>
            
        <GooglePopup open={IdsLogInDetailsVisible} ProfileObj ={user}>
                <div style = {{marginLeft : '-15px'}}>
                    <GoogleButton label ="Logout" mode = "logout" className = "g_id_signout" onClick ={LoggedOut}/>
                    <GoogleButton label ="Cancel" mode = "cancel" onClick ={()=>setIdsLoginScreenVisible(false)}/>
                    <GoogleButton label ="Test"  onClick ={TestLogin}/>                    
                </div>
        </GooglePopup>
      </div>
    )

 }

function GoogleIDSConnect(props) {
    const {IdsLogInDetailsVisible,setIdsLoginScreenVisible,config, setTokenExpiration,refetch} = props;
    const theme = useTheme();
    const classes = styles(theme);
    const client = useApolloClient();
    //console.log('GoogleIDSConnect');
    const [user, setUser] = useState(undefined);
  


    var loggedIn = (responce)=>{
      console.log('Logged in');
      var userObject = jwt_decode(responce.credential);
    //  console.log(responce.credential);
  
      localStorage.setItem("token", responce.credential);
      localStorage.setItem("email", userObject.email);
      localStorage.setItem("token-expirey", userObject.exp);
      
      // if(client){
      //   console.log('resetting token info');
      //   client.setLink(authLink.concat(httpLink));
      // }

      setTokenExpiration(userObject.exp);
      setUser(userObject);

      //load the menus
      refetch && refetch();


      setTimeout(() => {
        /* global google */
        //console.log('expired');
        google.accounts.id.prompt(); 

      }, 1000 * 60 * 62)
    };


    var LoggedOut = () => {
      /* global google */
      setIdsLoginScreenVisible(false);
    //  console.log('attempting to log out: ' +google.accounts.id);
      
      let email = localStorage.getItem("email");
    
      if(email){
        google.accounts.id.disableAutoSelect();
        google.accounts.id.revoke(email, done => {
        //    console.log('consent revoked');
            setUser(undefined);
            setTokenExpiration();
            localStorage.clear();
            window.location.reload();
        });
      }
    
    };
    
    
    var TestLogin = () =>{
   //   console.log("get");
                    
      var token = localStorage.getItem("token");
    
      fetch(config.identityEndpoint, {
        headers: {
            'Content-Type': 'application/json',
            'authorization': token ? `Bearer ${token}` : "",
        },
    //    body: JSON.stringify('body')
      })
      .then( r=> r.json() )
      .then( resp =>{
      //    console.log(resp ) 
      })
      .catch( console.warn )
    };
    

  
    useEffect (()=>{
      /* global google */
      google.accounts.id.initialize({
        client_id:  config.client_id,
        callback : loggedIn,
        auto_select: true
      });
  
      google.accounts.id.renderButton(
        document.getElementById('signInDiv'),
        {
          theme : 'outline',
          size : 'large'
        }
      );
  
      google.accounts.id.prompt(); // Display the One Tap dialog
   
    },[]);
  
  
    const renderElement = ()=>{
      if(!user)
         return <div>
                    <Box id = "spacerbox"  sx={{
                        "position": "absolute",
                        "top": "-1",
                        "right": "-1",
                        "width": "250px",
                        "height": "70px",
                        "backgroundColor": "white",
                        /* opacity: 0.5; */
                        "borderRadius": "1px 1px 1px 25px",
                        "zIndex": "-1"
                      }}
                    ></Box>
                    <div id= "signInDiv" className = {classes.show}></div>
                </div>;

      return <div id= "signInDiv" className = {classes.hide}></div>;
    };
  
    return (
      <div  className = {classes.googleContainer}>
        { 
          renderElement()
        }
        {
        user &&  
        <RenderLogin IdsLogInDetailsVisible = {IdsLogInDetailsVisible} 
                  setIdsLoginScreenVisible = {setIdsLoginScreenVisible}
                  LoggedOut = {LoggedOut}
                  TestLogin = {TestLogin}
                  user = {user} ></RenderLogin>
        }
    
        
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
    DisplayName : state.displayName
  };
};

const mapDispatchToProps = dispatch => {
   
  return {    
    setIdsLoginScreenVisible :isVisible =>{
      dispatch(setIdsLoginScreenVisible(isVisible))
    },
    setTokenExpiration : (tokenExpiration) =>{
      dispatch(setTokenExpiration(tokenExpiration))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleIDSConnect);
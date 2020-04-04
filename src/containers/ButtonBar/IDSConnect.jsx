import Fab from '@material-ui/core/Fab';
import React, { Component } from 'react';
import blue from '@material-ui/core/colors/blue';
import loadScript from './load-script.js';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import {PropTypes} from 'prop-types';
//import {setQuizMetaData } from "../../store/actions/dbActions.jsx";
import {setCatSelection } from "../../store/actions/appStateActions.jsx";

import {setGoogleApi, setGoogleSignOutState,setAuth2} from "../../store/actions/googleActions.jsx";
import {setUserInfo,login,logout,loginRedirect} from "../../store/actions/idsActions.jsx";

import {setLoginDetailsVisible, setIdsLoginDetailsVisible} from "../../store/actions/uxActions.jsx";


import ImageButton from "./ImageButton.jsx";
import GooglePopup from "./GooglePopup.jsx";
import GoogleButton from "./GoogleButton.jsx";

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  root: {
  flexGrow: 1,
  },
  grow: {
    marginLeft: 50,
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  tolowerBtn : {
    textTransform: 'none'
  },
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },

});

class IDSConnect extends Component {

  constructor(props) {
    super(props);

  }

  componentDidMount() {
    const {setUserInfo} = this.props;

    //setUserInfo();

    this.props.loginRedirect();

    //this.props.setAuth2();
  }

  renderLogin() {


    const { classes,login,IdsLogInDetailsVisible,ProfileObj,imageUrl,isImageButton,
            isFabButton,profileObjName,setIdsLoginDetailsVisible,Connected,logout} = this.props;

  //  console.log('imageUrl: ' + imageUrl);

    let buttons ;

    if(Connected){
        if(isImageButton)
          buttons = <ImageButton url = {imageUrl}
            onClick={()=>setIdsLoginDetailsVisible(true)}/>

        if(isFabButton)
          buttons = <Fab color="primary" aria-label="Add" className={classes.fab}
            onClick={()=>setIdsLoginDetailsVisible(true)}>{profileObjName}</Fab>
    }
    else{
        buttons = (
            <GoogleButton label ="Login" mode = "login" onClick ={e=>{
                if (e) e.preventDefault();
                login();
          }}/>);
    }

     return (
         <div>
             {buttons}
              <GooglePopup open={IdsLogInDetailsVisible} ProfileObj ={ProfileObj} >
                  <div>
                      <GoogleButton label ="Logout" mode = "logout" onClick ={()=>{
                          // console.log('Logout: ');

                            logout();
                            setIdsLoginDetailsVisible(false);
                          }}/>
                      <GoogleButton label ="Cancel" mode = "cancel" onClick ={()=>setIdsLoginDetailsVisible(false)}/>
                  </div>
              </GooglePopup>
         </div>
     )

  }

  render() {

    const { classes,login,Connected} = this.props;


    let buttons = this.renderLogin();


    return(
        <div>
            {buttons}
        </div>
    );

   }

}

IDSConnect.propTypes = {
  //classes: PropTypes.object.isRequired,
  setGoogleApi : PropTypes.func,
  setGoogleSignOutState : PropTypes.func,
  handleClick : PropTypes.func,
  jsSrc: PropTypes.string,
  isImageButton: PropTypes.bool,
  isFabButton: PropTypes.bool,
  imageUrl: PropTypes.string,
  profileObjName: PropTypes.string,
  ProfileObj : PropTypes.object,
  LogInDetailsVisible: PropTypes.bool,
  setLoginDetailsVisible : PropTypes.func,
  setGoogleApiSignIn : PropTypes.func,
  onClick : PropTypes.func,
  mode: PropTypes.string,
  disabled : PropTypes.bool,
  render : PropTypes.func,
  type: PropTypes.string,
  tag: PropTypes.string,
  icon: PropTypes.bool,
  Connected : PropTypes.bool
};

const mapStateToProps = state => {
//  console.log('mapStateToProps');

  const params = {
    client_id: state.google.GoogleApiParams.clientId,
    cookie_policy: state.google.GoogleApiParams.cookie_policy,
    login_hint: state.google.GoogleApiParams.login_hint,
    hosted_domain: undefined,
    fetch_basic_profile: state.google.GoogleApiParams.fetch_basic_profile,
    discoveryDocs : undefined,
    ux_mode: state.google.GoogleApiParams.uxMode,
    redirect_uri: undefined,
    scope: state.google.GoogleApiParams.scopes,
    access_type: state.google.GoogleApiParams.accessType,
    responseType: state.google.responseType
  };

  let isImageButton = false;
  let isFabButton =false;


  if(state.ids.connected && state.ids.profileObj){
    if(state.ids.profileObj.imageUrl!= '')
      isImageButton = true;
    else{
      if(state.ids.profileObj.name!= '')
        isFabButton = true;
    }
  }

  let profileObjName ='';
  let imageUrl ='';



  if(state.ids.profileObj && state.ids.profileObj.name)
    profileObjName = state.ids.profileObj.name.charAt();

  if(state.ids.profileObj)
    imageUrl = state.ids.profileObj.imageUrl;

  return {
    profileObjName,
    imageUrl,
    isImageButton : isImageButton,
    isFabButton : isFabButton,
    GoogleConnectParam : params,
    SideDrawerLoaderVisible : state.uxState.SideDrawerLoaderVisible,
    LogInDetailsVisible : state.uxState.LogInDetailsVisible,
    IdsLogInDetailsVisible : state.uxState.IdsLogInDetailsVisible,
    ClientId : state.google.GoogleApiParams.clientId,
    ScriptId : state.google.GoogleApiParams.scriptId,
    Scope : state.google.GoogleApiParams.scopes,
    cookiePolicy: state.google.GoogleApiParams.cookie_policy,
    LoginHint: state.google.GoogleApiParams.login_hint,
    FetchBasicProfile : state.google.GoogleApiParams.fetch_basic_profile,
    UxMode: state.google.GoogleApiParams.uxMode,
    AccessType: state.google.GoogleApiParams.accessType,
    type: state.google.GoogleApiParams.type,
    tag: state.google.GoogleApiParams.tag,
    buttonText: state.google.GoogleApiParams.buttonText,
    prompt: state.google.GoogleApiParams.prompt,
    disabledStyle: state.google.GoogleApiParams.disabledStyle,
    icon: state.google.GoogleApiParams.icon,
    theme: state.google.GoogleApiParams.theme,
    jsSrc: state.google.GoogleApiParams.jsSrc,

    DisplayName : state.displayName,
    GoogleApiLoggedIn : state.google.googleApiLoggedIn,
    ProfileObj : state.ids.profileObj,
    Connected : state.ids.connected
  };
};

const mapDispatchToProps = dispatch => {

  return {

    logout :() =>{
      dispatch(logout())
    },
    login :() =>{
      dispatch(login())
    },
    setUserInfo :() =>{
      dispatch(setUserInfo())
    },
    setIdsLoginDetailsVisible :isVisible =>{
      dispatch(setIdsLoginDetailsVisible(isVisible))
    },
    loginRedirect : () =>{
      dispatch(loginRedirect())
    },
    setAuth2 : ()=>{
      dispatch(setAuth2())
    }


  };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(IDSConnect));

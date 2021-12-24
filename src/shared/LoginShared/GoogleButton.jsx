import ButtonContent from './button-content'
import IconGoogle from './icon';
import React from 'react';
import { connect } from "react-redux";
import {googleButton, defaultStyle} from './styles.jsx';
import { useTheme } from '@material-ui/core/styles';
 

function GoogleButton(props){
  //console.log(props);
  const [hovered, setHovered] = React.useState(false);
  const [active, setActive] = React.useState(false);

  const { tag, type, render, icon, 
    disabled , mode, onClick, label} = props;

  let state = {
    hovered: hovered,
    active: active
  };

  const theme = useTheme();

  const classes = googleButton(theme);



  let className = defaultStyle(state, classes, theme );

  let iconGoogleStyle = icon ? classes.google : classes.googleIcon;
 
  let button;
  if (mode == 'login' || mode == 'logout') {
    button = <div><IconGoogle key={1} active={active}>  
                <span key={2} className={iconGoogleStyle}>
                    {label}
                  </span>
                </IconGoogle>  </div>;
  } else {
    button = <ButtonContent key ="1">{label}</ButtonContent>;
  }

    return(<button className = {className}
            onMouseEnter ={()=>{
              setHovered(true);              
            }} 
            onMouseLeave ={()=>{
              setHovered(false);
              setActive(false);
            }} 
            onMouseDown={()=>{              
              setActive(true);
            }} 
            onMouseUp ={()=>{              
              setActive(false);
            }}
            onClick ={onClick}
            >
            {button}
    </button>);
   

}


const mapStateToProps = (state, ownProps) => {

  let disabled = false;

  if(ownProps.mode != 'cancel'){

    if(ownProps.mode == 'logout' && state.google.GoogleApiLoggedIn){
      disabled = false;
    }
    if(ownProps.mode == 'logout' && !state.google.GoogleApiLoggedIn){
      disabled = true;
    }
    if(ownProps.mode == 'login' && state.google.GoogleApiLoggedIn){
      disabled = true;
    }
  }



  return {
    disabled,
    ClientId : state.google.GoogleApiParams.clientId,
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
    GoogleApiLoggedIn : state.google.googleApiLoggedIn,
    ProfileObj : state.google.profileObj
  };
};


export default connect(mapStateToProps, ()=>  {return {};})(GoogleButton);

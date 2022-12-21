import ButtonContent from './ButtonContent'
import IconGoogle from './icon';
import React from 'react';
import {googleButton, defaultStyle} from './styles/styles.jsx';
import { useTheme } from '@mui/material/styles';
 

function GoogleButton(props){
  //console.log(props);
  const [hovered, setHovered] = React.useState(false);
  const [active, setActive] = React.useState(false);

  const { icon, mode, onClick, label} = props;

  const theme = useTheme();

  const classes = googleButton(theme);

  let state = {
    hovered: hovered,
    active: active
  };

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
   // console.log('mode is not login or logout');
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

export default GoogleButton;

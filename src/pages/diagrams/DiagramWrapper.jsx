//todo clone off maps mapwrapper !! merge them together 

import React from 'react'; 
import { useTheme } from '@mui/material/styles';
import {useStyles} from './styleFuncs.jsx';
import { displayLoadingScreen, displayErrors } from '../../shared/common'; 

export default function DiagramWrapper(props) {

  const {state, children} = props;

  const theme = useTheme();
  const classes = useStyles(theme);

  var displayComponent = () => {    
    return(<div>{(children.length > 1) ? children[1] : children}</div>);
  }

  if(state.loading)
    displayComponent = displayLoadingScreen;

  if(state.errors.length >0)
    displayComponent = () => {return (displayErrors(state.errors))}

  return (
    <div className={classes.root}>
        {children.length > 1 && children[0]}

        {displayComponent()}

    </div>
  );
}

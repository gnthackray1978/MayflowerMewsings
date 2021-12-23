import React from 'react';
 import Paper from '@material-ui/core/Paper'; 
import ChildImages from './ChildImages.jsx';
import { useTheme } from '@material-ui/core/styles';
import {styles} from './styleFuncs.jsx';

 
 
 function ImageParents(props){

  

  const {parents} = props;
  const theme = useTheme();
  const classes = styles(theme);
 
  return (
      <div>        
          {parents.map((i)=>(          
            <div key ={i.id}>
              <Paper className={classes.paper}  elevation={1} >
                <div className={classes.documentHeader}>{i.title}</div>
                <ChildImages classes ={classes} images = {i.children}/>
                <div  className={classes.documentInfo}>{i.info}</div>
              </Paper>
            </div>              
          ))}
      </div>
  );
}
 

export default ImageParents;

import React from 'react';

 
import IconButton from "@material-ui/core/IconButton";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide"; 
import { useTheme } from '@material-ui/core/styles';
import {styles} from './styleFuncs.jsx';

 
 const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ChildImages(props){
      
  

  const {images} = props;
  const theme = useTheme();
  
  const classes = styles(theme);

  const [selectedTile, setSelectedTile] = React.useState(null);
 
  //?w=164&h=164&fit=crop&auto=format

  let handleClick = (context,path,title)=>{
    context.preventDefault();
    let imageData ={
      src : path,
      title : title
    };
    setSelectedTile(imageData);
  };

  const handleClose = () => {
    setSelectedTile(null);
  };


  return(
    <div>  
      <ul  className={classes.imageList}  >
            {images.map((item) => (
              <li  className={classes.imageListItem} key ={item.id}>
                <a href ='' onClick = {(e) => handleClick(e, item.path, item.title )}>
                  <img className = {classes.thumbnail}
                    src={item.path}
                    alt={item.title}
                    loading="lazy"
                  
                    
                  />
                </a>
                
          </li>
        ))}
      </ul>


      <Dialog
        fullScreen
        open={selectedTile !== null}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
         
          </Toolbar>
        </AppBar>

        {selectedTile && (
          <img src={selectedTile.src} alt={selectedTile.title} />
        )}
  
      </Dialog>
    </div>
    
    )

};

 

export default ChildImages;

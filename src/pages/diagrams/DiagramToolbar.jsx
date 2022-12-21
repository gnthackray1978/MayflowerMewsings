
import React, { Component , useState} from 'react'; 
import { connect } from "react-redux";
import { useTheme } from '@mui/material/styles';
import {useToolbarStyles} from './styleFuncs.jsx';
import IconButton from '@mui/material/IconButton';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutline from '@mui/icons-material/RemoveCircleOutline';


// treeSelectorDialogClose
import {hideDiagramControls} from "../../features/uxActions.jsx"; 
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}


const DiagramToolbar = (props) => {
 
  const {showDiagramControls,hideDiagramControls,graph} = props;

  const handleClose = () => {
    hideDiagramControls();
  };
  
  const theme = useTheme();
  const classes = useToolbarStyles(theme);

  return (
    <div >      
      <Dialog disableEnforceFocus
              style={{ pointerEvents: 'none' }}
              PaperProps={{ style: { pointerEvents: 'auto', width : '115px', height:'190px' } }}
              open={showDiagramControls}
              PaperComponent={PaperComponent}
              aria-labelledby="draggable-dialog-title"
              BackdropProps={{style: {opacity: '0'}}} >
        <DialogTitle style={{ cursor: 'move', padding :0 }} id="draggable-dialog-title">
          <Button autoFocus onClick={handleClose}  style={{ marginLeft :40 }}>
            Close
          </Button>
        </DialogTitle>
        <DialogContent>
         
           <IconButton
             color="inherit"
             onMouseDown={e => {
               graph.movementy = -1;
               e.stopPropagation();
             }
             }
             onMouseUp={e => {
               graph.movementy = 0;
               e.stopPropagation();
             }
             }
             style={{ position :'absolute', left : '32px', top : '35px' }}
             aria-label="Menu"
             onClick= {()=>{}}
             size="large"><ArrowUpward/></IconButton>
         

                      <IconButton
                        color="inherit"
                        onMouseDown={e => {
                          graph.movementx = -1 ;
                          e.stopPropagation();
                        }
                        }
                        onMouseUp={e => {
                          graph.movementx = 0;
                          e.stopPropagation();
                        }
                        }
                        style={{ position :'absolute', left : '0px', top : '65px' }}
                        aria-label="Menu"
                        onClick= {()=>{}}
                        size="large"><ArrowBack/></IconButton>
      
          <IconButton
            color="inherit"
            onMouseDown={e => {
              graph.movementx = 1 ;
              e.stopPropagation();
            }
            }
            onMouseUp={e => {
              graph.movementx = 0;
              e.stopPropagation();
            }
            }
            style={{ position :'absolute', left : '65px', top : '65px' }}
            aria-label="Menu"
            onClick= {()=>{}}
            size="large"><ArrowForward/></IconButton>
          
          <IconButton
            color="inherit"
            onMouseDown={e => {
             graph.movementy = 1;
             e.stopPropagation();
           }
           }
            onMouseUp={e => {
              graph.movementy = 0;
              e.stopPropagation();
            }
            }
            style={{ position :'absolute', left : '32px', top : '100px' }}
            aria-label="Menu"
            onClick= {()=>{}}
            size="large"><ArrowDownward/></IconButton>
      
          <IconButton
            color="inherit"
            onMouseDown={e => {
                graph.ZoomIn();
                e.stopPropagation();
              }
              }
            style={{ position :'absolute', left : '34px', top : '135px' }}
            aria-label="Menu"
            onClick= {()=>{}}
            size="large"><AddCircleOutline/></IconButton>
          
          <IconButton
            color="inherit"
            onMouseDown={e => {
                graph.ZoomOut();
                e.stopPropagation();
              }
              }
            style={{ position :'absolute', left : '65px', top : '135px' }}
            aria-label="Menu"
            onClick= {()=>{}}
            size="large"><RemoveCircleOutline/></IconButton>

        </DialogContent>
       
      </Dialog>
    </div>
  );
};



 
const mapStateToProps = state => {
  return { 
    selectedTreeData : state.ux.selectedTreeData,
    showDiagramControls :state.ux.showDiagramControls,
    movement : state.ux.movement
  };
};

const mapDispatchToProps = dispatch => {
  return {
    hideDiagramControls : ()=> dispatch(hideDiagramControls())
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(DiagramToolbar);
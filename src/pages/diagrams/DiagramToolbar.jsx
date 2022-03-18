
import React, { Component , useState} from 'react'; 
import { connect } from "react-redux";
import { useTheme } from '@material-ui/core/styles';
import {useToolbarStyles} from './styleFuncs.jsx';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutline from '@material-ui/icons/RemoveCircleOutline';


// treeSelectorDialogClose
import {hideDiagramControls} from "../../features/uxActions.jsx"; 
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
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
         
           <IconButton color="inherit" 
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
                  aria-label="Menu"  onClick= {()=>{}}><ArrowUpward/></IconButton>
         

                      <IconButton color="inherit" 
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
          aria-label="Menu"  onClick= {()=>{}}><ArrowBack/></IconButton>
      
          <IconButton color="inherit" 
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
          aria-label="Menu"  onClick= {()=>{}}><ArrowForward/></IconButton>
          
          <IconButton color="inherit" 
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
           aria-label="Menu"  onClick= {()=>{}}><ArrowDownward/></IconButton>
      
          <IconButton color="inherit" onMouseDown={e => {
              graph.ZoomIn();
              e.stopPropagation();
            }
            }
          style={{ position :'absolute', left : '34px', top : '135px' }} 
          aria-label="Menu"  onClick= {()=>{}}><AddCircleOutline/></IconButton>
          
          <IconButton color="inherit" onMouseDown={e => {
              graph.ZoomOut();
              e.stopPropagation();
            }
            }
          style={{ position :'absolute', left : '65px', top : '135px' }} 
          aria-label="Menu"  onClick= {()=>{}}><RemoveCircleOutline/></IconButton>

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
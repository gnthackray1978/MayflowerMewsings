import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SelectionToolBar from "./SelectionToolBar.jsx";

import './SideDrawer.css';

import { connect } from "react-redux";

const styles = theme => ({

  root: {
    paddingRight: theme.spacing.unit,
    minHeight : window.innerHeight -10
  },

  list: {
    width: 420,
  },

  fullList: {
    width: 'auto',
  },
  mygrid:{
    margin:'0px'
  },
  input:{
    width: '100px'
  },
  label: {

    textAlign: 'center',

  },
  toolBar: {
    paddingLeft :'12px',
    minHeight: '0px'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  appBar: {
     top: 'auto',
     bottom: 0,
   },
});

class SideDrawer extends Component {

   constructor(props) {
      super(props);
       this.state = {
         modalShow: this.props.show ,
       };

   }

   componentDidMount() {

     this.props.onOpenClick(()=>{
       this.setState({ modalShow: true });
     });

   }

   toggleDrawer(state){
     if(this.state.modalShow != state){
      this.setState({ modalShow: state });

    }
   }

   clearLayout(event){
    this.props.activateLayout(false);
   }

   render() {

  //   console.log("quiz data length: "+this.props.quizData.length);

    const { classes } = this.props;

    return (
      <div>
        <Drawer open = {this.state.modalShow} >
            <div className = "inner">
              <AppBar position="static">
               <Toolbar>
                   <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={()=>{ this.toggleDrawer(false);}} >
                     <MenuIcon/>
                   </IconButton>

                   <Button color="inherit" className ={classes.tolowerBtn}>
                     <Typography variant="h6" color="inherit" >
                       Select Item
                     </Typography>
                   </Button>

               </Toolbar>
             </AppBar>
             <List>

             </List>

             <SelectionToolBar/>

          </div>
        </Drawer>
      </div>
    );
  }
}

SideDrawer.defaultProps = {
  show: false,
};

SideDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SideDrawer));

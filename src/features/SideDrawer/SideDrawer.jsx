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
import ApplicationList from "../ApplicationList/ApplicationList.jsx";
import TreeSelector from "../TreeSelector/TreeSelector.jsx";
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
   }



   render() {
    const { classes ,ShowFuncListDialog, appName} = this.props;

    var getContent = () =>{
      if(appName != 2)
        return <ApplicationList/>
      else
        return <TreeSelector/>
    };

    var content = getContent();

    console.log('SideDrawer loaded: ' + appName);

    return (
      <div>
        <Drawer open = {ShowFuncListDialog} >
            { content }
        </Drawer>
      </div>
    );
  }
}



SideDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    appName : state.ux.appName,
    ShowFuncListDialog: state.ux.showFuncListDialog
  };
};

const mapDispatchToProps = dispatch => {
  return { };
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SideDrawer));

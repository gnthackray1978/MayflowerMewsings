import React, { Component } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import {PropTypes} from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { connect } from "react-redux";
import IDSConnect   from "../../shared/IDSConnect/Components/IDSConnect.jsx";
import {siteDialogOpen, siteDialogClose,funcDialogOpen,funcDialogClose} from "../uxActions.jsx";
import AppsIcon from '@material-ui/icons/Apps';

const styles = theme => ({
  fab: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  root: {
  flexGrow: 1,
  },
  grow: {
    marginLeft: 5,
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,

  },
  tolowerBtn : {
    textTransform: 'none'
  }
});

class TopButtons extends Component {

  constructor(props) {
     super(props);
     ////console.log('TopButtons');
   }
//     <GoogleConnect mode = "login"/>


  render() {

    const { classes,modeChanged, SelectedApp, siteDialogOpen, siteDialogClose,
       showAppListDialog, SelectedFunc, ShowFuncListDialog, funcDialogOpen , funcDialogClose, Title} = this.props;

  //  var pageTitle = SelectedApp + '/' + SelectedFunc;


    return (
         <Toolbar>
             <IconButton className={classes.menuButton} color="inherit"
                aria-label="Menu" onClick= { ()=>
                    {
                      if(ShowFuncListDialog)
                        funcDialogClose();
                      else
                        funcDialogOpen();
                    }
                  }>
                 <MenuIcon />
             </IconButton>

             <Button color="inherit"  className={classes.grow}>
                 <Typography variant="h6" color="inherit"  className ={classes.tolowerBtn}>
                     {Title}
                 </Typography>
             </Button>
             <IconButton className={classes.menuButton} color="inherit"
               aria-label="Menu"  onClick={()=>{
                  if(showAppListDialog)
                    siteDialogClose();
                  else
                    siteDialogOpen();
                  }}>
                 <AppsIcon />
             </IconButton>
             <IDSConnect mode = "login"/>

         </Toolbar>
     )
   }

}

TopButtons.propTypes = {
  classes: PropTypes.object.isRequired,
  modeChanged : PropTypes.func
};

TopButtons.defaultProps  = {
  isData: true
};


const mapStateToProps = state => {
// console.log('top buttons ' );
  let appName =  state.ux.appName;
  let appList =  state.ux.appList;

  let funcName =  state.ux.funcName;
  let funcList =  state.ux.funcList;

  let showAppListDialog =  state.ux.showAppListDialog;
  let showFuncListDialog = state.ux.showFuncListDialog;

  let selectedApp ='Unknown';
  let selectedFunc = 'Unknown';
  let title ='';
  let idx=0;

  if(appList && appList.length >0){
    idx=0;

    while(idx < appList.length){
      if(appList[idx].id == appName){
        selectedApp = appList[idx].defaultPageTitle;
        title =  appList[idx].defaultPageTitle;
      }

      idx++;
    }
  }

  if(funcList && funcList.length >0){
    idx=0;

    while(idx < funcList.length){
      if(funcList[idx].id == funcName){
        selectedFunc = funcList[idx].pageTitle;
        title =  funcList[idx].pageTitle;
      }

      idx++;
    }
  }


  return {
    Title : title,
    SelectedFunc : selectedFunc,
    SelectedApp: selectedApp,
    ShowAppListDialog :showAppListDialog,
    ShowFuncListDialog :showFuncListDialog
  };
};

const mapDispatchToProps = dispatch => {
  return {
    applicationListLoad: (list) => dispatch(applicationListLoad(list)),
    funcDialogOpen: () => dispatch(funcDialogOpen()),
    funcDialogClose: () => dispatch(funcDialogClose()),
    siteDialogOpen: () => dispatch(siteDialogOpen()),
    siteDialogClose: () => dispatch(siteDialogClose())
    //
  };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TopButtons));

import  React, { useState, useEffect }  from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import PlayArrow from '@material-ui/icons/PlayArrow';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AvailableTrees from './Tables/AvailableTrees/AvailableTrees.jsx'
import TreePeople from './Tables/TreePeople/TreePeople.jsx'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useTheme } from '@material-ui/core/styles';

import {treeSelector} from '../styleFuncs.jsx';

import {funcSelected, funcDialogOpen , funcDialogClose,treeSelectorDialogClose} from "../uxActions.jsx";


import { connect } from "react-redux";

// const styles = theme => ({

//   toolbarButtons: {
//     marginLeft: 'auto',
//   },

//   root: {
//     paddingRight: theme.spacing(1),
//     minHeight : window.innerHeight -10
//   },

//   list: {
//     width: 420,
//   },

//   fullList: {
//     width: 'auto',
//   },
//   mygrid:{
//     margin:'0px'
//   },
//   input:{
//     width: '100px'
//   },
//   label: {

//     textAlign: 'center',

//   },
//   toolBar: {
//     paddingLeft :'12px',
//     minHeight: '0px'
//   },
//   menuButton: {
//     marginLeft: -12,
//     marginRight: 20,
//   },
//   appBar: {
//      top: 'auto',
//      bottom: 0,
//    },
// });

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (

          <div>{children}</div>

      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TreeSelector(props) {
    //
    const { treeSelectorDialogClose, selectedTreeData, selectedTreePersonData} = props;
            
    const theme = useTheme();
    const classes = treeSelector(theme); 
    
    useEffect(() => console.log('TreeSelector loaded ' ), []);

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    let treeName ='Select_Tree';
    let personName = 'Select Person';
    
    let personId =0;

    if(selectedTreeData  ){
      let count = selectedTreeData.split(' ');
      if(count.length > 0)
        treeName = String(count.length) + ' trees selected';
      else
        treeName  = selectedTreeData; 
    }

    if(selectedTreePersonData && selectedTreePersonData.firstName && selectedTreePersonData.surname)
    {
      personName  = selectedTreePersonData.firstName + ' ' + selectedTreePersonData.surname;
      personId = selectedTreePersonData.id;
    }

    return (
        <div className = "inner">
          <AppBar position="static">
            <Toolbar>
                <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={()=>{
                      treeSelectorDialogClose(); //hopefully this is open when it's being cliucked on
                  }} >
                  <SearchIcon/>
                </IconButton>




                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                  <Tab label= {treeName} {...a11yProps(0)} />
                  <Tab label= {personName}{...a11yProps(1)} />

                </Tabs>


            </Toolbar>
          </AppBar>



          <TabPanel value={value} index={0}>
            <AvailableTrees></AvailableTrees>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TreePeople></TreePeople>
             
            <Toolbar>
              <div className={classes.toolbarButtons}>
                  <Button color="inherit" className ={classes.tolowerBtn}>
                    <Typography variant="h6" color="inherit" >
                      Run
                    </Typography>
                  </Button>

                  <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={()=>{
                      alert(treeName + ' ' +personId);
                  }} >
                  <PlayArrow/>
                </IconButton>
                </div>
            </Toolbar>

          </TabPanel>



        </div>
    );

}

 

const mapStateToProps = state => {
  return {
    selectedTreeData : state.ux.selectedTreeData,
    selectedTreePersonData : state.ux.selectedTreePersonData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    funcSelected: (selectedApp) => dispatch(funcSelected(selectedApp)),
    funcDialogOpen: () => dispatch(funcDialogOpen()),
    treeSelectorDialogClose : ()=>dispatch(treeSelectorDialogClose()),
    funcDialogClose: () => dispatch(funcDialogClose()),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(TreeSelector);

import  React, { useState, useEffect }  from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import PlayArrow from '@mui/icons-material/PlayArrow';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AvailableTrees from './Tables/AvailableTrees/AvailableTrees.jsx'
import TreePeople from './Tables/TreePeople/TreePeople.jsx'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useTheme } from '@mui/material/styles';

import {treeSelector} from '../styleFuncs.jsx';

import {funcSelected, funcDialogOpen , funcDialogClose,treeSelectorDialogClose} from "../uxActions.jsx";


import { connect } from "react-redux";


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

    if(selectedTreeData && selectedTreeData.origin){
      let count =String(selectedTreeData.origin).split(',').length-1;
      if(count > 0)
        treeName = String(count+1) + ' trees selected';
      else
        treeName  = selectedTreeData.originDescription; 
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
              <IconButton
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
                onClick={()=>{
                      treeSelectorDialogClose(); //hopefully this is open when it's being cliucked on
                  }}
                size="large">
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

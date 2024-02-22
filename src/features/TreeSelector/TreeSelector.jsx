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
import { getParams, csvToValidatedArr } from '../../features/Table/qryStringFuncs.jsx';


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


function TreeSelector(props) {
    //
    //console.log('TreeSelector loaded ');
    const { treeSelectorDialogClose, selectedTreeCache, selectedPersonCache, selectedTreePerson} = props;
            
    const theme = useTheme();
    const classes = treeSelector(theme); 
    console.log('TreeSelector loaded ' )

    let qs = getParams();

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    let treeName ='Select_Tree';
    let personName = 'Select Person';
    
    let personId =0;

    let personNames = csvToValidatedArr(selectedPersonCache,qs.persons);

    let treeNames = csvToValidatedArr(selectedTreeCache,qs.origin);

    console.log('trees ' + treeNames);

  
    if(treeNames.length > 0)  {
      let count = treeNames.length;
      if(count > 1)
        treeName = String(count) + ' trees selected';
      else
        treeName  = treeNames[0]; 
    }

    if(personNames.length > 0)  {
      let count2 = personNames.length;
      if(count2 > 1)
        personName = String(count2) + ' persons selected';
      else
        personName  = personNames[0]; 
    }


    return (
      <div className = "inner">
        <AppBar position="static">
          <Toolbar>
              <IconButton
                style = {{marginLeft: '25px'}}
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
                onClick={()=>{
                      treeSelectorDialogClose(); //hopefully this is open when it's being cliucked on
                  }}
                size="large">
                <SearchIcon/>
              </IconButton>
              <Tabs value={value} onChange={handleChange}>
                <Tab id = 'simple-tab-0' aria-controls = 'simple-tabpanel-0' label= {treeName} style={{color: 'black'}} />
                <Tab id = 'simple-tab-1' aria-controls = 'simple-tabpanel-1' label= {personName}  style={{color: 'black'}} />
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
    selectedTreeCache : state.ux.selectedTreeCache,
    selectedPersonCache : state.ux.selectedPersonCache,
    selectedTree : state.ux.selectedTree,
    selectedTreePerson : state.ux.selectedTreePerson,
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

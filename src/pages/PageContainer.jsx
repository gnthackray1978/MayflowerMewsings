import React, { Component , useEffect} from 'react';
import Default from './Default.jsx'; 
import FTMDupes from './FTMDupes.jsx';
import FTMPersons from './FTMPersons.jsx';
import FTMTrees from './FTMTrees.jsx'; 

import PTombstones from './imagePages/PTombstones.jsx';
import HuntsWills from './imagePages/HuntsWills.jsx';
import YorksWills from './imagePages/YorksWills.jsx';
import Deeds from './imagePages/Deeds.jsx';
import BMDs from './imagePages/BMDs.jsx';
import Trees from './imagePages/Trees.jsx';
import Marriages from './imagePages/Marriages.jsx';

import TBirths from './TBirths.jsx';
import TMarriages from './TMarriages.jsx';
import TSources from './TSources.jsx';
import WLincolnshire from './WLincolnshire.jsx';  
import WNorfolk from './WNorfolk.jsx';
import Ancestrymatches from './Ancestrymatches.jsx';  
import MapPerson from './maps/treePersonLocations/MapPerson';
import HeatMap from './maps/treePersonHeatMaps/HeatMap';
import GroupPlotter from './maps/groupPlotter/GroupPlotter';
import Ancestors from './diagrams/ancestors/Ancestors';
import Descendants from './diagrams/descendants/Descendants';
import FDDescendants from './diagrams/fddescendants/FDDescendants';
import Tools from './tools/Tools.jsx';
import ControlPanel from './controlpanel/ControlPanel.jsx';

import {Routes,Route} from "react-router-dom";

 

function PageContainer(props) {
 
    return (
      <Routes>
          <Route  path="/ftmpersons" element = {<FTMPersons/>}/>
          <Route  path="/ancestrymatches" element= {<Ancestrymatches/>}/>
          <Route  path="/ftmtrees" element= {<FTMTrees/>}/>
          <Route  path="/ftmdupes" element= {<FTMDupes/>}/>

         
          <Route  path="/wnorfolk" element= {<WNorfolk/>}/>
          <Route  path="/wlincolnshire" element= {<WLincolnshire/>}/>

          <Route  path="/tsources" element= {<TSources/>}/>
          <Route  path="/tmarriages" element= {<TMarriages/>}/>
          <Route  path="/tbirths" element= {<TBirths/>}/>

          <Route  path="/huntswills" element= {<HuntsWills/>}/>
          <Route  path="/ptombstones" element= {<PTombstones/>}/>
          <Route  path="/yorkswills" element= {<YorksWills/>}/>
          <Route  path="/bmds" element= {<BMDs/>}/>
          <Route  path="/deeds" element= {<Deeds/>}/>
          <Route  path="/marriages" element= {<Marriages/>}/>
          <Route  path="/trees" element= {<Trees/>}/>
          <Route  path="/tools" element= {<Tools/>}/>
          <Route  path="/maps" element= {<MapPerson/>}/>
          <Route  path="/heatmaps" element= {<HeatMap/>}/>
          <Route  path="/groupplotter" element= {<GroupPlotter/>}/>

          <Route  path="/ancestors" element= {<Ancestors/>}/>
          <Route  path="/descendants" element= {<Descendants/>}/>
          <Route  path="/fddescendants" element= {<FDDescendants/>}/>
          <Route  path="/controlpanel" element= {<ControlPanel/>}/>

          <Route path="/" element= {<Default/>}/>

        </Routes>
      );


}
 
export default PageContainer;
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

import {Routes,Route} from "react-router-dom";

 

function PageContainer(props) {
 
    return (
      <Routes>
          <Route  path="/ftmpersons" render = {()=><FTMPersons/>}/>
          <Route  path="/ancestrymatches" component= {()=><Ancestrymatches/>}/>
          <Route  path="/ftmtrees" component= {()=><FTMTrees/>}/>
          <Route  path="/ftmdupes" component= {()=><FTMDupes/>}/>

         
          <Route  path="/wnorfolk" component= {()=><WNorfolk/>}/>
          <Route  path="/wlincolnshire" component= {()=><WLincolnshire/>}/>

          <Route  path="/tsources" component= {()=><TSources/>}/>
          <Route  path="/tmarriages" component= {()=><TMarriages/>}/>
          <Route  path="/tbirths" component= {()=><TBirths/>}/>

          <Route  path="/huntswills" component= {()=><HuntsWills/>}/>
          <Route  path="/ptombstones" component= {()=><PTombstones/>}/>
          <Route  path="/yorkswills" component= {()=><YorksWills/>}/>
          <Route  path="/bmds" component= {()=><BMDs/>}/>
          <Route  path="/deeds" component= {()=><Deeds/>}/>
          <Route  path="/marriages" component= {()=><Marriages/>}/>
          <Route  path="/trees" component= {()=><Trees/>}/>
          <Route  path="/tools" component= {()=><Tools/>}/>
          <Route  path="/maps" component= {()=><MapPerson/>}/>
          <Route  path="/heatmaps" component= {()=><HeatMap/>}/>
          <Route  path="/groupplotter" component= {()=><GroupPlotter/>}/>

          <Route  path="/ancestors" component= {()=><Ancestors/>}/>
          <Route  path="/descendants" component= {()=><Descendants/>}/>
          <Route  path="/fddescendants" component= {()=><FDDescendants/>}/>
          

          <Route path="/" component= {()=><Default/>}/>

        </Routes>
      );


}
 
export default PageContainer;
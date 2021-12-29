import React, { Component , useEffect} from 'react';
import Default from './Default.jsx';
import Diagrams from './Diagrams.jsx';
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
import MapPerson from './maps/treePersonLocations/MapPerson'
import HeatMap from './maps/treePersonHeatMaps/HeatMap'

import {
  Switch,
  Route,
    BrowserRouter as Router,

} from "react-router-dom";

 

function PageContainer(props) {
 
    return (
      <Switch>
          <Route exact path="/ftmpersons" render = {()=><FTMPersons/>}/>
          <Route exact path="/ancestrymatches" component= {()=><Ancestrymatches/>}/>
          <Route exact path="/ftmtrees" component= {()=><FTMTrees/>}/>
          <Route exact path="/ftmdupes" component= {()=><FTMDupes/>}/>

          <Route exact path="/diagrams" component= {()=><Diagrams/>}/>

          <Route exact path="/wnorfolk" component= {()=><WNorfolk/>}/>
          <Route exact path="/wlincolnshire" component= {()=><WLincolnshire/>}/>

          <Route exact path="/tsources" component= {()=><TSources/>}/>
          <Route exact path="/tmarriages" component= {()=><TMarriages/>}/>
          <Route exact path="/tbirths" component= {()=><TBirths/>}/>

          <Route exact path="/huntswills" component= {()=><HuntsWills/>}/>
          <Route exact path="/ptombstones" component= {()=><PTombstones/>}/>
          <Route exact path="/yorkswills" component= {()=><YorksWills/>}/>
          <Route exact path="/bmds" component= {()=><BMDs/>}/>
          <Route exact path="/deeds" component= {()=><Deeds/>}/>
          <Route exact path="/marriages" component= {()=><Marriages/>}/>
          <Route exact path="/trees" component= {()=><Trees/>}/>

          <Route exact path="/maps" component= {()=><MapPerson/>}/>
          <Route exact path="/heatmaps" component= {()=><HeatMap/>}/>
          
          <Route path="/" component= {()=><Default/>}/>

        </Switch>
      );


}
 
export default PageContainer;
import React, { Component , useEffect} from 'react';
import Default from './Default.jsx'; 
import Blog from './Blog.jsx'; 

import Dupes from './search/Dupes.jsx';
import MarriageSearch from './search/MarriageSearch.jsx';
import Persons from './search/Person.jsx';
import FTMView from './search/FTMView.jsx';
import Poi from './search/Poi.jsx';
import Trs from './search/trs.jsx';
import LincsWills from './search/LincsWills.jsx';
import NorfolkWills from './search/NorfolkWills.jsx';

import Sources from './sources/Source.jsx';
import ImagePage from './imagePages/ImagePage.jsx';
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
          <Route  path="/ftmpersons" element = {<FTMView/>}/>
          <Route  path="/ancestrymatches" element= {<Poi/>}/>
          <Route  path="/ftmtrees" element= {<Trs/>}/>
          <Route  path="/ftmdupes" element= {<Dupes/>}/>         
          <Route  path="/wnorfolk" element= {<NorfolkWills/>}/>
          <Route  path="/wlincolnshire" element= {<LincsWills/>}/>
          <Route  path="/tsources" element= {<Sources/>}/>
          <Route  path="/tmarriages" element= {<MarriageSearch/>}/>
          <Route  path="/tbirths" element= {<Persons/>}/>

          {/* images */}
          <Route  path="/huntswills" element= {<ImagePage/>}/>
          <Route  path="/ptombstones" element= {<ImagePage/>}/>
          <Route  path="/yorkswills" element= {<ImagePage/>}/>
          <Route  path="/bmds" element= {<ImagePage/>}/>
          <Route  path="/deeds" element= {<ImagePage/>}/>
          <Route  path="/marriages" element= {<ImagePage/>}/>
          <Route  path="/trees" element= {<ImagePage/>}/>



          <Route  path="/tools" element= {<Tools/>}/>
          <Route  path="/maps" element= {<MapPerson/>}/>

          <Route  path="/heatmaps" element= {<HeatMap/>}/>
          <Route  path="/groupplotter" element= {<GroupPlotter/>}/>

          <Route  path="/ancestors" element= {<Ancestors/>}/>
          <Route  path="/descendants" element= {<Descendants/>}/>
          <Route  path="/fddescendants" element= {<FDDescendants/>}/>
          <Route  path="/controlpanel" element= {<ControlPanel/>}/>

          <Route path="/blog" element= {<Blog/>}/>
          <Route path="/default" element= {<Default/>}/>
          <Route path="/" element= {<Default/>}/>
        </Routes>
      );


}
 
export default PageContainer;
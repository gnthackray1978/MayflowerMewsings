import React from 'react';
import Default from './Default.jsx';
import Diagrams from './Diagrams.jsx';
import FTMDupes from './FTMDupes.jsx';
import FTMPersons from './FTMPersons.jsx';
import FTMTrees from './FTMTrees.jsx';
import Maps from './Maps.jsx';
import PTombstones from './imagePages/PTombstones.jsx';
import PWills from './imagePages/PWills.jsx';
import TBirths from './TBirths.jsx';
import TMarriages from './TMarriages.jsx';
import TSources from './TSources.jsx';
import WLincolnshire from './WLincolnshire.jsx';  
import WNorfolk from './WNorfolk.jsx';
import Ancestrymatches from './Ancestrymatches.jsx';

import {
  Switch,
  Route,
    BrowserRouter as Router,

} from "react-router-dom";


function PageContainer(props) {


    // var tp = (state)=>{
    //   return {
    //     funcList: state.ux.funcList
    //   }
    // };
    //
    // const { funcList} = useSelector(tp,shallowEqual);

  //  var page = getPageName(location.pathname, funcList);


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

          <Route exact path="/pwills" component= {()=><PWills/>}/>
          <Route exact path="/ptombstones" component= {()=><PTombstones/>}/>

          <Route exact path="/maps" component= {()=><Maps/>}/>

          <Route path="/" component= {()=><Default/>}/>

        </Switch>
      );


}


export default PageContainer;

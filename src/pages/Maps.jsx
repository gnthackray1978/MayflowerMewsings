import  React, { useState, useEffect }  from 'react';
import { withStyles } from '@material-ui/core/styles';
import MapPerson from './maps/dna/persons/MapPerson'
import { connect } from "react-redux";
 
const styles = theme => ({

});

function Maps(props) {
    const {className, theme, classes} = props;
   
  //  useEffect(() => console.log('Maps componentDidMount' ), []);

    return (
      <div>
        <MapPerson></MapPerson>
      </div>
  );

}


export default withStyles(styles)(Maps);

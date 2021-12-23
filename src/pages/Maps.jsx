import  React, { useState, useEffect }  from 'react';
import MapPerson from './maps/dna/persons/MapPerson'

function Maps(props) {
    const {className, theme, classes} = props;
   
  //  useEffect(() => console.log('Maps componentDidMount' ), []);

    return (
      <div>
        <MapPerson></MapPerson>
      </div>
  );

}


export default Maps;

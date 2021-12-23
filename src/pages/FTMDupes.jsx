import React, { Component } from 'react';
import Dupes from './table/dna/dupes/Dupes.jsx'

function FTMDupes(props) {

    const {className, theme, classes} = props;

    return (
        <div>
          <Dupes></Dupes>
        </div>
    );

}


export default FTMDupes;

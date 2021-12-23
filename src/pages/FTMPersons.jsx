import React, { Component } from 'react';
import FTMView from './table/dna/FTMView/FTMView.jsx'


function FTMPersons(props) {

    const {className, theme, classes} = props;

    return (
        <div>
          <FTMView></FTMView>
        </div>
    );

}


export default FTMPersons;

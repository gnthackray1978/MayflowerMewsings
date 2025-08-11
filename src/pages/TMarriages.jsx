import React, { Component } from 'react';
import MarriageSearch from './table/adb/marriages/MarriageSearch.jsx'

function TMarriages(props) {

    const {className, theme, classes} = props;

    return (
        <div>
          <MarriageSearch/>
        </div>
    );

}


export default TMarriages;

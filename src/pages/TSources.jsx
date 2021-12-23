import React, { Component } from 'react';
import Sources from './table/adb/sources/Source.jsx'

function TSources(props) {

    const {className, theme, classes} = props;

    return (
        <div>
          <Sources/>
        </div>
    );

}


export default TSources;

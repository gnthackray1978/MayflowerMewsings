import React, { Component } from 'react';
import Marriages from './table/adb/marriages/Marriage.jsx'

function TMarriages(props) {

    const {className, theme, classes} = props;

    return (
        <div>
          <Marriages/>
        </div>
    );

}


export default TMarriages;

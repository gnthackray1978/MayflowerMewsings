import React, { Component } from 'react';
import NorfolkWills from './table/wills/NorfolkWills.jsx'

function WNorfolk(props) {

    const {className, theme, classes} = props;

    return (
        <div>
          <NorfolkWills></NorfolkWills>
        </div>
    );

}


export default WNorfolk;

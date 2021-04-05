import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Persons from './table/adb/persons/Person.jsx'
import { connect } from "react-redux";

const styles = theme => ({

});

function TBirths(props) {

    const {className, theme, classes} = props;

    return (
        <div>
          <Persons/>
        </div>
    );

}


export default withStyles(styles)(TBirths);

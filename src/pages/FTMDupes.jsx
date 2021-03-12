import React, { Component } from 'react';
import Dupes from './table/dna/dupes/Dupes.jsx'
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";

const styles = theme => ({

});

function FTMDupes(props) {

    const {className, theme, classes} = props;

    return (
        <div>
          <Dupes></Dupes>
        </div>
    );

}


export default withStyles(styles)(FTMDupes);

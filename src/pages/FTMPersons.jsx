import React, { Component } from 'react';
import FTMView from './table/dna/FTMView/FTMView.jsx'
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";

const styles = theme => ({

});

function FTMPersons(props) {

    const {className, theme, classes} = props;

    return (
        <div>
          <FTMView></FTMView>
        </div>
    );

}


export default withStyles(styles)(FTMPersons);

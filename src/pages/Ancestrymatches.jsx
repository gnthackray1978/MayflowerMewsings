import React, { Component } from 'react';
import Poi from './table/dna/poi/Poi.jsx'
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";

const styles = theme => ({

});

function WLincolnshire(props) {

    const {className, theme, classes} = props;

    return (
        <div>
          <Poi></Poi>
        </div>
    );

}


export default withStyles(styles)(WLincolnshire);

import React, { Component } from 'react';
import LincsWills from './table/LincsWills.jsx'
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";

const styles = theme => ({

});

function WLincolnshire(props) {

    const {className, theme, classes} = props;

    return (
        <div>
          <LincsWills></LincsWills>
        </div>
    );

}


export default withStyles(styles)(WLincolnshire);

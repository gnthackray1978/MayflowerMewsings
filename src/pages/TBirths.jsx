import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";

const styles = theme => ({

});

function TBirths(props) {

    const {className, theme, classes} = props;

    return (
        <div>
          TBirths
        </div>
    );

}


export default withStyles(styles)(TBirths);

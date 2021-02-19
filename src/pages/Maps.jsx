import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";

const styles = theme => ({

});

function Maps(props) {

    const {className, theme, classes} = props;

    return (
        <div>
          Maps
        </div>
    );

}


export default withStyles(styles)(Maps);

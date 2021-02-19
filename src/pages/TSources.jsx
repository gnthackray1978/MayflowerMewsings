import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";

const styles = theme => ({

});

function TSources(props) {

    const {className, theme, classes} = props;

    return (
        <div>
          TSources
        </div>
    );

}


export default withStyles(styles)(TSources);

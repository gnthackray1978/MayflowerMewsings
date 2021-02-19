import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";

const styles = theme => ({

});

function FTMTrees(props) {

    const {className, theme, classes} = props;

    return (
        <div>
          FTMTrees
        </div>
    );

}


export default withStyles(styles)(FTMTrees);

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";

const styles = theme => ({

});

function PTombstones(props) {

    const {className, theme, classes} = props;

    return (
        <div>
          Tombstone pictures
        </div>
    );

}


export default withStyles(styles)(PTombstones);

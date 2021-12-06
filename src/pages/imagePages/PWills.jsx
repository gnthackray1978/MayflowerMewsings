import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";

const styles = theme => ({

});

function PWills(props) {

    const {className, theme, classes} = props;

    return (
        <div>
          PWills
        </div>
    );

}


export default withStyles(styles)(PWills);

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";

const styles = theme => ({

});

function WLincolnshire(props) {

    const {className, theme, classes} = props;

    return (
        <div>
          Lincolnshire Wills
        </div>
    );

}


export default withStyles(styles)(WLincolnshire);

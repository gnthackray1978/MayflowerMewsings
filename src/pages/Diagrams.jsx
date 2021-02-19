import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";

const styles = theme => ({

});

function Diagrams(props) {

    const {className, theme, classes} = props;

    return (
        <div>
          Diagrams
        </div>
    );

}


export default withStyles(styles)(Diagrams);

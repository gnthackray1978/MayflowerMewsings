import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Sources from './table/adb/sources/Source.jsx'
import { connect } from "react-redux";

const styles = theme => ({

});

function TSources(props) {

    const {className, theme, classes} = props;

    return (
        <div>
          <Sources/>
        </div>
    );

}


export default withStyles(styles)(TSources);

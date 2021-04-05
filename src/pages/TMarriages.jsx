import React, { Component } from 'react';
import Marriages from './table/adb/marriages/Marriage.jsx'
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";

const styles = theme => ({

});

function TMarriages(props) {

    const {className, theme, classes} = props;

    return (
        <div>
          <Marriages/>
        </div>
    );

}


export default withStyles(styles)(TMarriages);

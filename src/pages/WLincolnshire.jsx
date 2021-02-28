import React, { Component } from 'react';
import WillTable from './table/WillTable.jsx'
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";

const styles = theme => ({

});

function WLincolnshire(props) {

    const {className, theme, classes} = props;

    return (
        <div>
          <WillTable></WillTable>
        </div>
    );

}


export default withStyles(styles)(WLincolnshire);

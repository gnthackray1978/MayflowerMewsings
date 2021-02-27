import React, { Component } from 'react';
import EnhancedTable from './table/EnhancedTable.jsx'
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";

const styles = theme => ({

});

function WLincolnshire(props) {

    const {className, theme, classes} = props;

    return (
        <div>        
          <EnhancedTable></EnhancedTable>
        </div>
    );

}


export default withStyles(styles)(WLincolnshire);

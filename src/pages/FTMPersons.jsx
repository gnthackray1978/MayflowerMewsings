import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";

const styles = theme => ({

});

function FTMPersons(props) {

    const {className, theme, classes} = props;

    return (
        <div>
          FTM Persons
        </div>
    );

}


export default withStyles(styles)(FTMPersons);

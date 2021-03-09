import React, { Component } from 'react';
import NorfolkWills from './table/NorfolkWills.jsx'
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";

const styles = theme => ({

});

function WNorfolk(props) {

    const {className, theme, classes} = props;

    return (
        <div>
          <NorfolkWills></NorfolkWills>
        </div>
    );

}


export default withStyles(styles)(WNorfolk);

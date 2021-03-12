import React, { Component } from 'react';
import Trs from './table/dna/treerecsearch/trs.jsx'
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";

const styles = theme => ({

});

function FTMTrees(props) {

    const {className, theme, classes} = props;

    return (
        <div>
          <Trs></Trs>
        </div>
    );

}


export default withStyles(styles)(FTMTrees);

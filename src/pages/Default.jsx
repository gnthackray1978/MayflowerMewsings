import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";

const styles = theme => ({

});

function Default(props) {
        
    const {className, theme, classes, visible} = props;

    if(!visible) return null;

    return (
        <div>
          Main page
        </div>
    );

}




const mapStateToProps = state => {
  return {

  };
};

const mapDispatchToProps = dispatch => {
  return {

  };
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Default));

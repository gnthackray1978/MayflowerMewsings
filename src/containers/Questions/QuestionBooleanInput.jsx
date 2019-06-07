import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import DirectionsIcon from '@material-ui/icons/Directions';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import { connect } from "react-redux";


const styles = theme => ({
  root: {
     padding: '2px 4px',
     display: 'flex',
     alignItems: 'center',
     width: 301,
     height :48
   },
   rg: {
     marginLeft: 8,
     marginTop: 8,
   },




});


const QuestionBooleanInput = props =>   <Paper className={props.classes.root} elevation={1}>
        <FormControl component="fieldset">
        <RadioGroup aria-label="position" name="position" onChange={props.onChange} value ={props.answer} row  className ={props.classes.rg}>
          <FormControlLabel
            value="true"
            control={<Radio color="primary" />}
            label="True"
            labelPlacement="end"
          />
          <FormControlLabel
            value="false"
            control={<Radio color="primary" />}
            label="False"
            labelPlacement="end"
          />
        </RadioGroup>
      </FormControl>

  </Paper>;


export default withStyles(styles)(QuestionBooleanInput);

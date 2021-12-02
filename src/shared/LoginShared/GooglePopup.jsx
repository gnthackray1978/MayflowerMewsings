import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React, { Component } from 'react';
import blue from '@material-ui/core/colors/blue';
import { withStyles } from '@material-ui/core/styles';
import {PropTypes} from 'prop-types';

const styles = theme => ({
  // fab: {
  //   margin: theme.spacing(1),
  // },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  root: {
  flexGrow: 1,
  },
  grow: {
    marginLeft: 50,
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  tolowerBtn : {
    textTransform: 'none'
  },
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },

});


class GooglePopup extends React.Component {

  constructor(props) {
    super(props)
  //  //console.log('GooglePopup');
  }

  handleClose = () => {
  //  this.props.onClose(false);
  };


  render() {

    const {googleTokenExpiration,idsTokenExpiration,  open,children } = this.props;
    
    if(!googleTokenExpiration)
      googleTokenExpiration = Date();

    if(!idsTokenExpiration)
      idsTokenExpiration = Date();

    // googleTokenExpiration ={googleTokenExpiration}
    // idsTokenExpiration ={idsTokenExpiration}

    if(this.props.ProfileObj == undefined){
     
      return null;
    }

    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open = {open}>

        <div>


          <List>
            <ListItem>
              <ListItemText primary= "Name" secondary = {this.props.ProfileObj.name} />
            </ListItem>
            <ListItem>
              <ListItemText primary= "Email"  secondary={this.props.ProfileObj.email}/>
            </ListItem>
            <ListItem>
              <ListItemText primary= "First Name"  secondary={this.props.ProfileObj.givenName}/>
            </ListItem>
            <ListItem>
              <ListItemText primary= "Surname" secondary={this.props.ProfileObj.familyName}/>
            </ListItem>
            <ListItem>
              <ListItemText primary= "Google Expiration"  secondary={googleTokenExpiration.toLocaleString("en-GB")}/>
            </ListItem>
            <ListItem>
              <ListItemText primary= "IDS Expiration" secondary={idsTokenExpiration.toLocaleString("en-GB")}/>
            </ListItem>
            <ListItem>
                {children}
            </ListItem>


          </List>


        </div>
      </Dialog>
    );
  }
}

GooglePopup.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
};

export default withStyles(styles)(GooglePopup);

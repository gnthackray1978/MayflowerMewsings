import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React, { Component } from 'react';
import { useTheme } from '@material-ui/core/styles';
import {googlePopup} from "./styles/styles.jsx";

function GooglePopup(props){

    var handleClose = () => {
      //  this.props.onClose(false);
    };

    const theme = useTheme();
    const classes = googlePopup(theme);

    const {open,children,ProfileObj } = props;
   
    if(!ProfileObj){
      return null;
    }

    let jsUserExpiresAt = new Date(ProfileObj.exp *1000);

    return (
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open = {open}>

        <div>


          <List>
            <ListItem className = {classes.listItem}>
              <ListItemText primary= "Name" secondary = {ProfileObj.name} />
            </ListItem>
            <ListItem className = {classes.listItem}>
              <ListItemText primary= "Email"  secondary={ProfileObj.email}/>
            </ListItem>
            <ListItem className = {classes.listItem}>
              <ListItemText primary= "First Name"  secondary={ProfileObj.given_name}/>
            </ListItem>
            <ListItem className = {classes.listItem}>
              <ListItemText primary= "Surname" secondary={ProfileObj.family_name}/>
            </ListItem>
            <ListItem className = {classes.listItem}>
              <ListItemText primary= "Google Expiration"  secondary={jsUserExpiresAt.toLocaleDateString('gb-en') + ' ' + jsUserExpiresAt.toLocaleTimeString('en-GB')}/>
            </ListItem>
            
            <ListItem>
                {children}
            </ListItem>


          </List>
 

        </div>
      </Dialog>
    );
  
}



export default GooglePopup;

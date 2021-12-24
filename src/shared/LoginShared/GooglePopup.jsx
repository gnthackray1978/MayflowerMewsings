import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React, { Component } from 'react';



function GooglePopup(props){

    var handleClose = () => {
      //  this.props.onClose(false);
    };

    const {googleTokenExpiration,idsTokenExpiration,  open,children,ProfileObj } = props;
    
    if(!googleTokenExpiration)
      googleTokenExpiration = Date();

    if(!idsTokenExpiration)
      idsTokenExpiration = Date();

    // googleTokenExpiration ={googleTokenExpiration}
    // idsTokenExpiration ={idsTokenExpiration}

    if(!ProfileObj){
      return null;
    }

    return (
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open = {open}>

        <div>


          <List>
            <ListItem>
              <ListItemText primary= "Name" secondary = {ProfileObj.name} />
            </ListItem>
            <ListItem>
              <ListItemText primary= "Email"  secondary={ProfileObj.email}/>
            </ListItem>
            <ListItem>
              <ListItemText primary= "First Name"  secondary={ProfileObj.givenName}/>
            </ListItem>
            <ListItem>
              <ListItemText primary= "Surname" secondary={ProfileObj.familyName}/>
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



export default GooglePopup;

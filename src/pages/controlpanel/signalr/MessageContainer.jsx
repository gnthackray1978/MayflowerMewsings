import React, { useEffect, useRef ,useState} from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {useStyles} from './styleFuncs.jsx';
import { useTheme } from '@mui/material/styles';
import Link from '@mui/material/Link';

const MessageContainer = ({ messages,clearClicked }) => {
 
    const theme = useTheme();
    const classes = useStyles(theme);
    const [announcementsVisible, setAnnouncementsVisible] = useState(true);
    const [refreshsVisible, setRefreshsVisible] = useState(false);
    const [operationsVisible, setOperationsVisible] = useState(true);
    // const messageRef = useRef();

    // useEffect(() => {
    //     if (messageRef && messageRef.current) {
    //         const { scrollHeight, clientHeight } = messageRef.current;
    //         messageRef.current.scrollTo({ left: 0, top: scrollHeight - clientHeight, behavior: 'smooth' });
    //     }
    // }, [messages]);



    let filterMessages =[];

    if(messages){
        for(let m of messages){
            if(m.msgType === 'announce' && announcementsVisible){
                filterMessages.push(m.message);
            }
            if(m.msgType === 'refresh' && refreshsVisible){
                filterMessages.push(m.message);
            }
            if(m.msgType === 'crud' && operationsVisible){
                filterMessages.push(m.message);
            }
            if(m.msgType === 'error' ){
                filterMessages.push(m.message);
            }
        }
    }
      // ref={messageRef}
    return <div className='message-container' >
     
        <FormGroup aria-label="position" row >      
            <FormControlLabel checked={announcementsVisible} value="start" sx={{ marginLeft:0}} 
            control={<Checkbox  onChange={e => {setAnnouncementsVisible(e.target.checked);}}
           sx={{padding: '0px' }} />}  label="Announcements"  labelPlacement="start"  />        
            <FormControlLabel checked={refreshsVisible} value="start" sx={{ marginLeft:5}} 
            control={<Checkbox  onChange={e => {setRefreshsVisible(e.target.checked);}}
            sx={{padding: '0px' }} />}  label="Refreshes"  labelPlacement="start"  />        
            <FormControlLabel checked={operationsVisible} value="start" sx={{ marginLeft:5}} 
            control={<Checkbox  onChange={e => {setOperationsVisible(e.target.checked);}}
            sx={{padding: '0px' }} />}  label="Operations"  labelPlacement="start"  />     
            <Link href="#" onClick = {(event,id)=>{clearClicked(event)} }  style = {{marginLeft :25}}>Clear</Link>

        </FormGroup>

        <div className = {classes.scroll}>
        {filterMessages.map((m, index) =>
            <div key={index} className = {classes.scrollitem} >  {m}   </div>
        )}
        </div>
    </div>
}

export default MessageContainer;
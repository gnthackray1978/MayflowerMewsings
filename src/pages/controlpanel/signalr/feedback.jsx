import { useState,useEffect } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import MessageContainer from './MessageContainer.jsx';

export default function Feedback(props) {

    const [connection, setConnection] = useState();
    const [messages, setMessages] = useState([{ msgType: 'announce', message: 'starting up'}]);
    //const [users, setUsers] = useState([]);


    const start = () => {
      try {
        const connection = new HubConnectionBuilder()
                            //.withUrl("https://msgapiinput01.azurewebsites.net/hub/msgnotificationhub",
                            .withUrl("http://localhost:5001/hub/msgnotificationhub",
                                { withCredentials: false })
                            .configureLogging(LogLevel.Information)
                            .build();
      
        connection.on("announce", function (message1, message2) {                            
          //  console.log("Notify" + user + ' ' + message);     
            let t = message1 + ' ' + message2;
           
            setMessages( messages => [...messages, { msgType:'announce' , message: t }]);                 
        });
        
        connection.on("crud", function (message1, message2) {                            
            //console.log("crud" + message1 + ' ' + message2 + ' ' + messages[0].message);     
           //let t = [...messages, { msgType:'crud' , message: message1 }] ;
           
            setMessages(messages =>[...messages, { msgType:'crud' , message: message1 }] );                 
        });

        connection.on("refresh", function (message1, message2) {                            
          //  console.log("Notify" + user + ' ' + message);     
         //   let t = 'refresh: ' + message1;
           
            setMessages( messages => [...messages, { msgType:'refresh' , message: message1 }]);                 
        });

        connection.onclose(e => {
      //    setConnection();        
        });
  
        try {
            connection.start();
            console.log("SignalR Connected."); 
 
        } catch (err) {
            console.log(err);
          //  setTimeout(start, 5000);
        }

        setConnection(connection);


      } catch (e) {
        console.log(e);
      }
    }
   
    const clearClicked = (event) => {
      console.log('clearClicked ');
      
      setMessages([{ msgType: 'announce', message: 'cleared'}]);
  
      event.preventDefault() ;
    };
  
    const closeConnection = async () => {
      try {
        await connection.stop();
      } catch (e) {
        console.log(e);
      }
    }
  
      
    useEffect(() => {
        
        if(!connection && messages?.length === 1) {
            console.log('connect to hub');
            start();
        }        
    }, [messages]);

    return (
    <div>  
        <MessageContainer messages = {messages} clearClicked = {clearClicked}></MessageContainer>
    </div>);
}
import { lighten, makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
 
 

export const styles = makeStyles((theme) => 
(
  {
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper
    },
    gridList: {
      width: "auto",
      height: "auto"
    },
    icon: {
      color: "rgba(255, 255, 255, 0.54)"
    },
    appBar: {
      position: "relative"
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1
    },
    imageList:{
      display: 'flex', 
      flexDirection: 'row', 
      paddingLeft: 15 ,
      listStyle: 'none',
      width: '1100px',
      height : '165px' ,
      overflow : 'auto',
      margin: '5px'
    },
    imageListItem :{
      margin: '2px'
    },
    paper :{
      margin: '10px',
      paddingBottom : '5px'
    },
    documentHeader :{
      margin: '5px',
      marginTop: '10px',
      marginBottom : '10px',
      fontWeight: '400'
  
    },
    documentInfo :{
      margin: '5px',
      fontWeight: '400'
    },
    thumbnail :{   
      height : '150px' 
    }
  }

)
);

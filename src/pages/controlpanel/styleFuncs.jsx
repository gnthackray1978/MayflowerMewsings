import {lighten, makeStyles} from '@mui/styles';

 

export const useStyles = makeStyles((theme) => ({
    x: {
      padding: "1px",
      color: "red",
      backgroundColor: "blue"
    },

    test:{
      "&.MuiFormControl-root": {
        padding: "2px",
        width: "220px"
      },
      "&.MuiInputBase-root-MuiOutlinedInput-root" : {
        paddingLeft  : "0px",
        paddingRight : "0px",
      },
      "& input": {  
        color: "black",
        backgroundColor: "white"
      },
      "& label": {  
        color: "black",
        height: "20px",
        margin: "5px"
      },
      
      "& input.MuiFileInput-TextField": {  
        color: "black",
        backgroundColor: "white"
      },
      "& MuiFileInput-Typography-size-text": {  
        color: "black",
        backgroundColor: "white"
      },
      "& MuiFileInput-ClearIconButton": {  
        color: "black",
        backgroundColor: "white"
      },
      "& span.MuiFileInput-placeholder ": {
        color: "black",
        backgroundColor: "white"
      },
    },

  root: {
    width: '95%',
  
  },
  sectionHeader: {
    fontSize: "15px",
    fontWeight: "bold",
    //backgroundColor: 'lightgrey',
    padding: '2px'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    //minWidth: 500,
    marginLeft: '5px',
    marginRight: '5px'
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },

  row: {
    width: 600,
   // backgroundColor: 'grey'

  },
  cell_long: {
    fontSize: "10px",
    width: 300,
    minWidth: 1,
  //  backgroundColor: '#ee82ee'

  },
  cell_short: {
      fontSize: "10px",
      width: 100,
    //  backgroundColor: 'green'

    },




}));


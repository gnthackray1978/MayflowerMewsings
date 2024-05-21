import {lighten, makeStyles} from '@mui/styles';

 

export const useStyles = makeStyles((theme) => ({
  
    test:{
      "&.MuiFormControlLabel-root": {
        marginLeft: 0,
        color: 'red'
      },
     
    }, 

    scroll: {
      'background-color': 'black',
      color: 'green',
      width: 450,
      height: 200,
      overflow: 'auto',
      'text-align': 'justify',
      padding: 5
    },

    scrollitem :{
      margin: 0,
      padding: 0,
    }
}));


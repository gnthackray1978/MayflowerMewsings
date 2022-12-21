import React, { Component } from 'react';
import { ThemeProvider, StyledEngineProvider, createTheme, makeStyles, adaptV4Theme } from '@mui/material/styles';
import { BrowserRouter as Router } from "react-router-dom";
import purple from '@mui/material/colors/purple';
import green from '@mui/material/colors/green';
import Index from './Index.jsx';
 
const theme = createTheme(adaptV4Theme({
  palette: {
      
    primary: {
      main: '#999999' 
    },
    secondary: {
      main: '#000000'     
    }
  },

  overrides: {

    MuiTableCell: {
      root: {
        fontSize : '0.700rem',
        textAlign : 'left'
      }
    },

    MuiTable: {
      root: {
        width: '95%',

      }
    },

    MuiFormControl: {
      root: {
        paddingRight: '20px',
        flex: '1 1 100%',
        paddingBottom: '40px',
        paddingTop: '40px',
      }
    },

    MuiFormLabel: {
      root: {
        paddingRight: '20px',
        paddingTop: '40px',
      }
    }, 
 
    

     

  }

}));
 
function App(){

    
    return (
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>        
          <Router>
              <Index/>
          </Router>
        </ThemeProvider>
      </StyledEngineProvider>
    );
}

export default App;

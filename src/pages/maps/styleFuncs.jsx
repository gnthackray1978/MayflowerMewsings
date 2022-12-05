import {lighten, makeStyles} from '@material-ui/core';
// export const theme = createMuiTheme({
//   overrides: {
//     MuiTableCell: {
//       root: {
//         fontSize : '0.700rem',
//         textAlign : 'left'
//       }
//     },

//     MuiTable: {
//       root: {
//         width: '95%',

//       }
//     },

//     MuiFormControl: {
//       root: {
//         paddingRight: '20px',
//         flex: '1 1 100%',
//         paddingBottom: '40px',
//         paddingTop: '40px',
//       }
//     },

//     MuiFormLabel: {
//       root: {
//         paddingRight: '20px',
//         paddingTop: '40px',
//       }
//     },


//   }

// });

export const useSideBarStyles = makeStyles((theme) => ({
  root: {
    width: '95%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 250,
    marginLeft: '15px',
    marginRight: '25px'
  },
  // overrides: {
  //   MuiTableCell: {
  //    root: {
  //       backgroundColor: 'lightblue'
  //     }
  //   },
  // },
  // .MuiTableCell-root :{
  //   color: red
  //
  // },
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
}));

export const useStyles = makeStyles((theme) => ({
  root: {
    // width: '95%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 700,
    marginLeft: '25px',
    marginRight: '25px'
  },
  
  loadingscreenparent: {
    position: 'absolute'
  },
  loadingscreenh5: {
    position: 'absolute',
     zIndex : 100
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
}));



export const useToolbarStyles = makeStyles((theme) => ({
  buttonContent:{
    marginLeft : '-13px',
    marginRight: '10px'
  },
  treeName :{
    fontSize: "1rem",
    fontFamily: "Roboto",
    fontWeight: "400",
  },

  topLabel: {
    fontSize: "0.8rem",
    fontFamily: "Roboto",
    fontWeight: "400",
    position: "absolute",
    top: "-18px",
    left: "0px",
    border: "none",
    background: "none",
     '&:focus': {
      boxShadow: 'none',
      backgroundColor: 'red',
      borderColor: 'red',
    }
  },

  menuButton: {
    marginRight: 20,    
    marginTop: '15px',
    borderRadius: 0,
    width: '500px',
    justifyContent: 'left',    
    //border: '2px solid #fff',
    border: "none",
    background: "none",
    '&:hover': {
    //  backgroundColor: 'green',
    //  borderColor: '#0062cc',
   //   boxShadow: 'none',
    },
    '&:active': {
    //  boxShadow: 'none',
   //   backgroundColor: 'blue',
   //   borderColor: '#005cbf',
    },
    '&:focus': {
     // boxShadow: 'none',
      backgroundColor: 'white',
      borderColor: 'white',
      outline: 'none'
    }

  },
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    height: '25px',
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
    paddingTop: '0px'
  },
  yearBox: {
    maxWidth: '100px',
  },
  location: {
    maxWidth: '140px',
  },
  surname: {
    maxWidth: '540px',
  },

  originOuter: {
    maxWidth: '138px',
    flex: "1 1 100%",
    border: "0",
    margin: "0",
    display: "inline-flex",
    padding: "0",
    position: "relative",
    minWidth: "0",
    paddingTop: "40px",
    paddingRight: "20px",
    flexDirection: "column",
    paddingBottom: "40px",
    verticalAlign: "top"
  },
  originMiddle: {
    color: "rgba(0, 0, 0, 0.87)",
    cursor: "text",
    display: "inline-flex",
    position: "relative",
    fontSize: "1rem",
    boxSizing: "border-box",
    alignItems: "center",
    fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
    fontWeight: "400",
    lineHeight: "1.1876em",
    letterSpacing: "0.00938em",
    marginTop : "16px"
  },
  originInner: {
    font: "inherit",
    color: "currentColor",
    width: "100%",
    border: "0",
    height: "1.1876em",
    margin: "0",
    display: "block",
    padding: "6px 0 7px",
    minWidth: "0",
    background: "none",
    boxSizing: "content-box",
    animationName: "mui-auto-fill-cancel",
    letterSpacing: "inherit",
    animationDuration: "10ms",
    WebkitTapHighlightColor: "transparent"
  },


}));


export const mapStyles = makeStyles((theme) => ({
  noData: {
    marginLeft: '30px',
    marginTop :'10px'
  },

 
}));

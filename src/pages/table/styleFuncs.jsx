import {lighten, makeStyles} from '@mui/styles';

 
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
    width: '95%',
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



export const useToolbarStyles = makeStyles((theme) => ({
  
  // buttonContent:{
  //   marginLeft : '-13px',
  //   marginRight: '10px'
  // },
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
    top: "-1.03rem",
    left: "0px",
    border: "none",
    textAlign: "left",
    minWidth: "220px",
    background: "none",
     '&:focus': {
      boxShadow: 'none',
      backgroundColor: 'red',
      borderColor: 'red',
    }
  },

  treeSearchLine :{
    minWidth: '200px',
    position: 'absolute',
    top: '1.46rem',
    left: '3px',
    color: 'black',
    backgroundColor: 'black',
    border: 'none',
    height: '0.08rem',
  },
  
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    height: '25px',
  },
  menuButton: {
    marginTop: 12, 
    width : '15px',
    '&:focus': {
      backgroundColor: 'white',
      borderColor: 'white',
      outline: 'none'
    }
  },
  highlight:
    theme.palette.mode === 'light'
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

  originOuter: {
    maxWidth: '538px',
    flex: "1 1 100%",
    border: "0",
    margin: "0",
    marginBottom : '5px',
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
    WebkitTapHighlightColor: "transparent",
    textAlign: "left",
    justifyContent: "left",
  }
}));

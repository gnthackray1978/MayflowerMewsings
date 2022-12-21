//todo clone off maps stylefuncs !! merge them together 


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
  menuButton: {
    marginTop: 12,
    marginRight: 20,
  },
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    height: '25px',
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
  yearBox: {
    maxWidth: '100px',
  },
  location: {
    maxWidth: '140px',
  },
  surname: {
    maxWidth: '140px',
  },

  originOuter: {
    maxWidth: '538px',
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

import { makeStyles} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

export const defaultStyle = (state, classes,theme) => {
  if (state.active) {
    if (theme === 'dark')  return classes.initialStyle + ' ' + classes.activeStyle;

    return classes.initialStyle + ' '+classes.activeStyle;
  }

  if (state.hovered)  return classes.initialStyle + ' ' + classes.hoveredStyle;

  return classes.initialStyle;
};

export const googleButton = makeStyles((theme) => (
  {
    fab: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    root: {
    flexGrow: 1,
    },
    grow: {
      marginLeft: 50,
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    tolowerBtn : {
      textTransform: 'none'
    },
    avatar: {
      backgroundColor: blue[100],
      color: blue[600],
    },
    initialStyle : {
      backgroundColor: theme === 'dark' ? 'rgb(66, 133, 244)' : '#fff',
      display: 'inline-flex',
      alignItems: 'center',
      color: theme === 'dark' ? '#fff' : 'rgba(0, 0, 0, .54)',
      boxShadow: '0 2px 2px 0 rgba(0, 0, 0, .24), 0 0 1px 0 rgba(0, 0, 0, .24)',
      padding: 0,
      borderRadius: 2,
      border: '1px solid transparent',
      fontSize: 14,
      fontWeight: '500',
      fontFamily: 'Roboto, sans-serif',
      marginLeft:25
    },
  
    hoveredStyle : {
      cursor: 'pointer',
      opacity: 0.9
    },
  
    activeStyle : {
      cursor: 'pointer',
      backgroundColor: theme === 'dark' ? '#3367D6' : '#eee',
      color: theme === 'dark' ? '#fff' : 'rgba(0, 0, 0, .54)',
      opacity: 1
    },
    
    googleIcon :{
      paddingRight: 10, 
      fontWeight: 500, 
      paddingLeft:  0, 
      paddingTop: 10, 
      paddingBottom: 10 
    }
    ,
    
    google :{
      paddingRight: 10, 
      fontWeight: 500, 
      paddingLeft: 10, 
      paddingTop: 10, 
      paddingBottom: 10 
    }

  }
));
  

export const imageButton = makeStyles((theme) => (
  {
    root: {
      display: "flex",
      flexWrap: "wrap",
      width: 42
    },
    image: {
      position: "relative",
      height: 40,

      [theme.breakpoints.down("xs")]: {
        width: "42", // Overrides inline-style
        height: 40
      },
      "&:hover, &$focusVisible": {
        zIndex: 1,
        "& $imageBackdrop": {
          opacity: 0.15
        },
        "& $imageMarked": {
          opacity: 0
        },
        "& $imageTitle": {
          border: "4px solid currentColor"
        }
      }
    },
    focusVisible: {},
    imageButton: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 80,
      color: theme.palette.common.white
    },
    imageSrc: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      borderRadius: 80,
      backgroundSize: "cover",
      backgroundPosition: "center 100%"
    },
    imageBackdrop: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      borderRadius: 80,

      backgroundColor: theme.palette.common.black,
      opacity: 0.4,
      transition: theme.transitions.create("opacity")
    },
    imageTitle: {
      position: "relative",
      padding: `${theme.spacing(1) * 2}px ${theme.spacing(1) * 4}px ${theme
        .spacing.unit + 6}px`
    },
    imageMarked: {
      height: 3,
      width: 18,
      backgroundColor: theme.palette.common.white,
      position: "absolute",
      bottom: -2,
      left: "calc(50% - 9px)",
      transition: theme.transitions.create("opacity")
    },
    img__overlayInner: {
      alignItems: "center",

      display: "flex",
      justifyContent: "center",
      left: -5,
      width: 53,
      height: 50,
      opacity: 1,
      position: "absolute",

      borderRadius: 100,
      background: 'linear-gradient(to right, red, green, yellow)',
      top: -5,

      zIndex: 0
    },
    img__overlayOuter: {
      alignItems: "center",

      display: "flex",
      justifyContent: "center",
      left: -2,
      width: 46,
      height: 44,
      opacity: 1,
      position: "absolute",

      borderRadius: 100,
      background: 'white',
      top: -2,

      zIndex: 0
    }
  }));

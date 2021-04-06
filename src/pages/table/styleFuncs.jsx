import { lighten, makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

export const theme = createMuiTheme({
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

});

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
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
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
    paddingTop: '11px'
  },

}));

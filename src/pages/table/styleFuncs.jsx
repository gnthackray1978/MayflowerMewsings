import { makeStyles} from '@material-ui/core/styles';

 
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

}));

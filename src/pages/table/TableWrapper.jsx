import React from 'react'; 
import TablePagination from '@material-ui/core/TablePagination'; 
import {MuiThemeProvider } from "@material-ui/core/styles"; 
import {theme,useStyles} from './styleFuncs.jsx';
 

export default function TableWrapper(props) {


  const {state, children} = props;

  const classes = useStyles();

  if(!state.loading && state.error && state.error.graphQLErrors && state.error.graphQLErrors.length >0){
    return (
      <div>
        <pre>Bad: {state.error.graphQLErrors.map(({ message }, i) => (
          <span key={i}>{message}</span>
        ))}
        </pre>
      </div>
    );
  }

  let loadingMessage = (loading) => {

    var child;

    if(children.length > 1){
      child = children[1];
    }
    else{
      child = children;
    }

    if(loading){
      return (<h5><span style={{color: "blue", padding: "20px"} } >loading...</span></h5>);
    }
    else{
      return(<div>
        {child}
      </div>);
    }

  };

  if(!state.handleChangePage)
    state.handleChangePage = ()=>{};

  if(!state.handleChangeRowsPerPage)
    state.handleChangeRowsPerPage = ()=>{};

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
          {children.length > 1 && children[0]}

          {loadingMessage(state.loading)}

          <TablePagination
            labelRowsPerPage={'Page Rows'}
            rowsPerPageOptions={[5, 10, 25,50]}
            component="div"
            count={state.totalRecordCount || 0} 
            rowsPerPage={state.rowsPerPage}
            page={state.page}
        //    onChangePage={state.handleChangePage}
            //onChangeRowsPerPage={state.handleChangeRowsPerPage}
            onRowsPerPageChange = {state.handleChangeRowsPerPage}
            onPageChange = {state.handleChangePage}

          />

      </div>
    </MuiThemeProvider>
  );
}

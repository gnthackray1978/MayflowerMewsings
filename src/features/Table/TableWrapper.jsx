import React from 'react'; 
import TablePagination from '@mui/material/TablePagination'; 
import { useTheme } from '@mui/material/styles';
import {useStyles} from '../../pages/table/styleFuncs.jsx';
 

function displayErrors(errors){

  if(errors && errors.length >0){
    return (<div>
      <h5><span style={{color: "red", padding: "20px"} } >Errors</span></h5>
      <ul>  
      {
       state.errors.map((row, index) => {return(<li>{row}</li>);})        
      }
      </ul>  
    </div>);
  }
  else{
    return (<div></div>);
  }
}

export default function TableWrapper(props) {
 
  console.log('TableWrapper called');

  const {state, children} = props;

  const theme = useTheme();

  const classes = useStyles(theme);

  if(state.errors.length >0){
    return(displayErrors(state.errors));
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
    <div className={classes.root}>
      {children.length > 1 && children[0]}

      {loadingMessage(state.loading)}

      <TablePagination
        labelRowsPerPage={'Page Rows'}
        rowsPerPageOptions={[5, 10, 25,50]}
        component="div"
        count={state.totalRows || 0} 
        rowsPerPage={state.rowsPerPage}
        page={state.page}
    //    onChangePage={state.handleChangePage}
        //onChangeRowsPerPage={state.handleChangeRowsPerPage}
        onRowsPerPageChange = {state.handleChangeRowsPerPage}
        onPageChange = {state.handleChangePage}

      />

    </div>
  );
}

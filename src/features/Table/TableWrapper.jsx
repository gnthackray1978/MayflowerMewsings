import React from 'react'; 
import TablePagination from '@mui/material/TablePagination'; 
import { useTheme } from '@mui/material/styles';
import {useStyles} from '../../pages/table/styleFuncs.jsx';
import { displayLoadingScreen, displayErrors } from '../../shared/common'; 

export default function TableWrapper(props) {
 
//  console.log('TableWrapper called');

  const {state, children} = props;

  const theme = useTheme();

  const classes = useStyles(theme);

  var displayComponent = () => {    
    return(<div>{(children.length > 1) ? children[1] : children}</div>);
  }
 
  if(state){
   if(state.loading ?? false)
     displayComponent = displayLoadingScreen;
 
   if(state.errors?.length >0 ?? false)
     displayComponent = () => {return (displayErrors(state.errors))}
  }
  

  return (
    <div >
     {children.length > 1 && children[0]}

     {displayComponent()}

     <TablePagination
        labelRowsPerPage={'Page Rows'}
        rowsPerPageOptions={[5, 10, 25,50]}
        component="div"
        count={state.totalRows || 0} 
        rowsPerPage={state.rowsPerPage}
        page={state.page}
        //onChangePage={state.handleChangePage}
        //onChangeRowsPerPage={state.handleChangeRowsPerPage}
        onRowsPerPageChange = {state.handleChangeRowsPerPage}
        onPageChange = {state.handleChangePage}
      />
    </div>
  );
}

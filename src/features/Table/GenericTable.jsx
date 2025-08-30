import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { useTheme } from '@mui/material/styles';
import { useStyles } from '../../pages/table/styleFuncs.jsx';
import TableHeaderFromState from './TableHeaderFromState.jsx';

/**
 * A generic, reusable table component designed to reduce code duplication.
 * It renders a Material-UI table based on a state object and configuration.
 *
 * @param {object} props - The component props.
 * @param {object} props.state - The table state object, typically from the useTableState hook.
 * @param {string} [props.state.title] - The title of the table, used for accessibility attributes.
 * @param {Array<object>} props.state.headCells - The configuration for table headers. Each object should have an 'id' and a 'label'. One can have `isRowHeader: true`.
 * @param {Array<object>} props.state.rows - The data to display in the table.
 * @param {function} props.state.isSelected - A function that returns true if a row is selected.
 * @param {function} props.state.handleClick - The event handler for a row click.
 * @param {string} [props.rowKeyField='id'] - The property on the row object to use as a unique key for React and for selection.
 * @param {object} [props.customCellRender] - An object mapping cell IDs (from headCells) to custom render functions `(row) => React.ReactNode`.
 */
export default function GenericTable(props) {
  const { state, rowKeyField = 'id', customCellRender = {} } = props;
  const theme = useTheme();
  const classes = useStyles(theme);

  const tableName = state.title ? state.title.toLowerCase().replace(/\s+/g, '-') : 'generic';

  return (
    <TableContainer>
      <Table
        className={classes.table}
        aria-labelledby="tableTitle"
        size="small"
        aria-label={`${tableName}-table`}
      >
        <TableHeaderFromState
          state={{
            ...state,
            orderBy: state.sortColumn,
            order: state.order,
            onRequestSort: state.handleRequestSort,
            headCells: state.headCells,
          }}
        />
        <TableBody>
          {state.rows.map((row, index) => {
            const key = row[rowKeyField];
            const isItemSelected = state.isSelected(key);
            const labelId = `${tableName}-table-checkbox-${index}`;

            return (
              <TableRow
                hover
                onClick={(event) => state.handleClick(event, key)}
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={key}
                selected={isItemSelected}
              >
                {state.headCells.map((headCell) => {
                  const cellContent = customCellRender[headCell.id]
                    ? customCellRender[headCell.id](row)
                    : row[headCell.id];

                  const isRowHeader = headCell.isRowHeader === true;

                  return (
                    <TableCell
                      key={headCell.id}
                      component={isRowHeader ? 'th' : 'td'}
                      id={isRowHeader ? labelId : undefined}
                      scope={isRowHeader ? 'row' : undefined}
                      padding="none"
                    >
                      {cellContent}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
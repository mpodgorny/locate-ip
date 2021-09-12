import React from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  makeStyles,
  Tooltip,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectList } from 'features/SearchSlice';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const useStyles = makeStyles(() => ({
  tableContainer: { height: '98%' },
  success: { color: 'green' },
  error: { color: 'red' },
}));
const SearchedList: React.FC = () => {
  const searchedList = useSelector(selectList);
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table>
        <caption>{searchedList.length} searches</caption>
        <TableHead>
          <TableRow>
            <TableCell style={{ width: '85%' }}>Query</TableCell>
            <TableCell style={{ width: '15%' }}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {searchedList.length === 0 && (
            <TableRow>
              <TableCell colSpan={3}>No searches</TableCell>
            </TableRow>
          )}
          {searchedList.map((query) => (
            <TableRow>
              <TableCell component="th" scope="row">
                {query.query}
              </TableCell>
              <TableCell component="th" scope="row">
                {query.isError ? (
                  <Tooltip title="Search failed">
                    <ErrorOutlineIcon className={classes.error} />
                  </Tooltip>
                ) : (
                  <Tooltip title="Search successful">
                    <CheckCircleOutlineIcon className={classes.success} />
                  </Tooltip>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SearchedList;

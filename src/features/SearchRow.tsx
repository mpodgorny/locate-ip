import React, { useState, KeyboardEvent } from 'react';
import {
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  makeStyles,
  CircularProgress,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { searchData, selectLoading } from 'features/SearchSlice';
import { IpOrHostRegex } from 'helpers/regexes';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: 'relative',
    margin: `${theme.spacing(1)}px 0`,
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(1),
    },
  },
  circular: {
    position: 'absolute',
    top: 4,
    left: 'calc(50% - 20px)',
    zIndex: 1,
  },
  textField: {
    height: 42,
  },
  row: {
    alignItems: 'center',
    display: 'flex',
  },
}));

const SearchRow: React.FC = () => {
  const [query, setQuery] = useState('');
  const [regexFailed, setRegexFailed] = useState(false);
  const isLoading = useSelector(selectLoading);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setRegexFailed(false);
  };
  const handleSearch = () => {
    if (IpOrHostRegex.test(query)) {
      dispatch(searchData(query));
    } else {
      setRegexFailed(true);
    }
  };
  const handleEnterDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  return (
    <Box p={1}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="caption">
            You can search by IPv4, IPv6, or domain name. Type your query below
            and press Enter or "search" button.
          </Typography>
        </Grid>
        <Grid item xs={12} md={8} className={classes.row}>
          <TextField
            className={classes.textField}
            fullWidth
            variant="outlined"
            size="small"
            onChange={handleChange}
            error={regexFailed}
            placeholder="Enter your query here"
            onKeyPress={handleEnterDown}
            margin="none"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <div className={classes.wrapper}>
            <Button
              fullWidth
              variant="outlined"
              size="large"
              onClick={handleSearch}
              disabled={isLoading}
            >
              Search
            </Button>
            {isLoading && (
              <CircularProgress size={35} className={classes.circular} />
            )}
          </div>
        </Grid>
        <Grid item xs={12}>
          {regexFailed && (
            <Typography variant="caption" color="error">
              Value you've entered is neither IPv4, IPv6 or domain name. Please
              double check it!
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchRow;

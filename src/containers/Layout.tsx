import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import CustomCard from 'components/CustomCard';
import CurrentMap from 'features/CurrentMap';
import CurrentLocal from 'features/CurrentLocal';
import SearchRow from 'features/SearchRow';
import SearchedMap from 'features/SearchedMap';
import SearchedList from 'features/SearchedList';
import CurrentSearched from 'features/CurrentSearched';

const useStyles = makeStyles((theme) => ({
  container: {
    height: `calc(100vh - ${theme.spacing(4)}px)`,
    [theme.breakpoints.up('md')]: {
      overflow: 'hidden',
    },
  },
  list: { height: '100%' },
  grid: { height: '40%' },
  search: {
    height: '30%',
    [theme.breakpoints.up('md')]: {
      height: '20%',
    },
  },
}));
const Layout: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} md={3} className={classes.list}>
        <CustomCard title="List of all searches">
          <SearchedList />
        </CustomCard>
      </Grid>
      <Grid container item xs={12} md={9} className={classes.container}>
        <Grid item xs={12} md={8} className={classes.grid}>
          <CustomCard title="Your current location">
            <CurrentMap />
          </CustomCard>
        </Grid>
        <Grid item xs={12} md={4} className={classes.grid}>
          <CustomCard title="Information about your location">
            <CurrentLocal />
          </CustomCard>
        </Grid>
        <Grid item xs={12} md={12} className={classes.search}>
          <CustomCard title="Search">
            <SearchRow />
          </CustomCard>
        </Grid>
        <Grid item xs={12} md={8} className={classes.grid}>
          <CustomCard title="Search location">
            <SearchedMap />
          </CustomCard>
        </Grid>
        <Grid item xs={12} md={4} className={classes.grid}>
          <CustomCard title="Information about last search">
            <CurrentSearched />
          </CustomCard>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Layout;

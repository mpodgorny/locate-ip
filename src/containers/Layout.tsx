import React from 'react';
import { Grid } from '@material-ui/core';
import CustomCard from 'components/CustomCard';
import CustomMap from 'components/CustomMap';
const Layout: React.FC = () => {
  return (
    <Grid container>
      <Grid item xs={12} md={3}>
        <CustomCard title="List of all searches" />
      </Grid>
      <Grid container item xs={12} md={9}>
        <Grid item xs={12} md={8}>
          <CustomCard title="Your location">
            <CustomMap />
          </CustomCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomCard title="Information about your location" />
        </Grid>
        <Grid item xs={12} md={12}>
          <CustomCard title="Search" />
        </Grid>
        <Grid item xs={12} md={8}>
          <CustomCard title="Search location">
            <CustomMap />
          </CustomCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomCard title="Information about last search" />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Layout;

import React from 'react';
import { Typography, Grid } from '@material-ui/core';

type TextRowProps = { title: string; value: string };

const TextRow: React.FC<TextRowProps> = ({ title, value }) => {
  return (
    <Grid container>
      <Grid item xs={5}>
        <Typography>{title}</Typography>
      </Grid>
      <Grid item xs={7}>
        <Typography>{value}</Typography>
      </Grid>
    </Grid>
  );
};

export default TextRow;

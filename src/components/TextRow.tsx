import React from 'react';
import { Typography, Grid, Box } from '@material-ui/core';

type TextRowProps = { title: string; value: string };

const TextRow: React.FC<TextRowProps> = ({ title, value }) => {
  const parseKey = (key: string): string => key.replace('_', ' ');

  return (
    <Box p={1}>
      <Grid container>
        <Grid item xs={5}>
          <Typography>{parseKey(title)}</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography>{value}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TextRow;

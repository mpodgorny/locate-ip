import React from 'react';
import { Card, CardHeader, Box, makeStyles } from '@material-ui/core';

type CustomCardProps = {
  title?: string;
  disableMargin?: boolean;
  children?: JSX.Element;
  subheader?: string;
};

const useStyles = makeStyles(() => ({
  root: { height: '100%', position: 'relative' },
  header: {
    padding: '4px 16px',
  },
  content: {
    height: '100%',
  },
}));

const CustomCard: React.FC<CustomCardProps> = ({
  title = '',
  subheader = '',
  disableMargin = false,
  children,
}) => {
  const classes = useStyles();
  return (
    <Box p={disableMargin ? 0 : 1} className={classes.root}>
      <Card raised className={classes.root}>
        {title && (
          <CardHeader
            className={classes.header}
            title={title}
            titleTypographyProps={{ variant: 'subtitle2' }}
            subheader={subheader}
          />
        )}
        <Box p={1} height="100%" width="100%">
          {children}
        </Box>
      </Card>
    </Box>
  );
};

export default CustomCard;

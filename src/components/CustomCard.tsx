import React from 'react';
import { Card, CardHeader, Box } from '@material-ui/core';

type CustomCardProps = { title?: string; children?: JSX.Element };

const CustomCard: React.FC<CustomCardProps> = ({ title = '', children }) => {
  return (
    <Box m={{ xs: 1 }}>
      <Card raised>
        <CardHeader
          title={title}
          titleTypographyProps={{ variant: 'subtitle2' }}
        />
        {children}
      </Card>
    </Box>
  );
};

export default CustomCard;

import React from 'react';
import { Card, CardHeader, Box } from '@material-ui/core';

type CustomCardProps = { title?: string };

const CustomCard: React.FC<CustomCardProps> = ({ title = '' }) => {
  return (
    <Box m={{ xs: 1 }}>
      <Card raised>
        <CardHeader
          title={title}
          titleTypographyProps={{ variant: 'subtitle2' }}
        />
      </Card>
    </Box>
  );
};

export default CustomCard;

// components/ClassCard.jsx

import React from 'react';
import { Card, Typography, Box } from '@mui/material';

const ClassCard = ({ className, count }) => {
  return (
    <Card
      sx={{
        padding: 1,
        px: 2,
        minWidth: 100,
        backgroundColor: 'background.paper',
        borderRadius: 1,
        boxShadow: 2,
        textAlign: 'center',
      }}
    >
      <Typography variant="subtitle2" fontWeight={600}>
        Class {className}
      </Typography>
      <Typography variant="h6" color="primary">
        {count}
      </Typography>
    </Card>
  );
};

export default ClassCard;

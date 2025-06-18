// src/components/StatsCard.js

import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const StatsCard = ({ title, value }) => {
  return (
    <Card
      elevation={4}
      sx={{
        minWidth: 200,
        backgroundColor: 'background.paper',
        borderRadius: 3,
        color: 'text.primary',
        borderLeft: '6px solid #80CBC4', // you can change to theme.secondary.main for variety
        p: 1.5,
      }}
    >
      <CardContent>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{ fontSize: '0.85rem', mb: 1 }}
        >
          {title}
        </Typography>
        <Typography variant="h5" fontWeight="bold">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default StatsCard
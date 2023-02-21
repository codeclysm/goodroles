import { Typography } from '@mui/material';
import React from 'react';

export default function Logo() {
  return <Typography variant="h1">
    good
    <Typography component="span" color="secondary" fontSize="inherit">
      Roles
    </Typography>
    <Typography component="span">v1.0</Typography>
  </Typography>
}
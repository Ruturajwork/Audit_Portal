import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Grid, Stack } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

const Loader = () => {
  return (
    <Grid sx={{ pt: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Stack spacing={4}>
        <CircularProgress size={80} color="secondary" label="loading ......." />

        <LinearProgress color="secondary" sx={{ width: '100%', color: 'grey.500' }} />
      </Stack>
    </Grid>
  );
};

export default Loader;

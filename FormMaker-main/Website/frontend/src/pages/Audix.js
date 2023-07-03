import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import {
  Container,
  Switch,
  CssBaseline,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Icon,
  Stack,
} from '@mui/material';
import { red, green } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

const Audix = () => {
  return (
    <>
      <Typography component="h1" variant="h1" sx={{ p: 2, textAlign: 'center' }}>
        Audix Global !
      </Typography>
      <Box m={1} display="flex" justifyContent="center" alignItems="center">
        <Stack spacing={2} direction="row" sx={{ p: 2, alignItems: 'center' }}>
          <Button variant="text" component={RouterLink} to={`/Clogin`}>
            Customer Login
          </Button>
          <Button variant="contained" component={RouterLink} to={`/login`}>
            {' '}
            Audix Login
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default Audix;

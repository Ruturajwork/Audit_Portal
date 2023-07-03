import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import { Box, DialogActions } from '@mui/material';

import Container from '@mui/material/Container';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

import FormControl from '@mui/material/FormControl';

import { getStandardDetails, editStandard } from '../../actions/dataAction';
import { STANDARD_DETAILS_RESET } from '../../constants/dataConstants';

const StandardEditModel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: standardId } = useParams();
  const [standards, setStandards] = useState('');
  const [message, setMessage] = useState(null);

  const standardDetails = useSelector((state) => state.standardDetails);
  const { loading, error, standard } = standardDetails;

  const standardUpdate = useSelector((state) => state.standardUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = standardUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: STANDARD_DETAILS_RESET });
      navigate('/data');
    } else if (!standard.standards || standard._id !== standardId) {
      dispatch(getStandardDetails(standardId));
    } else {
      setStandards(standard.standards);
    }
  }, [standard, dispatch, standardId, successUpdate, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      editStandard({
        _id: standardId,
        standards,
      })
    );
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: '#f5f5f5',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <ThemeProvider>
      <Container component="main" maxWidth="xs">
        <Box sx={style} component="form" noValidate onSubmit={submitHandler}>
          <FormControl>
            <TextField
              required
              fullWidth
              variant="outlined"
              autoComplete="off"
              name="Standard"
              label="Standard"
              autoFocuslabel="Standard"
              value={standards}
              onChange={(e) => setStandards(e.target.value)}
            />
          </FormControl>
          <Stack spacing={2} mt={2} direction="row">
            <Button component={RouterLink} to={'/data'} variant="outlined">
              Cancel
            </Button>
            <Button type="submit" variant="outlined">
              Update
            </Button>
          </Stack>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default StandardEditModel;

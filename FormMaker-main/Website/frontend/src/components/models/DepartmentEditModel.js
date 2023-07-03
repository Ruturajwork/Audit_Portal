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

import { getUserDepartmentDetails, editUserDepartment } from '../../actions/dataAction';
import { DEPARTMENT_DETAILS_RESET } from '../../constants/dataConstants';

const DepartmentEditModel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: departmentId } = useParams();
  const [departments, setDepartments] = useState('');
  const [message, setMessage] = useState(null);

  const departmentDetails = useSelector((state) => state.departmentDetails);
  const { loading, error, department } = departmentDetails;

  const departmentUpdate = useSelector((state) => state.departmentUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = departmentUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: DEPARTMENT_DETAILS_RESET });
      navigate('/data');
    } else if (!department.departments || department._id !== departmentId) {
      dispatch(getUserDepartmentDetails(departmentId));
    } else {
      setDepartments(department.departments);
    }
  }, [department, dispatch, departmentId, successUpdate, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      editUserDepartment({
        _id: departmentId,
        departments,
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
              name="Department"
              label="Department"
              id="outlined-size-small"
              defaultValue="Small"
              size="small"
              autoFocuslabel="Department"
              value={departments}
              onChange={(e) => setDepartments(e.target.value)}
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
export default DepartmentEditModel;

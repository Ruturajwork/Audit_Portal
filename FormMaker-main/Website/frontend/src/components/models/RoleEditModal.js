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

import { getUserRoleDetails, editUserRole } from '../../actions/dataAction';
import { ROLE_DETAILS_RESET } from '../../constants/dataConstants';

const RoleEditModel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: roleId } = useParams();
  const [roles, setRoles] = useState('');
  const [message, setMessage] = useState(null);

  const roleDetails = useSelector((state) => state.roleDetails);
  const { loading, error, role } = roleDetails;

  const roleUpdate = useSelector((state) => state.roleUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = roleUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: ROLE_DETAILS_RESET });
      navigate('/data');
    } else if (!role.roles || role._id !== roleId) {
      dispatch(getUserRoleDetails(roleId));
    } else {
      setRoles(role.roles);
    }
  }, [role, dispatch, roleId, successUpdate, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      editUserRole({
        _id: roleId,
        roles,
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
              name="Role"
              label="Role"
              autoFocuslabel="Role"
              value={roles}
              onChange={(e) => setRoles(e.target.value)}
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
export default RoleEditModel;

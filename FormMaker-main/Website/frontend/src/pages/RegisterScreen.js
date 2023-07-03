import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Switch,
  Alert,
  Stack,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { register } from '../actions/userActions';
import { listDepartmentData, listRoleData } from '../actions/dataAction';

const theme = createTheme();

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [contact, setContact] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [isActive, setIsActive] = useState('false');

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const dataRole = useSelector((state) => state.dataRole);
  const { roles } = dataRole;
  // console.log(roles);
  const dataDepartment = useSelector((state) => state.dataDepartment);
  const { departments } = dataDepartment;

  // const add = departments.map((departmen) => departmen.departments);
  // console.log(departments);

  useEffect(() => {
    dispatch(listDepartmentData());
    dispatch(listRoleData());
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(register(fname, lname, contact, department, role, email, password, isActive));
      navigate(redirect);
    }
  };

  const IOSSwitch = styled((props) => <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />)(
    ({ theme }) => ({
      width: 42,
      height: 26,
      padding: 0,
      '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
          transform: 'translateX(16px)',
          color: '#fff',
          '& + .MuiSwitch-track': {
            backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
            opacity: 1,
            border: 0,
          },
          '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.5,
          },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
          color: '#33cf4d',
          border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
          color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
      },
      '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
      },
      '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
          duration: 500,
        }),
      },
    })
  );

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: '#f5f5f5',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={style}>
          <Typography component="h1" variant="h5">
            Add Auditor
          </Typography>
          <Stack>
            {error && <Alert severity="error">{error} </Alert>}
            {message && (
              <Alert variant="outlined" severity="error">
                {message}
              </Alert>
            )}
          </Stack>

          <Box component="form" noValidate onSubmit={submitHandler} sx={{ marginTop: 4 }}>
            <Grid container spacing={4} columns={40}>
              <Grid item xs={12} sm={10}>
                <TextField
                  variant="outlined"
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={20}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField
                  required
                  fullWidth
                  type="number"
                  id="phone"
                  label="Phone No"
                  name="contact"
                  autoComplete="contact"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </Grid>

              {/* <Grid item xs={12} sm={15}>
                <FormControl sx={{ width: 250 }}>
                  <InputLabel>Department</InputLabel>
                  <Select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    fullWidth
                    label="Department"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={'IT'}>IT</MenuItem>
                    <MenuItem value={'Cyber'}>Cyber</MenuItem>
                    <MenuItem value={'Audix one and a half'}>Audix one and a half</MenuItem>
                  </Select>
                </FormControl>
              </Grid> */}

              <Grid item xs={12} sm={15}>
                <FormControl sx={{ width: 250 }}>
                  <InputLabel>Department</InputLabel>
                  <Select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    fullWidth
                    label="Department"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {departments.map((departmen) => {
                      return <MenuItem value={departmen.departments}>{departmen.departments}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
              </Grid>

              {/* <Grid item xs={12} sm={15}>
                <FormControl sx={{ width: 250 }}>
                  <InputLabel>Role</InputLabel>
                  <Select value={role} onChange={(e) => setRole(e.target.value)} fullWidth label="Role">
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={'IT'}>IT</MenuItem>
                    <MenuItem value={'Cyber'}>Cyber</MenuItem>
                    <MenuItem value={'Audix one andhalf'}>Audix one andhalf</MenuItem>
                  </Select>
                </FormControl>
              </Grid> */}

              <Grid item xs={12} sm={15}>
                <FormControl sx={{ width: 250 }}>
                  <InputLabel>Role</InputLabel>
                  <Select value={role} onChange={(e) => setRole(e.target.value)} fullWidth label="Role">
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {roles.map((rol) => {
                      return <MenuItem value={rol.roles}>{rol.roles}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={20}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={20}>
                <TextField
                  required
                  fullWidth
                  name="Confirm password"
                  label="Confirm Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={20}>
                <Stack direction="row" spacing={3} alignItems="center" sx={{ mt: 3, mb: 2 }}>
                  <Typography>Deactive</Typography>
                  <IOSSwitch sx={{ m: 1 }} checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
                  <Typography>Active</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} />
            </Grid>
            <Button type="submit" fullWidth variant="contained">
              Add User
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default RegisterScreen;

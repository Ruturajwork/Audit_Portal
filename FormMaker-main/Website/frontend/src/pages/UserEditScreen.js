import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { getUserDetails, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';
import { listDepartmentData, listRoleData } from '../actions/dataAction';

const theme = createTheme();

const UserEditScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: userId } = useParams();

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [department, setDepartment] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [role, setRole] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [message, setMessage] = useState(null);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;

  const dataRole = useSelector((state) => state.dataRole);
  const { roles } = dataRole;
  // console.log(roles);
  const dataDepartment = useSelector((state) => state.dataDepartment);
  const { departments } = dataDepartment;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate('/dashboard/users');
    } else if (!user.fname || user._id !== userId) {
      dispatch(getUserDetails(userId));
      dispatch(listDepartmentData());
      dispatch(listRoleData());
    } else {
      setFname(user.fname);
      setLname(user.lname);
      setContact(user.contact);
      setEmail(user.email);
      setPassword(user.password);
      setDepartment(user.department);
      setIsAdmin(user.isAdmin);
      setRole(user.role);
      setIsActive(user.isActive);
    }
  }, [user, dispatch, userId, successUpdate, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUser({
        _id: userId,
        fname,
        lname,
        contact,
        email,
        password,
        department,
        isAdmin,
        role,
        isActive,
      })
    );
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
    width: 1000,
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
          <Grid container spacing={10} columns={40}>
            <Grid item xs={12} sm={15}>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIosIcon />}
                component={RouterLink}
                to={'/dashboard/users'}
              >
                Go Back
              </Button>
            </Grid>
            <Grid item xs={12} sm={10}>
              <Typography component="h1" variant="h5" sx={{ position: 'center' }}>
                Edit Auditor
              </Typography>
            </Grid>
          </Grid>
          <Stack>
            {error && <Alert severity="error">{error} </Alert>}
            {message && <Alert security="error">{message}</Alert>}
          </Stack>
          <Box component="form" noValidate onSubmit={submitHandler} sx={{ mt: 3 }}>
            <Grid container spacing={4} columns={40}>
              <Grid item xs={12} sm={10}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
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
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={13} sm={13}>
                <TextField
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
              <Grid item xs={13} sm={13}>
                <FormControl sx={{ width: 300 }}>
                  <InputLabel id="demo-simple-select-autowidth-label">Department</InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    fullWidth
                    label="Department"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {departments.map((departmen) => (
                      <MenuItem key={departmen._id} value={departmen.departments}>
                        {departmen.departments}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={13} sm={13}>
                <FormControl sx={{ width: 300 }}>
                  <InputLabel id="demo-simple-select-autowidth-label">Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    fullWidth
                    label="Role"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {roles.map((rol) => (
                      <MenuItem key={rol._id} value={rol.roles}>
                        {rol.roles}
                      </MenuItem>
                    ))}
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
                   
                  </Select>
                </FormControl>
              </Grid> */}

              <Grid item xs={12} sm={20}>
                <TextField
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
              <Grid item xs={12} sm={20}>
                <TextField
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
              {userInfo.isSuperAdmin ? (
                <Grid item xs={12} sm={15}>
                  <FormLabel component="legend">Is a Admin?</FormLabel>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <IOSSwitch sx={{ m: 1 }} checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
                    <Typography>Active</Typography>
                  </Stack>
                </Grid>
              ) : null}

              <Grid item xs={12} sm={15} />
              <Grid>
                <FormLabel component="legend">Is a Active?</FormLabel>
                <Stack direction="row" spacing={1} alignItems="center">
                  <IOSSwitch sx={{ m: 1 }} checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
                  <Typography>Active</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} />
            </Grid>

            <Button type="submit" fullWidth variant="contained">
              Update
            </Button>
            {/* <Grid container justifyContent="flex-end" sx={{ mt: 3, mb: 2 }}>
              <Grid item>
                <Link
                  as={RouterLink}
                  to={`/login?redirect=${redirect}`}
                  variant="body2"
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default UserEditScreen;

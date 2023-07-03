import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
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
  Autocomplete,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Select from '@mui/material/Select';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { register, listUsers } from '../actions/userActions';
import { standardListData } from '../actions/dataAction';
import { listCustomers } from '../actions/customerActions';
import { createProject } from '../actions/projectActions';

const theme = createTheme();

const CreateProjectScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fixedOptions = [];
  const fixCustomers = [];
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/dashboard/project';
  const [startsDate, setStartsDate] = useState(dayjs('2021-08-18T21:11:54'));
  const [endsDate, setEndsDate] = useState(dayjs('2021-08-18T21:11:54'));
  const [standard, setStandard] = useState('');
  const [projectName, setProjectName] = useState('');
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');
  const [users, setUsers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [message, setMessage] = useState(null);

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo } = userRegister;

  const listStandard = useSelector((state) => state.listStandard);
  const { standards, id: standardId } = listStandard;

  const userList = useSelector((state) => state.userList);
  const { loading, error, users: listUser } = userList;

  const customerList = useSelector((state) => state.customerList);
  const { customers: listCustomer } = customerList;

  useEffect(() => {
    // if (userInfo && userInfo.isAdmin) {
    dispatch(standardListData());
    dispatch(listUsers());
    dispatch(listCustomers());
    //  } else {
    //   navigate('/login');
    //  }
  }, [dispatch, userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProject(startsDate, endsDate, standard, projectName, status, description, users, customers));
    console.log(startsDate, endsDate, standard, projectName, status, description, users, customers);
    navigate(redirect);
    // if (password !== confirmPassword) {
    //   setMessage('Passwords do not match');
    // } else {
    //   dispatch(register(fname, lname, contact, department, role, email, password, isActive));
    //   navigate(redirect);
    // }
  };

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
          <Grid item xs={12} sm={15}>
            <Button variant="outlined" startIcon={<ArrowBackIosIcon />} component={RouterLink} to={'/'}>
              Go Back
            </Button>
          </Grid>
          <Typography component="h1" variant="h5">
            New Project
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
              <Grid item xs={12} sm={20}>
                <TextField
                  variant="outlined"
                  autoComplete="given-name"
                  name="ProjectName"
                  required
                  fullWidth
                  id="ProjectName"
                  label="Project Name"
                  autoFocus
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </Grid>
              <Grid item xs={13} sm={13}>
                <FormControl sx={{ width: 300 }}>
                  <InputLabel id="demo-simple-select-autowidth-label">standard</InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={standard}
                    onChange={(e) => setStandard(e.target.value)}
                    fullWidth
                    label="Department"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {standards.map((stand) => (
                      <MenuItem key={stand._id} value={stand.standards}>
                        {stand.standards}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={13}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      label="Starts Date"
                      inputFormat="MM/DD/YYYY"
                      value={startsDate}
                      onChange={(newValue) => {
                        setStartsDate(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={13}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      label="Ends Date"
                      inputFormat="MM/DD/YYYY"
                      value={endsDate}
                      onChange={(newValue) => {
                        setEndsDate(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormControl sx={{ width: 250 }}>
                  <InputLabel>Status</InputLabel>
                  <Select value={status} onChange={(e) => setStatus(e.target.value)} fullWidth label="Status">
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={'Yet to Start'}>Yet to Start</MenuItem>
                    <MenuItem value={'In Progress'}>In Progress</MenuItem>
                    <MenuItem value={'hold'}>Hold</MenuItem>
                    <MenuItem value={'Completed'}>Completed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={14}>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { width: '35ch' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Project Description"
                    multiline
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    maxRows={4}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={30}>
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  options={listUser}
                  value={users}
                  onChange={(event, newValue) => {
                    setUsers([...fixedOptions, ...newValue.filter((option) => fixedOptions.indexOf(option) === -1)]);
                  }}
                  getOptionLabel={(option) => option.email}
                  //  defaultValue={[listUser[1]]}
                  filterSelectedOptions
                  renderInput={(params) => <TextField {...params} label="Users" placeholder="Favorites" />}
                />
              </Grid>
              <Grid item xs={12} sm={20}>
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  value={customers}
                  onChange={(event, newValu) => {
                    setCustomers([...fixCustomers, ...newValu.filter((option) => fixCustomers.indexOf(option) === -1)]);
                  }}
                  options={listCustomer}
                  getOptionLabel={(option) => option.email}
                  filterSelectedOptions
                  renderInput={(params) => <TextField {...params} label="Customers" placeholder="Favorites" />}
                />
              </Grid>

              <Grid item xs={12} />
            </Grid>
            <Grid item xs={12} />
            <Button type="submit" fullWidth variant="contained">
              Create Project
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default CreateProjectScreen;

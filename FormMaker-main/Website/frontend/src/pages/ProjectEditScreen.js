import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { Box, Divider, Autocomplete } from '@mui/material';
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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { updateQuestion, getQuestionDetails } from '../actions/questionActions';
import { updateProject, getProjectDetails } from '../actions/projectActions';
import { QUESTION_UPDATE_RESET, QUESTION_DETAILS_RESET } from '../constants/questionConstants';
import { PROJECT_UPDATE_RESET } from '../constants/projectConstants';
import { register, listUsers } from '../actions/userActions';
import { standardListData } from '../actions/dataAction';
import { listCustomers } from '../actions/customerActions';

const theme = createTheme();

const ProjectEditScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: projectId } = useParams();

  const fixedOptions = [];
  const fixCustomers = [];
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';
  const [startsDate, setStartsDate] = useState(dayjs('2021-08-18T21:11:54'));
  const [endsDate, setEndsDate] = useState(dayjs('2021-08-18T21:11:54'));
  const [standard, setStandard] = useState('');
  const [projectName, setProjectName] = useState('');
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');
  const [users, setUsers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [message, setMessage] = useState(null);

  const [header, setHeader] = useState('');

  const [subHeader1, setSubHeader1] = useState('');
  const [subHeader2, setSubHeader2] = useState('');
  const [subHeader3, setSubHeader3] = useState('');
  const [subHeader4, setSubHeader4] = useState('');
  const [subHeader5, setSubHeader5] = useState('');
  const [questions, setQuestions] = useState({});
  const [question, setQuestion] = useState('');
  const [areaofaudit, setAreaofaudit] = useState('');

  const [expectedProofs, setExpectedProofs] = useState('');

  const projectDetails = useSelector((state) => state.projectDetails);
  const { loading, error, project: detailproject } = projectDetails;
  // console.log(detailQuestion.get(question));

  const projectUpdate = useSelector((state) => state.projectUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = projectUpdate;

  const listStandard = useSelector((state) => state.listStandard);
  const { standards, id } = listStandard;

  const userList = useSelector((state) => state.userList);
  const { users: listUser } = userList;

  const customerList = useSelector((state) => state.customerList);
  const { customers: listCustomer } = customerList;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PROJECT_UPDATE_RESET });
      navigate('/dashboard/project');
    } else if (!detailproject.projectName || detailproject._id !== projectId) {
      dispatch(getProjectDetails(projectId));
      dispatch(standardListData());
      dispatch(listUsers());
      dispatch(listCustomers());
    } else {
      setProjectName(detailproject.projectName);
      setStandard(detailproject.standard);
      setDescription(detailproject.description);
      setStartsDate(detailproject.startsDate);
      setEndsDate(detailproject.endsDate);
      setStatus(detailproject.status);
      setUsers(detailproject.users);
      setCustomers(detailproject.customers);
      // setQuestion(detailQuestion.questions.question);
      // setAreaofaudit(detailQuestion.questions.areaofaudit);
      // setDescription(detailQuestion.questions.description);
      // setExpectedProofs(detailQuestion.questions.expectedProofs);
    }
  }, [detailproject, dispatch, projectId, successUpdate, navigate]);

  // const handleHeaderQueastion = (evt) => {
  //   const value = evt.target.value;
  //   setQuestions({
  //     ...questions,
  //     [evt.target.name]: value,
  //   });
  // };
  // function handleChange(evt) {
  //   const value = evt.target.value;
  //   setState({
  //     ...state,
  //     [evt.target.name]: value
  //   });
  // }
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProject({
        _id: projectId,
        startsDate,
        endsDate,
        standard,
        projectName,
        status,
        description,
        users,
        customers,
      })
    );
  };
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
                to={'/dashboard/project'}
              >
                Go Back
              </Button>
            </Grid>
            <Grid item xs={12} sm={10}>
              <Typography component="h1" variant="h5" sx={{ position: 'center' }}>
                Edit Project
              </Typography>
            </Grid>
          </Grid>
          <Stack>
            {error && <Alert severity="error">{error} </Alert>}
            {message && <Alert security="error">{message}</Alert>}
          </Stack>
          <Box component="form" noValidate onSubmit={submitHandler} sx={{ mt: 3 }}>
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
                  //   defaultValue={[listUser[1]]}
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
              <Grid item xs={20} />
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
export default ProjectEditScreen;

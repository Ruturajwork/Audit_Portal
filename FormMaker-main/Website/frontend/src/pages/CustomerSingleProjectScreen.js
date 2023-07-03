import * as React from 'react';

import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Divider,
  Autocomplete,
  Icon,
} from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import OpenWithRoundedIcon from '@mui/icons-material/OpenWithRounded';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import Switch from '@mui/material/Switch';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getProjectCDetails } from '../actions/projectActions';

const theme = createTheme();

const CustomerSingleProjectScreen = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: projectId } = useParams();

  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const customerLogin = useSelector((state) => state.customerLogin);
  const { customerInfo } = customerLogin;
  // console.log(customerInfo);

  const projectDetails = useSelector((state) => state.projectDetails);
  const { loading, error, project } = projectDetails;

  const [versionState, setVersionState] = useState(null);
  const [value, setValue] = useState(0);
  const [addVersion, setAddVersion] = React.useState(false);
  const handleAddOpen = () => setAddVersion(true);
  const handleAddClose = () => setAddVersion(false);
  const [states, setStates] = useState();

  const handleOpen = (index) => {
    ///  index = 0;
    // setState(version);
    setOpen(true);
    setVersionState(index);
  };

  const id = projectId;

  const style1 = {
    // position: 'relative',
    display: 'inline-block',
    //  top: '50%',
    //  left: '50%',
    //  transform: 'translate(-50%, -50%)',
    //   width: 800,
    // bgcolor: '#f5f5f5',
    // border: '2px solid #000',
    // boxShadow: 24,
    p: 4,
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
    // marginTop: 10,
    overflow: 'auto',
  };

  const style2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 380,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: '16px',
    p: 4,
  };

  useEffect(() => {
    if (customerInfo) {
      dispatch(getProjectCDetails(projectId));
    } else {
      navigate('/404');
    }
  }, [dispatch, customerInfo, projectId, navigate, versionState]);

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Grid container spacing={12}>
        <Grid item xs={4} md={4}>
          <Button
            //  sx={{ marginRight: 50 }}
            variant="outlined"
            component={RouterLink}
            to={`/customer/dashboard/myClist`}
            startIcon={<ArrowBackIosOutlinedIcon />}
          >
            Go Back
          </Button>
        </Grid>
      </Grid>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        //  <><Box sx={{ width: '100%' }}>
        <>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
              <Tab label="Version1" {...a11yProps(0)} />

              {project.version2.length !== 0 ? (
                <Tab label="Version2" {...a11yProps(1)} />
              ) : (
                <Tab label="Version2" {...a11yProps(1)} disabled />
              )}
              {project.version3.length !== 0 ? (
                <Tab label="Version3" {...a11yProps(2)} />
              ) : (
                <Tab label="Version3" {...a11yProps(2)} disabled />
              )}
              {/* <Tab label="Version3" {...a11yProps(2)} disabled /> */}
            </Tabs>
          </Box>
          <Box sx={{ width: '100%' }}>
            {/* version 1 Tab */}
            <TabPanel value={value} index={0}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Sr.No</TableCell>
                    <TableCell align="center">header</TableCell>
                    <TableCell align="center">subHeader1</TableCell>
                    <TableCell align="center">subHeader2</TableCell>
                    <TableCell align="center">subHeader3</TableCell>
                    <TableCell align="center">subHeader4</TableCell>
                    <TableCell align="center"> subHeader5</TableCell>
                    <TableCell align="center">question</TableCell>

                    <TableCell align="center">Open</TableCell>
                    {/* <TableCell align="center">Delete</TableCell>  */}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {project.version1.map((que, index) => (
                    <TableRow key={que._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        {index + 1}
                        {/* {console.log(que._id)} */}
                      </TableCell>
                      <TableCell align="left">{que.header.toUpperCase()}</TableCell>
                      <TableCell align="center">{que.subHeader1}</TableCell>
                      <TableCell align="center">{que.subHeader2}</TableCell>
                      <TableCell align="center">{que.subHeader3}</TableCell>
                      <TableCell align="center">{que.subHeader4}</TableCell>
                      <TableCell align="center">{que.subHeader5}</TableCell>
                      <TableCell align="left">{que.questions.question}</TableCell>
                      {/* <TableCell align="right">{que.questions.areaofaudit}</TableCell> */}
                      <TableCell>
                        <IconButton
                          variant="outlined"
                          component={RouterLink}
                          // to={`/project/bank/${que._id}/edit?index=${index}?prId=${projectId}`}
                          to={`/cust/project/bank/v1/${projectId}/edit?index=${index}`}
                          // </TableRow>/bank/v1
                          //  onClick={handleOpen}
                        >
                          <Icon as={OpenWithRoundedIcon} sx={{ color: green[500] }} w="8" h="8" />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        {/* <IconButton
                          variant="outlined"
                          component={RouterLink}
                          // to={`/project/bank/${que._id}/edit?index=${index}?prId=${projectId}`}
                          //  to={`/project/bank/${projectId}/edit?index=${index}`}
                          // </TableRow>
                          //  onClick={handleOpen}
                          value={versionState}
                          onClick={() => handleOpen(index)}
                          // onClick={() => setVersionState(index)}
                        >
                          <Icon as={OpenWithRoundedIcon} sx={{ color: green[500] }} w="8" h="8" />
                        </IconButton> */}
                        {/* <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Container component="main" maxWidth="xs" key={que._id}>
                            <CssBaseline />

                           

                            <Box sx={style} key={que._id}>
                              <TableContainer sx={{ maxHeight: 540 }} key={que._id}>
                                <Typography component="h1" variant="h4">
                                  Question : {project.version1[+versionState].questions.question} ?
                                </Typography>
                                <Divider />
                                <Typography component="h1" variant="h5">
                                  Area Of Audit : {project.version1[+versionState].questions.areaofaudit}.
                                </Typography>

                                <Typography component="h1" variant="body2">
                                  <span style={{ fontWeight: 800, fontSize: 16 }}>Description :</span>{' '}
                                  {project.version1[+versionState].questions.description}.
                                </Typography>
                                <Divider />
                                <Typography component="h1" variant="body2">
                                  <span style={{ fontWeight: 800, fontSize: 16 }}>Expected Prooof : </span>
                                  {project.version1[+versionState].questions.expectedProofs}.
                                </Typography>

                                <Typography component="h1" variant="h5">
                                  Threat : {project.version1[+versionState].questions.threat}.
                                </Typography>

                                <Box component="form" noValidate onSubmit={submitHandler} sx={{ marginTop: 4 }}>
                                  <Grid container sx={{ marginTop: 4 }}>
                                    <Grid item xs={20}>
                                      <TextField
                                        variant="outlined"
                                        autoComplete="given-name"
                                        name="Result and Observation"
                                        required
                                        fullWidth
                                        id="result"
                                        label="Result and Observation"
                                        autoFocus
                                        multiline
                                        size="small"
                                        //  defaultValue={project.version1[+versionState].questions.resultAndObservation}
                                        value={resultAndObservation}
                                        onChange={(e) => setResultAndObservation(e.target.value)}
                                      />
                                    </Grid>

                                    <Grid item xs={20} sx={{ marginTop: 4 }}>
                                      <TextField
                                        variant="outlined"
                                        autoComplete="given-name"
                                        name="Recomendation"
                                        required
                                        fullWidth
                                        id="Recomendation"
                                        label=" Recomendation"
                                        autoFocus
                                        multiline
                                        size="small"
                                        value={recomendation}
                                        //  defaultValue={project.version1[+versionState].questions.recomendation}
                                        onChange={(e) => setRecomendation(e.target.value)}
                                      />
                                    </Grid>
                                  </Grid>
                                  <Grid item xs={12} sm={10}>
                                    <FormControl sx={{ mt: 2, width: '30ch' }}>
                                      <InputLabel id="demo-simple-select-label"> Auditor Rating</InputLabel>
                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="rating"
                                        value={auditorRating}
                                        label="Auditor Rating"
                                        onChange={(e) => setAuditorRating(e.target.value)}
                                      >
                                        <MenuItem value={'Critical'}>Critical</MenuItem>
                                        <MenuItem value={'High'}>High</MenuItem>
                                        <MenuItem value={'Medium'}>Medium</MenuItem>
                                        <MenuItem value={'Low'}>Low</MenuItem>
                                        <MenuItem value={'Strong'}>Strong</MenuItem>
                                        <MenuItem value={'Partially Strong'}>Partially Strong</MenuItem>
                                        <MenuItem value={'Partially Weak'}>Partially Weak</MenuItem>
                                        <MenuItem value={'Fully Implemented'}>Fully Implemented</MenuItem>
                                        <MenuItem value={'Partially Implemented'}>Partially Implemented</MenuItem>
                                        <MenuItem value={'Not Applicable'}>Not Applicable</MenuItem>
                                        <MenuItem value={'Not Implemented'}>Not Implemented</MenuItem>
                                      </Select>
                                    </FormControl>
                                  </Grid>
                                  <Button type="submit" variant="contained" sx={{ mt: 2 }} onSubmit={submitHandler}>
                                    Save
                                  </Button>
                                </Box>
                              </TableContainer>
                            </Box>
                          </Container>
                        </Modal> */}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabPanel>

            {/* version 2 Tab */}

            <TabPanel value={value} index={1}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Sr.No</TableCell>
                    <TableCell align="right">header</TableCell>
                    <TableCell align="right">subHeader1</TableCell>
                    <TableCell align="right">subHeader2</TableCell>
                    <TableCell align="right">subHeader3</TableCell>
                    <TableCell align="right">subHeader4</TableCell>
                    <TableCell align="right"> subHeader5</TableCell>
                    <TableCell align="right">question</TableCell>

                    <TableCell align="left">Open</TableCell>
                    {/* <TableCell align="right">Delete</TableCell>  */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {project.version2.map((que, index) => (
                    <TableRow key={que._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        {index + 1}
                        {/* {console.log(que._id)} */}
                      </TableCell>
                      <TableCell align="right">{que.header.toUpperCase()}</TableCell>
                      <TableCell align="right">{que.subHeader1}</TableCell>
                      <TableCell align="right">{que.subHeader2}</TableCell>
                      <TableCell align="right">{que.subHeader3}</TableCell>
                      <TableCell align="right">{que.subHeader4}</TableCell>
                      <TableCell align="right">{que.subHeader5}</TableCell>
                      <TableCell align="right">{que.questions.question}</TableCell>
                      {/* <TableCell align="right">{que.questions.areaofaudit}</TableCell> */}
                      {/* <TableCell>
                      <IconButton
                        variant="outlined"
                        component={RouterLink}
                        // to={`/project/bank/${que._id}/edit?index=${index}?prId=${projectId}`}
                        to={`/project/bank/${projectId}/edit?index=${index}`}
                        // </TableRow>
                        //  onClick={handleOpen}
                      >
                        <Icon as={OpenWithRoundedIcon} sx={{ color: green[500] }} w="8" h="8" />
                      </IconButton>
                    </TableCell> */}
                      <TableCell>
                        <IconButton
                          variant="outlined"
                          component={RouterLink}
                          // to={`/project/bank/${que._id}/edit?index=${index}?prId=${projectId}`}
                          to={`/cust/project/bank/v2/${projectId}/edit?index=${index}`}
                          // </TableRow>
                          //  onClick={handleOpen}
                          value={versionState}
                          onClick={() => handleOpen(index)}
                          // onClick={() => setVersionState(index)}
                        >
                          <Icon as={OpenWithRoundedIcon} sx={{ color: green[500] }} w="8" h="8" />
                        </IconButton>
                        {/* <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Container component="main" maxWidth="xs" key={que._id}>
                            <CssBaseline />

                           

                            <Box sx={style} key={que._id}>
                              <TableContainer sx={{ maxHeight: 540 }}>
                                <Typography component="h1" variant="h4">
                                  Question : {project.version2[+versionState].questions.question} ?
                                </Typography>
                                <Divider />
                                <Typography component="h1" variant="h5">
                                  Area Of Audit : {project.version2[+versionState].questions.areaofaudit}.
                                </Typography>

                                <Typography component="h1" variant="body2">
                                  <span style={{ fontWeight: 800, fontSize: 16 }}>Description :</span>{' '}
                                  {project.version2[+versionState].questions.description}.
                                </Typography>
                                <Divider />
                                <Typography component="h1" variant="body2">
                                  <span style={{ fontWeight: 800, fontSize: 16 }}>Expected Prooof : </span>
                                  {project.version1[+versionState].questions.expectedProofs}.
                                </Typography>

                                <Typography component="h1" variant="h5">
                                  Threat : {project.version2[+versionState].questions.threat}.
                                </Typography>

                                <Box component="form" noValidate onSubmit={submitV2Handler} sx={{ marginTop: 4 }}>
                                  <Grid container sx={{ marginTop: 4 }}>
                                    <Grid item xs={20}>
                                      <TextField
                                        variant="outlined"
                                        autoComplete="given-name"
                                        name="Result and Observation"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="Result and Observation"
                                        autoFocus
                                        multiline
                                        size="small"
                                        //  defaultValue={project.version1[+versionState].questions.resultAndObservation}
                                        value={resultAndV2Observation}
                                        onChange={(e) => setResultAndV2Observation(e.target.value)}
                                      />
                                    </Grid>

                                    <Grid item xs={20} sx={{ marginTop: 4 }}>
                                      <TextField
                                        variant="outlined"
                                        autoComplete="given-name"
                                        name="Recomendation"
                                        required
                                        fullWidth
                                        id="Recomendation"
                                        label=" Recomendation"
                                        autoFocus
                                        multiline
                                        size="small"
                                        value={recomendationv2}
                                        //  defaultValue={project.version1[+versionState].questions.recomendation}
                                        onChange={(e) => setRecomendationv2(e.target.value)}
                                      />
                                    </Grid>
                                  </Grid>
                                  <Grid item xs={12} sm={10}>
                                    <FormControl sx={{ mt: 2, width: '30ch' }}>
                                      <InputLabel id="demo-simple-select-label"> Auditor Rating</InputLabel>
                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="rating"
                                        value={auditorRatingv2}
                                        label="Auditor Rating"
                                        onChange={(e) => setAuditorRatingv2(e.target.value)}
                                      >
                                        <MenuItem value={'Critical'}>Critical</MenuItem>
                                        <MenuItem value={'High'}>High</MenuItem>
                                        <MenuItem value={'Medium'}>Medium</MenuItem>
                                        <MenuItem value={'Low'}>Low</MenuItem>
                                        <MenuItem value={'Strong'}>Strong</MenuItem>
                                        <MenuItem value={'Partially Strong'}>Partially Strong</MenuItem>
                                        <MenuItem value={'Partially Weak'}>Partially Weak</MenuItem>
                                        <MenuItem value={'Fully Implemented'}>Fully Implemented</MenuItem>
                                        <MenuItem value={'Partially Implemented'}>Partially Implemented</MenuItem>
                                        <MenuItem value={'Not Applicable'}>Not Applicable</MenuItem>
                                        <MenuItem value={'Not Implemented'}>Not Implemented</MenuItem>
                                      </Select>
                                    </FormControl>
                                  </Grid>
                                  <Button type="submit" variant="contained" sx={{ mt: 2 }} onSubmit={submitV2Handler}>
                                    Save
                                  </Button>
                                </Box>
                              </TableContainer>
                            </Box>
                          </Container>
                        </Modal> */}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabPanel>

            {/* version 3 Tab */}
            <TabPanel value={value} index={2}>
              <Table sx={{ minWidth: 650, marginTop: 3 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Sr.No</TableCell>
                    <TableCell align="right">header</TableCell>
                    <TableCell align="right">subHeader1</TableCell>
                    <TableCell align="right">subHeader2</TableCell>
                    <TableCell align="right">subHeader3</TableCell>
                    <TableCell align="right">subHeader4</TableCell>
                    <TableCell align="right"> subHeader5</TableCell>
                    <TableCell align="right">question</TableCell>

                    <TableCell align="left">Open</TableCell>
                    {/* <TableCell align="right">Delete</TableCell>  */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {project.version3.map((que, index) => (
                    <TableRow key={que._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        {index + 1}
                        {/* {console.log(que._id)} */}
                      </TableCell>
                      <TableCell align="right">{que.header.toUpperCase()}</TableCell>
                      <TableCell align="right">{que.subHeader1}</TableCell>
                      <TableCell align="right">{que.subHeader2}</TableCell>
                      <TableCell align="right">{que.subHeader3}</TableCell>
                      <TableCell align="right">{que.subHeader4}</TableCell>
                      <TableCell align="right">{que.subHeader5}</TableCell>
                      <TableCell align="right">{que.questions.question}</TableCell>
                      {/* <TableCell align="right">{que.questions.areaofaudit}</TableCell> */}
                      <TableCell>
                        <IconButton
                          variant="outlined"
                          component={RouterLink}
                          // to={`/project/bank/${que._id}/edit?index=${index}?prId=${projectId}`}
                          to={`/cust/project/bank/v3/${projectId}/edit?index=${index}`}
                          // </TableRow>/cust/project/bank/v2
                          //  onClick={handleOpen}
                        >
                          <Icon as={OpenWithRoundedIcon} sx={{ color: green[500] }} w="8" h="8" />
                        </IconButton>
                      </TableCell>
                      {/* <TableCell>
                        <IconButton
                          variant="outlined"
                          component={RouterLink}
                          // to={`/project/bank/${que._id}/edit?index=${index}?prId=${projectId}`}
                          //  to={`/project/bank/${projectId}/edit?index=${index}`}
                          // </TableRow>
                          //  onClick={handleOpen}
                          value={versionState}
                          onClick={() => handleOpen(index)}
                          // onClick={() => setVersionState(index)}
                        >
                          <Icon as={OpenWithRoundedIcon} sx={{ color: green[500] }} w="8" h="8" />
                        </IconButton>
                        {/* <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Container component="main" maxWidth="xs" key={que._id}>
                            <CssBaseline />

                           

                            <Box sx={style} key={que._id}>
                              <TableContainer sx={{ maxHeight: 540 }}>
                                <Typography component="h1" variant="h4">
                                  Question : {project.version3[+versionState].questions.question} ?
                                </Typography>
                                <Divider />
                                <Typography component="h1" variant="h5">
                                  Area Of Audit : {project.version3[+versionState].questions.areaofaudit}.
                                </Typography>

                                <Typography component="h1" variant="body2">
                                  <span style={{ fontWeight: 800, fontSize: 16 }}>Description :</span>{' '}
                                  {project.version3[+versionState].questions.description}.
                                </Typography>
                                <Divider />
                                <Typography component="h1" variant="body2">
                                  <span style={{ fontWeight: 800, fontSize: 16 }}>Expected Prooof : </span>
                                  {project.version1[+versionState].questions.expectedProofs}.
                                </Typography>

                                <Typography component="h1" variant="h5">
                                  Threat : {project.version3[+versionState].questions.threat}.
                                </Typography>

                                <Box component="form" noValidate onSubmit={submitV3Handler} sx={{ marginTop: 4 }}>
                                  <Grid container sx={{ marginTop: 4 }}>
                                    <Grid item xs={20}>
                                      <TextField
                                        variant="outlined"
                                        autoComplete="given-name"
                                        name="Result and Observation"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="Result and Observation"
                                        autoFocus
                                        multiline
                                        size="small"
                                        //  defaultValue={project.version1[+versionState].questions.resultAndObservation}
                                        value={resultAndObservation}
                                        onChange={(e) => setResultAndObservation(e.target.value)}
                                      />
                                    </Grid>

                                    <Grid item xs={20} sx={{ marginTop: 4 }}>
                                      <TextField
                                        variant="outlined"
                                        autoComplete="given-name"
                                        name="Recomendation"
                                        required
                                        fullWidth
                                        id="Recomendation"
                                        label=" Recomendation"
                                        autoFocus
                                        multiline
                                        size="small"
                                        value={recomendation}
                                        //  defaultValue={project.version1[+versionState].questions.recomendation}
                                        onChange={(e) => setRecomendation(e.target.value)}
                                      />
                                    </Grid>
                                  </Grid>
                                  <Grid item xs={12} sm={10}>
                                    <FormControl sx={{ mt: 2, width: '30ch' }}>
                                      <InputLabel id="demo-simple-select-label"> Auditor Rating</InputLabel>
                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="rating"
                                        value={auditorRating}
                                        label="Auditor Rating"
                                        onChange={(e) => setAuditorRating(e.target.value)}
                                      >
                                        <MenuItem value={'Critical'}>Critical</MenuItem>
                                        <MenuItem value={'High'}>High</MenuItem>
                                        <MenuItem value={'Medium'}>Medium</MenuItem>
                                        <MenuItem value={'Low'}>Low</MenuItem>
                                        <MenuItem value={'Strong'}>Strong</MenuItem>
                                        <MenuItem value={'Partially Strong'}>Partially Strong</MenuItem>
                                        <MenuItem value={'Partially Weak'}>Partially Weak</MenuItem>
                                        <MenuItem value={'Fully Implemented'}>Fully Implemented</MenuItem>
                                        <MenuItem value={'Partially Implemented'}>Partially Implemented</MenuItem>
                                        <MenuItem value={'Not Applicable'}>Not Applicable</MenuItem>
                                        <MenuItem value={'Not Implemented'}>Not Implemented</MenuItem>
                                      </Select>
                                    </FormControl>
                                  </Grid>
                                  <Button type="submit" variant="contained" sx={{ mt: 2 }} onSubmit={submitV3Handler}>
                                    Save
                                  </Button>
                                </Box>
                              </TableContainer>
                            </Box>
                          </Container>
                        </Modal> */}
                      {/*  </TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabPanel>
          </Box>
          {/* <Typography sx={{ textAlign: 'center' }}>Bank Name :{project.projectName} </Typography> */}
        </>
      )}
    </>
  );
};

export default CustomerSingleProjectScreen;

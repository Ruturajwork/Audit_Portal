import * as React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { Box, Divider, TableContainer } from '@mui/material';
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
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Loader from '../components/Loader';
import Message from '../components/Message';

import { getProjectcDetails, listMyProjects, updateProjectV3Questions } from '../actions/projectActions';
import { PROJECT_UPDATE_QUESTION_RESET } from '../constants/projectConstants';

const EditProjectV3QuestionScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: projectId } = useParams();
  const [uploading, setUploading] = useState(false);
  const [proof, setProof] = useState('');

  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const projectDetailss = useSelector((state) => state.projectDetailss);
  const { loading, error, project } = projectDetailss;

  const projectUpdateQuestion = useSelector((state) => state.projectUpdateQuestion);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = projectUpdateQuestion;

  const [resultAndObservation, setResultAndObservation] = useState('');
  const [threat, setThreat] = useState('');
  const [recomendation, setRecomendation] = useState('');
  const [auditorRating, setAuditorRating] = useState('');

  const index = searchParams.get('index');
  const version = searchParams.get('vers');

  const data1 = JSON.parse(localStorage.getItem('project'));

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('data');
    dispatch(updateProjectV3Questions(index, resultAndObservation, auditorRating, recomendation, projectId, proof));
    navigate(`/project/${projectId}/open`);
  };

  // const prId = searchParams.get('prId');
  // console.log(ind);
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
  // console.log(projectId);
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PROJECT_UPDATE_QUESTION_RESET });
      navigate(`/project/${projectId}/open`);
    } else if (userInfo) {
      dispatch(getProjectcDetails(projectId));
      setResultAndObservation(data1.version3[index].questions.resultAndObservation);
      setRecomendation(data1.version3[index].questions.recomendation);
      setAuditorRating(data1.version3[index].questions.auditorRating);
    } else {
      navigate('/404');
    }
  }, [dispatch, userInfo, projectId, navigate, successUpdate]);

  // .question); // .map((que) => console.log(que.questions.question));
  // project.version3.forEach((element, i) => {
  //   console.log(element[i].questions);
  // });
  // useEffect(() => {
  //   if (!userInfo) {
  //     navigate('/404');
  //   }
  // });

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('proof', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const { data } = await axios.post(`/api/uploads`, formData, config);
      setProof(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };
  return (
    <>
      <Button
        variant="outlined"
        component={RouterLink}
        to={`/project/${projectId}/open`}
        startIcon={<ArrowBackIosOutlinedIcon />}
      >
        Go Back
      </Button>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box sx={style}>
            <Typography component="h1" variant="h4">
              Question : {data1.version3[index].questions.question} ?
            </Typography>
            <Divider />
            <Typography component="h1" variant="h5">
              Area Of Audit : {data1.version3[index].questions.areaofaudit}.
            </Typography>

            <Typography component="h1" variant="body2">
              <span style={{ fontWeight: 800, fontSize: 16 }}>Description :</span>{' '}
              {data1.version3[index].questions.description}.
            </Typography>
            <Divider />
            <Typography component="h1" variant="body2">
              <span style={{ fontWeight: 800, fontSize: 16 }}>Expected Prooof : </span>
              {data1.version3[index].questions.expectedProofs}.
            </Typography>

            <Typography component="h1" variant="h5">
              Threat : {data1.version3[index].questions.threat}.
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
                    id="firstName"
                    label="Result and Observation"
                    autoFocus
                    multiline
                    size="small"
                    //  defaultValue={project.version3[index].questions.resultAndObservation}
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
                    //  defaultValue={project.version3[index].questions.recomendation}
                    onChange={(e) => setRecomendation(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
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
                <Grid item xs={6} sx={{ mt: 3, width: '30ch' }}>
                  {/* <TextField>
                      <input type="file" />
                    </TextField> */}
                  {/* <label htmlFor="btn-upload">
                      <input
                        id="btn-upload"
                        name="btn-upload"
                        style={{ display: 'none' }}
                        type="file"
                        onChange={uploadFileHandler}
                      />
                      <Button
                        className="btn-choose"
                        variant="outlined"
                        component="span"
                        //  value={image}
                        //  onChange={(e) => setImage(e.target.value)}
                      >
                      
                      </Button>
                    </label> */}
                  <Button
                    variant="contained"
                    component="label"
                    value={proof}
                    onChange={(e) => setProof(e.target.value)}
                  >
                    Choose Files
                    <input hidden accept="image/*" multiple type="file" onChange={uploadFileHandler} />
                  </Button>
                </Grid>
              </Grid>
              <Button type="submit" variant="contained" sx={{ mt: 2 }} onSubmit={submitHandler}>
                Save
              </Button>
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
};

export default EditProjectV3QuestionScreen;

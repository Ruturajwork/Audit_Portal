import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { Box, Divider } from '@mui/material';
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
import { updateQuestion, getQuestionDetails, registerQuestion } from '../actions/questionActions';
import { standardListData } from '../actions/dataAction';

const theme = createTheme();
const QuestionRegisterScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/dashboard/question';

  const [header, setHeader] = useState('');
  const [standard, setStandard] = useState('');
  const [subHeader1, setSubHeader1] = useState('');
  const [subHeader2, setSubHeader2] = useState('');
  const [subHeader3, setSubHeader3] = useState('');
  const [subHeader4, setSubHeader4] = useState('');
  const [subHeader5, setSubHeader5] = useState('');
  const [questions, setQuestions] = useState({
    // question: '',
    // areaofaudit: '',
    // description: '',
    // expectedProofs: '',
    // resultAndObservation: '',
    // auditorRating: '',
    // recomendation: '',
    // threat: '',
    // proof: '',
  });
  const [question, setQuestion] = useState('');
  const [areaofaudit, setAreaofaudit] = useState('');
  const [description, setDescription] = useState('');
  const [expectedProofs, setExpectedProofs] = useState('');
  const [message, setMessage] = useState(null);

  const questionDetails = useSelector((state) => state.questionDetails);
  const { loading, error, question: detailQuestion } = questionDetails;
  // console.log(detailQuestion.get(question));

  const questionUpdate = useSelector((state) => state.questionUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = questionUpdate;

  const listStandard = useSelector((state) => state.listStandard);
  const { standards, id: standardId } = listStandard;

  useEffect(() => {
    dispatch(standardListData());
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      registerQuestion(
        header,
        standard,
        subHeader1,
        subHeader2,
        subHeader3,
        subHeader4,
        subHeader5,

        question,
        areaofaudit,
        description,
        expectedProofs
        //    }
      )
    );
    navigate(redirect);
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
                to={'/dashboard/question'}
              >
                Go Back
              </Button>
            </Grid>
            <Grid item xs={12} sm={10}>
              <Typography component="h1" variant="h5" sx={{ position: 'center' }}>
                Create Question
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
                  autoComplete="Header"
                  name="Header"
                  fullWidth
                  id="Header"
                  label="Header"
                  autoFocus
                  value={header}
                  onChange={(e) => setHeader(e.target.value)}
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
              <Grid item xs={12} sm={20}>
                <TextField
                  fullWidth
                  id="subHeader1"
                  label="subHeader1"
                  name="subHeader1"
                  autoComplete="subHeader1"
                  value={subHeader1}
                  onChange={(e) => setSubHeader1(e.target.value)}
                />
              </Grid>
              <Grid item xs={13} sm={13}>
                <TextField
                  fullWidth
                  type="SubHeader2"
                  id="SubHeader2"
                  label="SubHeader2"
                  name="SubHeader2"
                  autoComplete="SubHeader2"
                  value={subHeader2}
                  onChange={(e) => setSubHeader2(e.target.value)}
                />
              </Grid>
              <Grid item xs={13} sm={13}>
                <TextField
                  fullWidth
                  type="SubHeader3"
                  id="SubHeader3"
                  label="SubHeader3"
                  name="SubHeader3"
                  autoComplete="SubHeader3"
                  value={subHeader3}
                  onChange={(e) => setSubHeader3(e.target.value)}
                />
              </Grid>
              <Grid item xs={13} sm={13}>
                <TextField
                  fullWidth
                  type="SubHeader4"
                  id="SubHeader4"
                  label="SubHeader4"
                  name="SubHeader4"
                  autoComplete="SubHeader4"
                  value={subHeader4}
                  onChange={(e) => setSubHeader4(e.target.value)}
                />
              </Grid>
              <Grid item xs={13} sm={13}>
                <TextField
                  fullWidth
                  type="SubHeader5"
                  id="SubHeader5"
                  label="SubHeader5"
                  name="SubHeader5"
                  autoComplete="SubHeader5"
                  value={subHeader5}
                  onChange={(e) => setSubHeader5(e.target.value)}
                />
              </Grid>
              <Grid item xs={13} sm={13}>
                <TextField
                  sx={{ m: 1, width: '30ch' }}
                  fullWidth
                  type="question"
                  id="question"
                  name="question"
                  label="Question"
                  //  value={questions.question}
                  value={question}
                  //  onChange={handleHeaderQueastion}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </Grid>{' '}
              <Grid item xs={13} sm={13}>
                <TextField
                  sx={{ m: 1, width: '30ch' }}
                  fullWidth
                  type="areaofaudit"
                  id="areaofaudit"
                  name="areaofaudit"
                  label="Area of Audit"
                  value={areaofaudit}
                  //  value={areaofaudit}
                  // onChange={handleHeaderQueastion}
                  onChange={(e) => setAreaofaudit(e.target.value)}
                />
              </Grid>
              <Grid item xs={13} sm={13}>
                <TextField
                  //  sx={{ m: 1, width: '30ch' }}
                  fullWidth
                  type="description"
                  id="description"
                  name="description"
                  label="Description"
                  //  value={questions.description}
                  value={description}
                  //  onChange={handleHeaderQueastion}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
              <Grid item xs={13} sm={13}>
                <TextField
                  fullWidth
                  type="expectedproof"
                  id="expectedproof"
                  name="expectedproof"
                  label="Expected Proofs"
                  // defaultValue={''}
                  value={expectedProofs}
                  //  value={questions.expectedProofs ? questions.expectedProofs : ' '}
                  // onChange={handleHeaderQueastion}
                  onChange={(e) => setExpectedProofs(e.target.value)}
                />
              </Grid>
              <Divider variant="inset" sx={{ height: '10px' }} />
              <Grid item xs={12} sm={15} />
            </Grid>

            <Button type="submit" fullWidth variant="contained">
              Add
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default QuestionRegisterScreen;

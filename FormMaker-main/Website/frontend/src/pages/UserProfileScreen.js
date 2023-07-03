import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Typography, Card } from '@mui/material';
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
import { updateUserProfile, getUserDetails } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const UserProfileScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

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

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else if (!user.fname) {
      dispatch(getUserDetails('profile'));
    } else {
      setFname(user.fname);
      setEmail(user.email);
      setLname(user.lname);
    }
  }, [navigate, userInfo, user, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(updateUserProfile({ id: user._id, fname, lname, email, password }));
    }
  };

  return (
    <>
      <Helmet>
        <title> Profile | Audix UI </title>
      </Helmet>
      <Container>
        {error && <Message type="error">{error}</Message>}
        {message && <Message type="error">{message}</Message>}
        {success && <Message type="success">Profile updated!</Message>}

        <Card sx={style}>
          <Button
            variant="outlined"
            component={RouterLink}
            to={`/dashboard/app`}
            startIcon={<ArrowBackIosOutlinedIcon />}
          >
            Go Back
          </Button>

          <Typography variant="h3" align="center" gutterBottom sx={{ mt: -5 }}>
            Profile
          </Typography>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message type="error">{error}</Message>
          ) : (
            <Box component="form" noValidate onSubmit={submitHandler} sx={{ mt: 3 }}>
              <Grid container spacing={4} columns={40}>
                <Grid item xs={20} sm={20}>
                  <InputLabel sx={{ color: 'grey[800]', marginBottom: 2 }}>First Name</InputLabel>
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
                <Grid item xs={20} sm={20}>
                  <InputLabel sx={{ color: 'grey[800]', marginBottom: 2 }}>Last Name</InputLabel>
                  <TextField
                    variant="outlined"
                    autoComplete="given-name"
                    name="LastName"
                    required
                    fullWidth
                    id="LastName"
                    label="Last Name"
                    autoFocus
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={20}>
                  <InputLabel sx={{ color: 'grey[800]', marginBottom: 2 }}>Email Address</InputLabel>
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
                <Grid item xs={12} sm={20}>
                  <InputLabel sx={{ color: 'grey[800]', marginBottom: 2 }}>Password</InputLabel>
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
                  <InputLabel sx={{ color: 'grey[800]', marginBottom: 2 }}>Confirm Password</InputLabel>
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
                <Grid item xs={40}>
                  <Button type="submit" variant="contained">
                    Update
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}
        </Card>
      </Container>
    </>
  );
};

export default UserProfileScreen;

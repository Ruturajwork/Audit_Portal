import * as React from 'react';
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

import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../actions/userActions';

const theme = createTheme();

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/home';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      // navigate(redirect ? `/${redirect}` : '/dashboard', { replace: true });
      navigate('/dashboard', { replace: true });
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Stack>
          {error && <Alert severity="error">{error} </Alert>}
          {message && (
            <Alert variant="outlined" severity="error">
              {message}
            </Alert>
          )}
        </Stack>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* <Stack>
            {error && <Alert severity="error">{error} </Alert>}
            {message && (
              <Alert variant="outlined" severity="error">
                {message}
              </Alert>
            )}
          </Stack> */}
          <Box component="form" noValidate onSubmit={submitHandler} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
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
              <Grid item xs={12}>
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

              <Grid item xs={12} />
            </Grid>
            <Button type="submit" fullWidth variant="contained">
              Login
            </Button>
            {/* <Grid container justifyContent="center" sx={{ mt: 3, mb: 2 }}>
                            <Grid item xs={6}>
                                <Link href="/" variant="body2">
                                    New account? Sign Up
                                </Link>
                            </Grid>
                        </Grid> */}
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
};
export default LoginScreen;

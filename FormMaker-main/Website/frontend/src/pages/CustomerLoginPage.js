import { Helmet } from 'react-helmet-async';
// @mui

import {
  Link,
  Container,
  Divider,
  Stack,
  Button,
  Avatar,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Switch,
  Alert,
} from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

// hooks

import { useState, useEffect } from 'react';
import { Link as RouterLink, useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useResponsive from '../hooks/useResponsive';

// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';
// sections
import { customerlogin } from '../actions/customerActions';
// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

const theme = createTheme();

export default function LoginCustomerPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/home';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);

  const customerLogin = useSelector((state) => state.customerLogin);
  const { loading, error, customerInfo } = customerLogin;
  console.log(customerInfo);

  useEffect(() => {
    if (customerInfo) {
      // navigate(redirect ? `/${redirect}` : '/dashboard', { replace: true });
      navigate('/dashboard', { replace: true });
    }
  }, [navigate, customerInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(customerlogin(email, password));
  };

  const mdUp = useResponsive('up', 'md');

  return (
    <>
      <Helmet>
        <title>Customer Login | Audix UI </title>
      </Helmet>

      <StyledRoot>
        {/* <Logo
          sx={{
            // position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        /> */}

        {/* {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <img src="/assets/illustrations/illustration_login.png" alt="login" />
          </StyledSection>
        )} */}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" align="center" gutterBottom>
              Sign in to Audix Global (Customer) !
            </Typography>

            {/* <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider> */}

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
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}

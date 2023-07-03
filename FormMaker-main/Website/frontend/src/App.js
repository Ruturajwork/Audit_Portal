// routes
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from './routes';
import UserRouter from './userRoutes';
import LoginCustomerPage from './pages/CustomerLoginPage';

// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <StyledChart />
      {/* <React.StrictMode> */}
      {/* <LoginCustomerPage /> */}
      <Router />
      {/* {userInfo.isAdmin ? <Router /> : <UserRouter />} */}
      {/* </React.StrictMode> */}
    </ThemeProvider>
  );
}

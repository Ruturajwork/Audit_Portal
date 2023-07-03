import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, Link as RouterLink } from 'react-router-dom';

// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
import { logout } from '../../../actions/userActions';
import { customerLogout } from '../../../actions/customerActions';
// mocks_
import account from '../../../_mock/account';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
  },
  {
    label: 'Settings',
    icon: 'eva:settings-2-fill',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(null);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const customerLogin = useSelector((state) => state.customerLogin);
  const { customerInfo } = customerLogin;

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };
  const logoutHandler = () => {
    dispatch(logout());
    navigate('/audix');
  };

  const logoutCustomerHandler = () => {
    dispatch(customerLogout());
    navigate('/audix');
  };
  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        {userInfo ? (
          <>
            <Box sx={{ my: 1.5, px: 2.5 }}>
              <Typography variant="subtitle2" noWrap>
                {userInfo.fname} {userInfo.lname}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                {userInfo.email}
              </Typography>
            </Box>
            <Divider sx={{ borderStyle: 'dashed' }} />
            <MenuItem to="/" component={RouterLink} sx={{ m: 1 }}>
              Home
            </MenuItem>
            <MenuItem to="/profile" component={RouterLink} sx={{ m: 1 }}>
              Profile
            </MenuItem>
            <Divider sx={{ borderStyle: 'dashed' }} />
            <MenuItem onClick={logoutHandler} sx={{ m: 1 }}>
              Logout
            </MenuItem>
          </>
        ) : customerInfo ? (
          <>
            <Box sx={{ my: 1.5, px: 2.5 }}>
              <Typography variant="subtitle2" noWrap>
                {customerInfo.fname} {customerInfo.lname}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                {customerInfo.email}
              </Typography>
            </Box>
            <Divider sx={{ borderStyle: 'dashed' }} />
            <MenuItem to="/" component={RouterLink} sx={{ m: 1 }}>
              Home
            </MenuItem>
            <MenuItem to="/cprofile" component={RouterLink} sx={{ m: 1 }}>
              Profile
            </MenuItem>
            <Divider sx={{ borderStyle: 'dashed' }} />
            <MenuItem onClick={logoutCustomerHandler} sx={{ m: 1 }}>
              Logout
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem to="/login" component={RouterLink} sx={{ m: 1 }}>
              Login
            </MenuItem>
          </>
        )}

        {/* <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack> */}
        <Divider sx={{ borderStyle: 'dashed' }} />
        {/* <MenuItem onClick={logoutHandler} sx={{ m: 1 }}>
          Logout
        </MenuItem> */}
      </Popover>
    </>
  );
}

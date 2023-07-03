import * as React from 'react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import Modal from '@mui/material/Modal';
import { Link as RouterLink, redirect, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { red, green } from '@mui/material/colors';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import IconButton from '@mui/material/IconButton';
import {
  Container,
  Switch,
  CssBaseline,
  TableHead,
  Icon,
  Grid,
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { listCustomers, deleteCustomer, customerRegisters } from '../actions/customerActions';
import CustomerRegisterScreen from './CustomerRegisterScreen';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
import Iconify from '../components/iconify';

const IOSSwitch = styled((props) => <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />)(
  ({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,

    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  })
);

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const theme = createTheme();

const CustomerScreen = (props) => {
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/home';

  // const [fname, setFname] = useState('');
  // const [lname, setLname] = useState('');
  // const [email, setEmail] = useState('');
  // const [department, setDepartment] = useState('');
  // const [role, setRole] = useState('');
  // const [password, setPassword] = useState('');
  // const [contact, setContact] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  // const [message, setMessage] = useState(null);
  // const [isActive, setIsActive] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const customerList = useSelector((state) => state.customerList);
  const { loading, error, customers } = customerList;

  const customerDelete = useSelector((state) => state.customerDelete);
  const { success: successDelete } = customerDelete;

  // const userRegister = useSelector((state) => state.userRegister);
  // const { loading, error, userInfo} = userRegister;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - customers.length) : 0;
  // console.log(users);
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listCustomers());
    } else {
      navigate('/login');
    }
  }, [dispatch, userInfo, navigate, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteCustomer(id));
    }
  };

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   if (password !== confirmPassword) {
  //     setMessage('Passwords do not match');
  //   } else {
  //     dispatch(register(fname, lname, contact, department, role, email, password, isActive));
  //   }
  // };

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
    <>
      <Helmet>
        <title> Customers | Audix UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Customers
          </Typography>
          <Button variant="contained" onClick={handleOpen} startIcon={<Iconify icon="eva:plus-fill" />}>
            New Customer
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <ThemeProvider>
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box>
                  <CustomerRegisterScreen />
                </Box>
              </Container>
            </ThemeProvider>
          </Modal>
        </Stack>

        <Card>
          <UserListToolbar
          // numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName}
          />
          {loading ? (
            <Loader />
          ) : error ? (
            <Message type="error">{error}</Message>
          ) : (
            <>
              {/* Table For Showing All Customers */}
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Sr.No</TableCell>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Role</TableCell>
                    <TableCell align="center">Active</TableCell>
                    <TableCell align="center">Edit</TableCell>
                    <TableCell align="center">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customers.map((customer, index) => (
                    <TableRow key={customer._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row" align="center">
                        {/* {customer._id} */} {index + 1}
                      </TableCell>
                      <TableCell align="center">
                        {customer.fname} {customer.lname}
                      </TableCell>
                      <TableCell align="center">{customer.email}</TableCell>
                      <TableCell align="center">{customer.department}</TableCell>
                      <TableCell align="center">
                        {/* {user.isActive} */}
                        {customer.isActive ? (
                          <Icon as={CheckCircleIcon} sx={{ color: green[500] }} w="8" h="8" />
                        ) : (
                          <Icon as={CancelIcon} sx={{ color: red[500] }} w="8" h="8" />
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton variant="outlined" component={RouterLink} to={`/customer/${customer._id}/edit`}>
                          {/* <ModeEditIcon color="success" />   */}
                          <Icon as={ModeEditIcon} sx={{ color: green[500] }} w="8" h="8" />
                        </IconButton>
                      </TableCell>

                      {/* button for delete  */}
                      <TableCell align="center">
                        <IconButton
                          aria-label="delete"
                          size="large"
                          color="error"
                          onClick={() => deleteHandler(customer._id)}
                        >
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>
                        {/* <Button variant="contained" component="label" onClick={() => deleteHandler(user._id)}>
                    <DeleteIcon /> Delete
                  </Button> */}
                      </TableCell>
                    </TableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </>
          )}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={customers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
};
export default CustomerScreen;

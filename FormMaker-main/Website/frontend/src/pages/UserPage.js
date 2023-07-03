import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import { Link as RouterLink, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { red, green } from '@mui/material/colors';

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
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { listUsers, deleteUser, register } from '../actions/userActions';
import RegisterScreen from './RegisterScreen';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';

const theme = createTheme();

const TABLE_HEAD = [
  { id: 'srNo', label: 'Sr.No', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  // { id: 'isVerified', label: 'Active', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

const Userpage = (props) => {
  const [open, setOpen] = useState(null);

  const [opena, setOpena] = useState(false);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/home';

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.fname);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const filteredUsers = applySortFilter(users, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  // const userRegister = useSelector((state) => state.userRegister);
  // const { loading, error, userInfo} = userRegister;

  // console.log(users);
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate('/login');
    }
  }, [dispatch, userInfo, navigate, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(id));
    }
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
    <>
      <Helmet>
        <title> Auditors | Audix UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Auditors
          </Typography>
          <Button variant="contained" onClick={handleOpen} startIcon={<Iconify icon="eva:plus-fill" />}>
            New Auditor
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
                  <RegisterScreen onClose={handleClose} />
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
              {/* Table For Showing All Users */}
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
                    {/* <TableCell align="left">Action</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user, index) => (
                    <TableRow key={user._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row" align="center">
                        {/* {user._id} */} {index + 1}
                      </TableCell>
                      <TableCell align="center">
                        {user.fname} {user.lname}
                      </TableCell>
                      <TableCell align="center">{user.email}</TableCell>
                      <TableCell align="center">{user.role}</TableCell>
                      <TableCell align="center">
                        {/* {user.isActive} */}
                        {user.isActive ? (
                          <Icon as={CheckCircleIcon} sx={{ color: green[500] }} w="8" h="8" />
                        ) : (
                          <Icon as={CancelIcon} sx={{ color: red[500] }} w="8" h="8" />
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton variant="outlined" component={RouterLink} to={`/user/${user._id}/edit`}>
                          <Icon as={ModeEditIcon} sx={{ color: green[500] }} w="8" h="8" />
                        </IconButton>
                      </TableCell>

                      {/* button for delete  */}
                      <TableCell align="center">
                        <IconButton
                          aria-label="delete"
                          size="large"
                          color="error"
                          onClick={() => deleteHandler(user._id)}
                        >
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>
                      </TableCell>

                      {/* <TableCell>
                        <TableCell align="center">
                          <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                        <Popover
                          open={Boolean(open)}
                          anchorEl={open}
                          onClose={handleCloseMenu}
                          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                          PaperProps={{
                            sx: {
                              p: 1,
                              width: 140,
                              '& .MuiMenuItem-root': {
                                px: 1,
                                typography: 'body2',
                                borderRadius: 0.75,
                              },
                            },
                          }}
                        >
                          <MenuItem component={RouterLink} to={`/user/${user._id}/edit`}>
                            <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                            Edit
                          </MenuItem>

                          <MenuItem sx={{ color: 'error.main' }} onClick={() => deleteHandler(user._id)}>
                            <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                            Delete
                          </MenuItem>
                        </Popover>
                      </TableCell> */}
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
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          {console.log(users.length)}
        </Card>
      </Container>
    </>
  );
};
export default Userpage;

import * as React from 'react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import Modal from '@mui/material/Modal';
import { Link as RouterLink, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { red, green, blue } from '@mui/material/colors';

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
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import InfoIcon from '@mui/icons-material/Info';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { listMyProjects, getProjectDetails, deleteProject } from '../actions/projectActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Label from '../components/label';
import Iconify from '../components/iconify';
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';

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

export default function MyProjectScreen() {
  //  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [opena, setOpena] = useState(false);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  // const handleOpen = () => {
  //   setOpen(true);
  // };
  // const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState('');
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/home';

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const projectMyList = useSelector((state) => state.projectMyList);
  const { loading: loadingprojects, error: errorprojects, projects } = projectMyList;

  // const customerLogin = useSelector((state) => state.customerLogin);
  // const { loading, error, customerInfo } = customerLogin;

  const projectDelete = useSelector((state) => state.projectDelete);
  const { success: successDelete } = projectDelete;

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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - projects.length) : 0;

  const filteredUsers = applySortFilter(projects, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  useEffect(() => {
    if (userInfo) {
      dispatch(listMyProjects());
    } else {
      navigate('/login');
    }
  }, [dispatch, userInfo, navigate, successDelete]);

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

  const deleteHandler = (id) => {
    if (window.confirm(`Are you sure? ${id}`)) {
      dispatch(deleteProject(id));
    }
  };

  return (
    <>
      <Helmet>
        <title> My Projects | Audix UI </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            My Projects
          </Typography>
          {userInfo.isAdmin ? (
            <>
              <Button
                variant="contained"
                component={RouterLink}
                to={`/project/add`}
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                New Project
              </Button>
            </>
          ) : null}
        </Stack>
        {/* <Button variant="outlined" component={RouterLink} to={`/`} startIcon={<ArrowBackIosOutlinedIcon />}>
          Go Back
        </Button> */}
        <Card>
          <UserListToolbar
          // numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName}
          />
          {loadingprojects ? (
            <Loader />
          ) : errorprojects ? (
            <Message type="error">{errorprojects}</Message>
          ) : (
            <>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Sr.No</TableCell>
                    <TableCell align="center">Project Name</TableCell>
                    <TableCell align="center">Standard</TableCell>
                    <TableCell align="center">Start Date</TableCell>
                    <TableCell align="center">End Date</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Customer Info</TableCell>
                    {/* <TableCell align="center">subHeader5</TableCell> */}

                    {userInfo.isAdmin ? (
                      <>
                        <TableCell align="center">Edit</TableCell>
                        <TableCell align="center">Delete</TableCell>
                      </>
                    ) : null}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {projects.map((projec, index) => (
                    <TableRow key={projec._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="center" component={RouterLink} to={`/project/${projec._id}/open`}>
                        {projec.projectName.toUpperCase()}
                      </TableCell>
                      <TableCell align="center">{projec.standard}</TableCell>
                      <TableCell align="center">{projec.startsDate.substring(0, 10)}</TableCell>
                      <TableCell align="center">{projec.endsDate.substring(0, 10)}</TableCell>
                      <TableCell align="center">{projec.status}</TableCell>

                      {/* <TableCell align="center">
                    {projec.customers.map((eat) => (
                      <div> {eat.email}</div>
                    ))}
                  </TableCell> */}
                      <TableCell align="center">
                        <div>
                          <Typography
                            aria-owns={open ? 'mouse-over-popover' : undefined}
                            aria-haspopup="true"
                            onMouseEnter={handlePopoverOpen}
                            onMouseLeave={handlePopoverClose}
                          >
                            <IconButton aria-label="delete" size="large" color="error">
                              <Icon as={InfoIcon} sx={{ color: blue[500] }} w="8" h="8" />
                            </IconButton>
                            {/* Hover with a Popover. */}
                          </Typography>

                          <Popover
                            id="mouse-over-popover"
                            sx={{
                              pointerEvents: 'none',
                            }}
                            open={open}
                            anchorEl={anchorEl}
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'left',
                            }}
                            transformOrigin={{
                              vertical: 'top',
                              horizontal: 'left',
                            }}
                            onClose={handlePopoverClose}
                            disableRestoreFocus
                          >
                            {/* <Typography sx={{ p: 1 }}>{eat.email}</Typography> */}

                            {projec.customers.map((cust, index) => (
                              <Typography key={projec._id} sx={{ p: 1 }}>
                                <div>{cust.email}</div>
                              </Typography>
                            ))}
                          </Popover>
                        </div>
                      </TableCell>

                      {userInfo.isAdmin ? (
                        <>
                          <TableCell>
                            <IconButton variant="outlined" component={RouterLink} to={`/project/${projec._id}/edit`}>
                              <Icon as={ModeEditIcon} sx={{ color: green[500] }} w="8" h="8" />
                            </IconButton>
                          </TableCell>

                          {/* button for delete  */}
                          <TableCell>
                            <IconButton
                              aria-label="delete"
                              size="large"
                              color="error"
                              onClick={() => deleteHandler(projec._id)}
                            >
                              <DeleteIcon fontSize="inherit" />
                            </IconButton>
                          </TableCell>
                        </>
                      ) : null}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={projects.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          {console.log(projects.length)}
        </Card>
      </Container>
    </>
    // <TableContainer component={Paper}>
    //   <Grid item xs={6}>
    //     <Button variant="outlined" component={RouterLink} to={`/`} startIcon={<ArrowBackIosOutlinedIcon />}>
    //       Go Back
    //     </Button>

    //     {/* Table For Showing All Questions */}

    //   </Grid>
    // </TableContainer>
  );
}

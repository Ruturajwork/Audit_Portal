import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import {
  Container,
  Switch,
  CssBaseline,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Icon,
  Card,
} from '@mui/material';
import { red, green } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { register } from '../actions/userActions';
import {
  listDepartmentData,
  listRoleData,
  addDepartment,
  addRole,
  deleteRole,
  deleteDepartment,
  deleteStandard,
  addStandard,
  standardListData,
  getStandardDetails,
} from '../actions/dataAction';
import Loader from '../components/Loader';
import Message from '../components/Message';

const DataEditScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [opena, setOpena] = useState(false);
  const [openStd, setOpenStd] = useState(false);
  const [departments, setDepartments] = useState('');
  const [roles, setRoles] = useState('');
  const [standards, setStandards] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // const dataStandard = useSelector((state) => state.dataStandard);
  // const { standards: listStandards } = dataStandard;

  const listStandard = useSelector((state) => state.listStandard);
  const { standards: listStandards, id } = listStandard;

  const dataRole = useSelector((state) => state.dataRole);
  const { loading, error, roles: listRoles } = dataRole;

  const dataDepartment = useSelector((state) => state.dataDepartment);
  const { departments: listDepartment } = dataDepartment;

  const roleDelete = useSelector((state) => state.roleDelete);
  const { success: successDelete } = roleDelete;

  const standardDelete = useSelector((state) => state.standardDelete);
  const { success: successStdDelete } = standardDelete;

  const departmentDelete = useSelector((state) => state.departmentDelete);
  const { success: successDepartDelete } = departmentDelete;

  useEffect(() => {
    if (userInfo.isAdmin) {
      dispatch(listDepartmentData());
      dispatch(listRoleData());
      dispatch(standardListData());
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, userInfo, successDelete, successDepartDelete, successStdDelete]);

  // const handleChange = (event) => {
  //   setAge(Number(event.target.value) || '');
  // };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDepartmentClickOpen = () => {
    setOpena(true);
  };

  const handleDepartmentClose = () => {
    setOpena(false);
  };

  const handleStandardClickOpen = () => {
    setOpenStd(true);
  };

  const handleStandardClose = () => {
    setOpenStd(false);
  };

  const submitDepartmentHandler = (e) => {
    e.preventDefault();
    handleDepartmentClose();
    dispatch(addDepartment(departments));

    dispatch(listDepartmentData());
  };

  const submitRoleHandler = (e) => {
    e.preventDefault();
    dispatch(addRole(roles));
    handleClose();
    dispatch(listRoleData());
  };

  const submitStandardHandler = (e) => {
    e.preventDefault();
    dispatch(addStandard(standards));
    handleStandardClose();
    dispatch(standardListData());
  };

  const deleteRoleHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteRole(id));
    }
  };

  const deleteDepartmentHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteDepartment(id));
    }
  };

  const deleteStandardHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteStandard(id));
    }
  };

  const style = {
    //  position: 'absolute',
    textAlign: 'center',

    borderRadius: '16px',
    top: '20%',
    // left: '10%',
    // transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#f5f5f5',
    borderColor: 'grey.500',
    border: '2px solid #000',
    boxShadow: 24,

    // p: 8,
  };

  const style1 = {
    //  position: 'absolute',
    textAlign: 'center',
    borderRadius: '16px',
    top: '20%',
    // left: '50%',

    // transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#f5f5f5',
    border: '2px solid #000',
    boxShadow: 24,
    // p: 4,
  };
  const style2 = {
    //  position: 'relative',
    textAlign: 'center',
    borderRadius: '16px',
    top: '60%',
    // left: '10%',

    // transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#f5f5f5',
    border: '2px solid #000',
    boxShadow: 24,
    // p: 4,
  };
  return (
    <>
      <Helmet>
        <title> Data | Audix UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Data
          </Typography>
        </Stack>
        <Card>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message type="error">{error}</Message>
          ) : (
            <Grid container spacing={4}>
              {userInfo.isSuperAdmin ? (
                <>
                  <Grid item xs={6}>
                    <Box sx={style}>
                      <Typography variant="h4" align="center" gutterBottom>
                        User Roles
                      </Typography>
                      <TableContainer sx={{ maxHeight: 340 }}>
                        <Table
                          sx={{
                            width: 'max-content',
                          }}
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell>Sr.No</TableCell>
                              <TableCell align="right">Role</TableCell>
                              <TableCell align="right">Edit</TableCell>
                              <TableCell align="right">Delete</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {listRoles.map((role, index) => (
                              <TableRow key={role._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                  {/* {role._id} */}
                                  {index + 1}
                                </TableCell>
                                <TableCell align="right">{role.roles}</TableCell>
                                <TableCell>
                                  <IconButton
                                    variant="outlined"
                                    component={RouterLink}
                                    to={`/role/data/${role._id}/edit`}
                                  >
                                    <Icon as={ModeEditIcon} sx={{ color: green[500] }} w="8" h="8" />
                                  </IconButton>
                                </TableCell>
                                <TableCell>
                                  <IconButton
                                    aria-label="delete"
                                    size="large"
                                    color="error"
                                    onClick={() => deleteRoleHandler(role._id)}
                                  >
                                    <DeleteIcon fontSize="inherit" />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <Button style={{ marginBottom: 8 }} onClick={handleClickOpen} variant="outlined">
                        Add Role
                      </Button>
                      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                        <DialogTitle>Add Role</DialogTitle>
                        <DialogContent>
                          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                              {/* <InputLabel htmlFor="demo-dialog-native">Role</InputLabel> */}

                              <TextField
                                required
                                fullWidth
                                variant="outlined"
                                autoComplete="off"
                                name="Role"
                                label="Role"
                                autoFocuslabel="Role"
                                value={roles}
                                onChange={(e) => setRoles(e.target.value)}
                              />
                            </FormControl>
                          </Box>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>Cancel</Button>
                          <Button onClick={submitRoleHandler}>Ok</Button>
                        </DialogActions>
                      </Dialog>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={style1}>
                      <Typography variant="h4" align="center" gutterBottom>
                        User Department
                      </Typography>
                      <Table aria-label="simple table">
                        <TableContainer sx={{ maxHeight: 340 }}>
                          <TableHead>
                            <TableRow>
                              <TableCell>Sr.No</TableCell>
                              <TableCell align="right">Department</TableCell>
                              <TableCell align="right">Edit</TableCell>
                              <TableCell align="right">Delete</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {listDepartment.map((departmen, index) => (
                              <TableRow key={departmen._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                  {/* {departmen._id} */}
                                  {index + 1}
                                </TableCell>
                                <TableCell align="right">{departmen.departments}</TableCell>
                                <TableCell>
                                  <IconButton
                                    variant="outlined"
                                    component={RouterLink}
                                    to={`/department/data/${departmen._id}/edit`}
                                  >
                                    <Icon as={ModeEditIcon} sx={{ color: green[500] }} w="8" h="8" />
                                  </IconButton>
                                </TableCell>
                                <TableCell>
                                  <IconButton
                                    aria-label="delete"
                                    size="large"
                                    color="error"
                                    onClick={() => deleteDepartmentHandler(departmen._id)}
                                  >
                                    <DeleteIcon fontSize="inherit" />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </TableContainer>
                      </Table>
                      <Button
                        style={{ marginBottom: 8 }}
                        onClick={handleDepartmentClickOpen}
                        variant="outlined"
                        color="info"
                      >
                        Add Department
                      </Button>
                      <Dialog disableEscapeKeyDown open={opena} onClose={handleDepartmentClose}>
                        <DialogTitle>Add Department</DialogTitle>
                        <DialogContent>
                          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                              {/* <InputLabel htmlFor="demo-dialog-native">Department</InputLabel> */}

                              <TextField
                                required
                                fullWidth
                                variant="outlined"
                                autoComplete="off"
                                label="Department"
                                name="Department"
                                value={departments}
                                onChange={(e) => setDepartments(e.target.value)}
                              />
                            </FormControl>
                          </Box>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleDepartmentClose}>Cancel</Button>

                          <Button onClick={submitDepartmentHandler}>Ok</Button>
                        </DialogActions>
                      </Dialog>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={style2}>
                      <Typography variant="h4" align="center" gutterBottom>
                        Project Standards
                      </Typography>
                      <TableContainer sx={{ maxHeight: 340 }}>
                        <Table
                          sx={{
                            width: 'max-content',
                          }}
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell>Sr.No</TableCell>
                              <TableCell align="right">Standards</TableCell>
                              <TableCell align="right">Edit</TableCell>
                              <TableCell align="right">Delete</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {listStandards.map((standard, index) => (
                              <TableRow key={standard._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                  {/* {role._id} */}
                                  {index + 1}
                                </TableCell>
                                <TableCell align="right">{standard.standards}</TableCell>
                                <TableCell>
                                  <IconButton
                                    variant="outlined"
                                    component={RouterLink}
                                    to={`/standard/data/${standard._id}/edit`}
                                  >
                                    <Icon as={ModeEditIcon} sx={{ color: green[500] }} w="8" h="8" />
                                  </IconButton>
                                </TableCell>
                                <TableCell>
                                  <IconButton
                                    aria-label="delete"
                                    size="large"
                                    color="error"
                                    onClick={() => deleteStandardHandler(standard._id)}
                                  >
                                    <DeleteIcon fontSize="inherit" />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <Button style={{ marginBottom: 8 }} onClick={handleStandardClickOpen} variant="outlined">
                        Add Standard
                      </Button>
                      <Dialog disableEscapeKeyDown open={openStd} onClose={handleStandardClose}>
                        <DialogTitle>Add Standard</DialogTitle>
                        <DialogContent>
                          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                              <TextField
                                required
                                fullWidth
                                variant="outlined"
                                autoComplete="off"
                                name="Standard"
                                label="Standard"
                                autoFocuslabel="Standard"
                                value={standards}
                                onChange={(e) => setStandards(e.target.value)}
                              />
                            </FormControl>
                          </Box>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleStandardClose}>Cancel</Button>
                          <Button onClick={submitStandardHandler}>Ok</Button>
                        </DialogActions>
                      </Dialog>
                    </Box>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item xs={6}>
                    <Box sx={style1}>
                      <Typography variant="h4" align="center" gutterBottom>
                        User Department
                      </Typography>
                      <Table aria-label="simple table">
                        <TableContainer sx={{ maxHeight: 340 }}>
                          <TableHead>
                            <TableRow>
                              <TableCell>Sr.No</TableCell>
                              <TableCell align="right">Department</TableCell>
                              <TableCell align="right">Edit</TableCell>
                              <TableCell align="right">Delete</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {listDepartment.map((departmen, index) => (
                              <TableRow key={departmen._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                  {/* {departmen._id} */}
                                  {index + 1}
                                </TableCell>
                                <TableCell align="right">{departmen.departments}</TableCell>
                                <TableCell>
                                  <IconButton
                                    variant="outlined"
                                    component={RouterLink}
                                    to={`/department/data/${departmen._id}/edit`}
                                  >
                                    <Icon as={ModeEditIcon} sx={{ color: green[500] }} w="8" h="8" />
                                  </IconButton>
                                </TableCell>
                                <TableCell>
                                  <IconButton
                                    aria-label="delete"
                                    size="large"
                                    color="error"
                                    onClick={() => deleteDepartmentHandler(departmen._id)}
                                  >
                                    <DeleteIcon fontSize="inherit" />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </TableContainer>
                      </Table>
                      <Button
                        style={{ marginBottom: 8 }}
                        onClick={handleDepartmentClickOpen}
                        variant="outlined"
                        color="info"
                      >
                        Add Department
                      </Button>
                      <Dialog disableEscapeKeyDown open={opena} onClose={handleDepartmentClose}>
                        <DialogTitle>Add Department</DialogTitle>
                        <DialogContent>
                          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                              {/* <InputLabel htmlFor="demo-dialog-native">Department</InputLabel> */}

                              <TextField
                                required
                                fullWidth
                                variant="outlined"
                                autoComplete="off"
                                label="Department"
                                name="Department"
                                value={departments}
                                onChange={(e) => setDepartments(e.target.value)}
                              />
                            </FormControl>
                          </Box>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleDepartmentClose}>Cancel</Button>

                          <Button onClick={submitDepartmentHandler}>Ok</Button>
                        </DialogActions>
                      </Dialog>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={style2}>
                      <Typography variant="h4" align="center" gutterBottom>
                        Project Standards
                      </Typography>
                      <TableContainer sx={{ maxHeight: 340 }}>
                        <Table
                          sx={{
                            width: 'max-content',
                          }}
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell>Sr.No</TableCell>
                              <TableCell align="right">Standards</TableCell>
                              <TableCell align="right">Edit</TableCell>
                              <TableCell align="right">Delete</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {listStandards.map((standard, index) => (
                              <TableRow key={standard._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                  {/* {role._id} */}
                                  {index + 1}
                                </TableCell>
                                <TableCell align="right">{standard.standards}</TableCell>
                                <TableCell>
                                  <IconButton
                                    variant="outlined"
                                    component={RouterLink}
                                    to={`/standard/data/${standard._id}/edit`}
                                  >
                                    <Icon as={ModeEditIcon} sx={{ color: green[500] }} w="8" h="8" />
                                  </IconButton>
                                </TableCell>
                                <TableCell>
                                  <IconButton
                                    aria-label="delete"
                                    size="large"
                                    color="error"
                                    onClick={() => deleteStandardHandler(standard._id)}
                                  >
                                    <DeleteIcon fontSize="inherit" />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <Button style={{ marginBottom: 8 }} onClick={handleStandardClickOpen} variant="outlined">
                        Add Standard
                      </Button>
                      <Dialog disableEscapeKeyDown open={openStd} onClose={handleStandardClose}>
                        <DialogTitle>Add Standard</DialogTitle>
                        <DialogContent>
                          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                              <TextField
                                required
                                fullWidth
                                variant="outlined"
                                autoComplete="off"
                                name="Standard"
                                label="Standard"
                                autoFocuslabel="Standard"
                                value={standards}
                                onChange={(e) => setStandards(e.target.value)}
                              />
                            </FormControl>
                          </Box>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleStandardClose}>Cancel</Button>
                          <Button onClick={submitStandardHandler}>Ok</Button>
                        </DialogActions>
                      </Dialog>
                    </Box>
                  </Grid>
                </>
              )}
            </Grid>
          )}
        </Card>
      </Container>
    </>
  );
};
export default DataEditScreen;

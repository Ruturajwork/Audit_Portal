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
  TableHead,
  Icon,
  CssBaseline,
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
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import axios from 'axios';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { listQuestions, deleteQuestion } from '../actions/questionActions';
import QuestionRegisterScreen from './CreateQuestionScreen';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
import Loader from '../components/Loader';
import Message from '../components/Message';

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
export default function QuestionListScreen() {
  const [open, setOpen] = React.useState(false);
  const [filesToUpload, setFilesToUpload] = useState([]);
  const [xlsx, setXlsx] = useState('');
  const [status, setStatus] = useState('');
  const [error1, setError1] = useState(null);
  const [uploading, setUploading] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState('');
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/home';
  const [opena, setOpena] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const questionList = useSelector((state) => state.questionList);
  const { loading, error, questions } = questionList;

  const questionDelete = useSelector((state) => state.questionDelete);
  const { success: successDelete } = questionDelete;

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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - questions.length) : 0;

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      setError1('No file selected.');
      return;
    }
    const allowedExtensions = ['.xls', '.xlsx'];

    if (!allowedExtensions.includes(file.name.substr(-4))) {
      setError1('Invalid file type. Only Excel files are allowed Please re-upload exel file.');
      return;
    }

    const formData = new FormData();

    formData.append('xlsx', file);

    setUploading(true);
    setError1(null);
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const { data } = await axios.post(`/api/uploads/exel/impdata`, formData, config);
      setXlsx(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listQuestions());
    } else {
      navigate('/login');
    }
  }, [dispatch, userInfo, navigate, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteQuestion(id));
    }
  };
  const style = {
    position: 'absolute',

    //  transform: 'translate(-50%, -50%)',
    width: 1250,

    // bgcolor: '#f5f5f5',
    // border: '2px solid #000',
    // boxShadow: 24,
    // p: 4,
  };

  return (
    <>
      <Helmet>
        <title> Questions | Audix UI </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Questions
          </Typography>
          <Button variant="contained" component="label" value={xlsx} onChange={(e) => setXlsx(e.target.value)}>
            Choose Files
            <input hidden accept="xlsx/*" multiple type="file" onChange={uploadFileHandler} />
          </Button>
          {/* {error1 && <p style={{ color: 'red' }}>{error1}</p>} */}
          <Button
            variant="contained"
            component={RouterLink}
            to={`/question/add`}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Question
          </Button>
        </Stack>
        {error1 ? <Message type="error">{error1}</Message> : null}

        <Card sx={style}>
          <UserListToolbar />
          {loading ? (
            <Loader />
          ) : error ? (
            <Message type="error">{error}</Message>
          ) : (
            <>
              {/* Table For Showing All Questions */}
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Sr.No</TableCell>
                    <TableCell align="center">Header</TableCell>
                    <TableCell align="center">Standard</TableCell>
                    <TableCell align="center">subHeader1</TableCell>
                    <TableCell align="center">subHeader2</TableCell>
                    <TableCell align="center">subHeader3</TableCell>
                    <TableCell align="center">subHeader4</TableCell>
                    <TableCell align="center">subHeader5</TableCell>

                    <TableCell align="center">Edit</TableCell>
                    <TableCell align="center">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {questions.map((question, index) => (
                    <TableRow key={question._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="center">{question.header}</TableCell>
                      <TableCell align="center">{question.standard}</TableCell>
                      <TableCell align="center">{question.subHeader1}</TableCell>
                      <TableCell align="center">{question.subHeader2}</TableCell>
                      <TableCell align="center">{question.subHeader3}</TableCell>
                      <TableCell align="center">{question.subHeader4}</TableCell>
                      <TableCell align="center">{question.subHeader5}</TableCell>
                      <TableCell align="center">
                        <IconButton variant="outlined" component={RouterLink} to={`/question/${question._id}/edit`}>
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
                          onClick={() => deleteHandler(question._id)}
                        >
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>
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
            count={questions.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
}

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { Document, Page, Text, Image, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Divider,
  Autocomplete,
  Icon,
} from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import OpenWithRoundedIcon from '@mui/icons-material/OpenWithRounded';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import Switch from '@mui/material/Switch';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import Paper from '@mui/material/Paper';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Iconify from '../components/iconify';
import {
  getProjectDetails,
  listMyProjects,
  updateProjectQuestions,
  updateProjectV3Questions,
  updateProjectV2Questions,
  addProjectVersion2,
  addProjectVersion3,
} from '../actions/projectActions';

// Create styles
const styles = StyleSheet.create({
  page: { margin: 10, padding: 10 },
  section: {
    marginTop: 250,
    // margin: 10,
    // padding: 10,
    display: 'flex',
    justifyContent: 'center',
    width: 200,
  },
  section1: {
    // margin: 10,
    // padding: 10,
    marginTop: 20,
    width: 650,
    fontWeight: 'ultrabold',
    fontSize: 25,
    color: 'blue',
  },
  viewer: {
    width: window.innerWidth, // the pdf viewer will take up all of the width and height
    height: window.innerHeight,
  },
  table1: {
    display: 'flex',
    flexDirection: 'row',
  },
});

const styles2 = StyleSheet.create({
  table: {
    width: '80%',
    borderCollapse: 'collapse',
    margin: 'auto',
  },
  containor: {
    marginLeft: 50,
  },
  containor2: {
    // marginLeft: 80,
    // padding: -3,
    margin: 3,
    padding: 0,
    marginLeft: 80,
  },
});

const style3 = StyleSheet.create({
  data: {},
});
const styles1 = StyleSheet.create({
  //   row: {
  //     display: 'flex',
  //     flexDirection: 'row',
  //     border: '1px solid #dddddd',
  //     borderRight: '1px solid #dddddd',
  //     padding: 12,
  //     paddingBottom: 8,
  //     fontSize: 13,
  //   },
  //   header: {
  //     borderTop: 'none',
  //   },
  //   bold: {
  //     fontWeight: 'bold',
  //   },

  //   //   row1: {
  //   //     padding: 8,
  //   //     borderColor: 'rgb(58, 62, 65)',
  //   //     // borderRight: '1px solid #dddddd',
  //   //   },
  //   //   row2: {
  //   //     backgroundColor: '#dddddd',
  //   //     padding: 8,
  //   //   },
  //   row1: {
  //     width: '10%',
  //   },

  //   row2: {
  //     width: '15%',
  //   },
  //   //   row3: {
  //   //     width: '15%',
  //   //   },
  //   //   row4: {
  //   //     width: '20%',
  //   //   },
  //   row5: {
  //     width: '27%',
  //   },
  table: {
    paddingTop: 8,
    width: '100%',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    borderTop: '1px solid #EEE',
    // paddingTop: 4,
    // paddingBottom: 4,
  },
  header: {
    borderTop: 'none',
  },
  bold: {
    fontWeight: 'bold',
  },
  // So Declarative and unDRY 👌
  row1: {
    width: '50%',
    backgroundColor: '#ffffff',
    padding: 8,
    fontSize: 11,
    fontWeight: 700,
  },
  row2: {
    width: '50%',
    backgroundColor: '#dddddd',
    padding: 8,
    fontSize: 11,
  },
});

const PdfCreate = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: projectId } = useParams();

  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const version = searchParams.get('version');

  // console.log(typeof version);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const projectDetails = useSelector((state) => state.projectDetails);
  const { loading, error, project } = projectDetails;

  useEffect(() => {
    if (userInfo) {
      dispatch(getProjectDetails(projectId));
    } else {
      navigate('/404');
    }
  }, [dispatch, userInfo, projectId, navigate]);

  const data1 = JSON.parse(localStorage.getItem('project'));
  // console.log(data1);
  const unique2 = [];
  const unique = [];
  if (version === 'version1') {
    const data2 = data1.version1;

    data2.map((ele) => unique2.push(ele.header));

    unique2.forEach((element) => {
      if (!unique.includes(element)) {
        unique.push(element);
      }
    });
  } else if (version === 'version2') {
    const data2 = data1.version2;
    data2.map((ele) => unique2.push(ele.header));

    unique2.forEach((element) => {
      if (!unique.includes(element)) {
        unique.push(element);
      }
    });
  } else if (version === 'version3') {
    const data2 = data1.version3;
    data2.map((ele) => unique2.push(ele.header));

    unique2.forEach((element) => {
      if (!unique.includes(element)) {
        unique.push(element);
      }
    });
  } else navigate('/404');

  // console.log(unique);
  const th = {
    border: '1px solid #dddddd',
    textAlign: 'left',
    padding: 4,
  };

  const even = {
    border: ' 1px solid #dddddd',
    textAlign: 'left',
    padding: 4,
    backgroundColor: '#dddddd',
  };
  // const value = [];
  // for (let i = 0; i < unique.length; i += 1) {
  //   const element = unique[i];
  //   console.log(element);
  //   value.push(element);
  // }
  // data1.version1.forEach((element) => {

  // });
  // console.log(data1.version1);
  const index = 0;
  const header = null;
  const data = data1.version1;
  const que = data.questions;
  const headers = [];
  const mainHeader = [];

  data.map((ele) => headers.push(ele.header));

  headers.forEach((element) => {
    if (!mainHeader.includes(element)) {
      mainHeader.push(element);
    }
  });

  for (let i = 0; i < data.length; i += 1) {
    for (let j = 0; j < i; j += 1) {
      if (data[j].header !== null && data[j].subHeader1 === null) {
        console.log(data);
      }
      // console.log(data[j]);
    }
  }
  return (
    <>
      <Helmet>
        <title> PDF | Audix UI </title>
      </Helmet>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <>
          <div style={{ margin: 30, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <br />
            <br />
            <br />
            <br /> <br />
            <br />
            <img src="../assets/audix.jpg" alt="../assets/audix.jpg" style={{ marginBottom: 20, marginTop: 10 }} />
            <Typography style={{ color: 'blue', fontWeight: 'bold', fontSize: 25 }}>
              Information System Audit FY 2022-23
            </Typography>
            <img src="../assets/bank.png" alt="../assets/bank.png" style={{ marginBottom: 25, marginTop: 30 }} />{' '}
            <Typography style={{ marginBottom: 30, marginTop: 25, color: 'black', fontWeight: 'bold', fontSize: 16 }}>
              November 9th, 2022{' '}
            </Typography>
            <Typography style={{ marginBottom: 10, marginTop: 25, fontSize: 12 }}>CONFIDENTIAL DOCUMENT:</Typography>
            <Typography style={{ marginBottom: 10, fontSize: 10 }}>
              Not to be circulated or reproduced without appropriate authorization
            </Typography>
            <Typography style={{ marginBottom: 10, marginTop: 25, fontSize: 12 }}>DISCLAIMER:</Typography>
            <Typography style={{ marginBottom: 10, fontSize: 10 }}>
              Only Audix logo is our property, and all other logos are property of individual owners
            </Typography>
            <br />
            <br />
            <br />
            <br /> <br />
            <br />
            <br />
            <br /> <br />
            <br />
            <br /> <br />
            <br />
          </div>
          <Typography variant="h5" style={{ fontSize: 25, fontWeight: 'bold', marginLeft: 50 }}>
            Document Information
          </Typography>

          <div>
            <table style={styles2.table}>
              <thead>
                <tr>
                  <th style={th}>Document Title</th>
                  <th style={th}>Information System Audit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={even}>Document Title </td>
                  <td style={even}>Audit</td>
                </tr>
                <tr>
                  <td style={th}>Name of Organization </td>
                  <td style={th}>{data1.projectName}</td>
                </tr>
                <tr>
                  <td style={even}>classNameification </td>
                  <td style={even}>Confidential</td>
                </tr>
                <tr>
                  <td style={th}>Document Type </td>
                  <td style={th}>Report</td>
                </tr>
                <tr>
                  <td style={even}>Version </td>
                  <td>V1.0</td>
                </tr>
                <tr>
                  <td style={th}>Auditor </td>
                  {data1.users.map((user) => (
                    <td style={th} key={user._id}>
                      {user.fname}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td style={even}>Reviewer </td>
                  {/* <td></td> */}
                </tr>
                <tr>
                  <td style={th}>Audit Period </td>
                  {/* <td></td> */}
                </tr>
              </tbody>
            </table>
          </div>
          <br />

          <Typography variant="h5" style={{ fontSize: 25, fontWeight: 'bold', marginLeft: 50 }}>
            Document Stakeholder
          </Typography>
          <TableContainer sx={{ width: '90%', margin: 3, marginTop: -4, padding: 4 }}>
            <Table sx={{ border: '1px solid #dddddd' }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>Name</TableCell>
                  <TableCell style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }} align="center">
                    Designation
                  </TableCell>
                  <TableCell style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }} align="center">
                    Organization Name
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableCell component="th" scope="row">
                  gujfuj
                </TableCell>
                {/* {rows.map((row) => (
    <TableRow
      key={row.name}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {row.name}
      </TableCell>
      <TableCell align="right">{row.calories}</TableCell>
      <TableCell align="right">{row.fat}</TableCell>
      <TableCell align="right">{row.carbs}</TableCell>
      <TableCell align="right">{row.protein}</TableCell>
    </TableRow>
  ))} */}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h5" style={{ fontSize: 25, fontWeight: 'bold', marginLeft: 50, marginTop: -5 }}>
            Recipient
          </Typography>
          <TableContainer sx={{ width: '90%', margin: 3, marginTop: -4, padding: 4 }}>
            <Table sx={{ border: '1px solid #dddddd' }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>Name</TableCell>
                  <TableCell style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }} align="center">
                    Designation
                  </TableCell>
                  <TableCell style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }} align="center">
                    Organization Name
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableCell component="th" scope="row">
                  gujfuj
                </TableCell>
                {/* {rows.map((row) => (
    <TableRow
      key={row.name}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {row.name}
      </TableCell>
      <TableCell align="right">{row.calories}</TableCell>
      <TableCell align="right">{row.fat}</TableCell>
      <TableCell align="right">{row.carbs}</TableCell>
      <TableCell align="right">{row.protein}</TableCell>
    </TableRow>
  ))} */}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h5" style={{ fontSize: 25, fontWeight: 'bold', marginLeft: 50, marginTop: -5 }}>
            Contact Details
          </Typography>
          <TableContainer sx={{ width: '90%', margin: 3, marginTop: -4, padding: 4 }}>
            <Table sx={{ border: '1px solid #dddddd' }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>Name</TableCell>
                  <TableCell style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }} align="center">
                    Email Id
                  </TableCell>
                  <TableCell style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }} align="center">
                    Organization Name
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableCell component="th" scope="row">
                  gujfuj
                </TableCell>
                <TableCell component="th" scope="row">
                  {data1.projectName}
                </TableCell>
                {/* {rows.map((row) => (
    <TableRow
      key={row.name}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {row.name}
      </TableCell>
      <TableCell align="right">{row.calories}</TableCell>
      <TableCell align="right">{row.fat}</TableCell>
      <TableCell align="right">{row.carbs}</TableCell>
      <TableCell align="right">{row.protein}</TableCell>
    </TableRow>
  ))} */}
              </TableBody>
            </Table>
          </TableContainer>

          <div style={styles2.containor}>
            <h3 className="mb-4" style={{ fontWeight: ' bold', color: 'blue' }}>
              Table of Contents
            </h3>

            <h4>
              <span className="title">Objective</span>{' '}
              <span className="page">
                <span className="visually-hidden">Page&nbsp;</span>2
              </span>
            </h4>

            <p>
              <span className="title">Scope</span>{' '}
              <span className="page">
                <span className="visually-hidden">Page&nbsp;</span>4
              </span>
            </p>

            <p>
              <span className="title">Executive Summary</span>{' '}
              <span className="page">
                <span className="visually-hidden">Page&nbsp;</span>15
              </span>
            </p>

            <p>
              <span className="title">Detailed Report</span>{' '}
              <span className="page">
                <span className="visually-hidden">Page&nbsp;</span>15
              </span>
            </p>

            {unique
              ? unique.map((que, index) => (
                  <h5 key={index} style={{ marginLeft: 20 }}>
                    {index + 1}. {que}
                  </h5>
                ))
              : null}
          </div>
          <Typography variant="h5" style={{ fontSize: 25, fontWeight: 'bold', marginLeft: 50 }}>
            Objective
          </Typography>
          <Typography sx={{ width: '90%', margin: 3, marginTop: -4, padding: 4 }}>
            The objective of the assignment was to perform an Information System Audit of the systems and processes and
            to highlight any gaps as per the guidelines issued by the regulator to align and improvise the overall
            information security posture of the infrastructure at Shree Sharada Sahakari Bank Ltd, Pune. This involved a
            review of specific information and IT security areas and controls deployed within the infrastructure of the
            organization and whether they comply with the guidelines as issued by Reserve Bank of India (RBI).
            <br /> <br />
            With reference to RBI para 6 of the master Circular No. DCBR.CO.BPD. (PCB). MC. No. 3/12.05.001/2015-16
            dated July 01, 2015, on Information System (IS) Audit for Urban Cooperative Banks. UCBs may also adopt
            appropriate systems and practices for conducting IS Audit on annual basis covering all the critically
            important branches (in terms of nature and volume of business).
          </Typography>
          <Typography variant="h5" style={{ fontSize: 25, fontWeight: 'bold', marginLeft: 50 }}>
            Scope
          </Typography>

          {unique
            ? unique.map((que, index) => (
                <h6 key={que._id} style={styles2.containor2}>
                  {index + 1}. {que}
                </h6>
              ))
            : null}
        </>
      )}

      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 5 }}>
        Detailed Report
      </Typography>
      {}
      <div>
        {/* <h4>{data[i].header}</h4>; */}
        <table style={styles2.table}>
          <thead>
            <tr>
              <th style={th}>Sr. No.</th>
              <th style={th}>Control Area of Audit</th>
              <th style={th}>Results & Observations</th>
              <th style={th}>Auditor’s Rating</th>
              <th style={th}>Recommendation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {/* <td style={even}>{i}</td>
              <td>{data[i].questions.areaofaudit}</td> */}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PdfCreate;

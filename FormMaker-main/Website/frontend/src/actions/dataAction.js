import { DepartureBoard } from '@mui/icons-material';
import axios from 'axios';
import {
  ROLE_LIST_FAIL,
  ROLE_LIST_REQUEST,
  ROLE_LIST_SUCCESS,
  ROLE_LIST_RESET,
  DEPARTMENT_LIST_FAIL,
  DEPARTMENT_LIST_REQUEST,
  DEPARTMENT_LIST_SUCCESS,
  DEPARTMENT_LIST_RESET,
  DEPARTMENT_ADD_REQUEST,
  DEPARTMENT_ADD_SUCCESS,
  DEPARTMENT_ADD_FAIL,
  ROLE_ADD_FAIL,
  ROLE_ADD_REQUEST,
  ROLE_ADD_SUCCESS,
  DEPARTMENT_DELETE_FAIL,
  DEPARTMENT_DELETE_REQUEST,
  DEPARTMENT_DELETE_SUCCESS,
  ROLE_DELETE_FAIL,
  ROLE_DELETE_SUCCESS,
  ROLE_DELETE_REQUEST,
  DEPARTMENT_DETAILS_SUCCESS,
  ROLE_DETAILS_FAIL,
  DEPARTMENT_DETAILS_FAIL,
  DEPARTMENT_DETAILS_REQUEST,
  ROLE_DETAILS_REQUEST,
  ROLE_DETAILS_SUCCESS,
  DEPARTMENT_UPDATE_REQUEST,
  DEPARTMENT_UPDATE_SUCCESS,
  DEPARTMENT_UPDATE_RESET,
  DEPARTMENT_UPDATE_FAIL,
  ROLE_UPDATE_REQUEST,
  ROLE_UPDATE_SUCCESS,
  ROLE_UPDATE_FAIL,
  ROLE_UPDATE_RESET,
  STANDARD_UPDATE_REQUEST,
  STANDARD_UPDATE_SUCCESS,
  STANDARD_UPDATE_FAIL,
  STANDARD_UPDATE_RESET,
  STANDARD_LIST_REQUEST,
  STANDARD_LIST_SUCCESS,
  STANDARD_LIST_FAIL,
  STANDARD_LIST_RESET,
  STANDARD_ADD_REQUEST,
  STANDARD_ADD_SUCCESS,
  STANDARD_ADD_FAIL,
  STANDARD_DELETE_REQUEST,
  STANDARD_DELETE_SUCCESS,
  STANDARD_DELETE_FAIL,
  STANDARD_DETAILS_SUCCESS,
  STANDARD_DETAILS_FAIL,
  STANDARD_DETAILS_REQUEST,
  STANDARD_DETAILS_RESET,
} from '../constants/dataConstants';

export const listRoleData = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ROLE_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/data/role`, config);

    dispatch({ type: ROLE_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: ROLE_LIST_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

export const listDepartmentData = () => async (dispatch, getState) => {
  try {
    dispatch({ type: DEPARTMENT_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/data/department`, config);

    dispatch({ type: DEPARTMENT_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: DEPARTMENT_LIST_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

export const addDepartment = (departments) => async (dispatch, getState) => {
  try {
    dispatch({ type: DEPARTMENT_ADD_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post('/api/data/department', { departments }, config);
    dispatch({ type: DEPARTMENT_ADD_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: DEPARTMENT_ADD_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

export const addRole = (roles) => async (dispatch, getState) => {
  try {
    dispatch({ type: ROLE_ADD_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post('/api/data/role', { roles }, config);
    dispatch({ type: ROLE_ADD_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: ROLE_ADD_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

export const deleteRole = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ROLE_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/data/role/${id}`, config);

    dispatch({ type: ROLE_DELETE_SUCCESS });
  } catch (err) {
    dispatch({
      type: ROLE_DELETE_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

export const deleteDepartment = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DEPARTMENT_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/data/department/${id}`, config);

    dispatch({ type: DEPARTMENT_DELETE_SUCCESS });
  } catch (err) {
    dispatch({
      type: DEPARTMENT_DELETE_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

export const editUserRole = (role) => async (dispatch, getState) => {
  try {
    dispatch({ type: ROLE_UPDATE_REQUEST });

    // const {
    //   userLogin: { userInfo },
    // } = getState();

    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${userInfo.token}`,
    //     'Content-Type': 'application/json',
    //   },
    // };

    const { data } = await axios.put(
      `/api/data/role/${role._id}`,
      role
      // , config
    );

    dispatch({ type: ROLE_UPDATE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: ROLE_UPDATE_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

export const editUserDepartment = (department) => async (dispatch, getState) => {
  try {
    dispatch({ type: DEPARTMENT_UPDATE_REQUEST });

    // const {
    //   userLogin: { userInfo },
    // } = getState();

    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${userInfo.token}`,
    //     'Content-Type': 'application/json',
    //   },
    // };

    const { data } = await axios.put(
      `/api/data/department/${department._id}`,
      department
      // , config
    );

    dispatch({ type: DEPARTMENT_UPDATE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: DEPARTMENT_UPDATE_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

export const getUserRoleDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ROLE_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/data/role/${id}`, config);

    dispatch({ type: ROLE_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: ROLE_DETAILS_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

export const getUserDepartmentDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DEPARTMENT_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/data/department/${id}`, config);

    dispatch({ type: DEPARTMENT_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: DEPARTMENT_DETAILS_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

// editStandard,deleteStandard,addStandard,standardListData,getStandardDetails
export const standardListData = () => async (dispatch, getState) => {
  try {
    dispatch({ type: STANDARD_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/data/standard`, config);

    dispatch({ type: STANDARD_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: STANDARD_LIST_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

export const addStandard = (standards) => async (dispatch, getState) => {
  try {
    dispatch({ type: STANDARD_ADD_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post('/api/data/standard', { standards }, config);
    dispatch({ type: STANDARD_ADD_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: STANDARD_ADD_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

export const deleteStandard = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: STANDARD_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/data/standard/${id}`, config);

    dispatch({ type: STANDARD_DELETE_SUCCESS });
  } catch (err) {
    dispatch({
      type: STANDARD_DELETE_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

export const editStandard = (standard) => async (dispatch, getState) => {
  try {
    dispatch({ type: STANDARD_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(`/api/data/standard/${standard._id}`, standard, config);

    dispatch({ type: STANDARD_UPDATE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: STANDARD_UPDATE_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

export const getStandardDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: STANDARD_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/data/standard/${id}`, config);

    dispatch({ type: STANDARD_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: STANDARD_DETAILS_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

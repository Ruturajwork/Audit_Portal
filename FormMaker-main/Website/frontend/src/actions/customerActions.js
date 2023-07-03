import axios from 'axios';

import {
  CUSTOMER_REGISTER_FAIL,
  CUSTOMER_REGISTER_SUCCESS,
  CUSTOMER_REGISTER_REQUEST,
  CUSTOMER_LOGIN_REQUEST,
  CUSTOMER_LOGIN_SUCCESS,
  CUSTOMER_LOGIN_FAIL,
  CUSTOMER_LIST_REQUEST,
  CUSTOMER_LIST_SUCCESS,
  CUSTOMER_LIST_FAIL,
  CUSTOMER_DELETE_SUCCESS,
  CUSTOMER_DELETE_REQUEST,
  CUSTOMER_DELETE_FAIL,
  CUSTOMER_UPDATE_REQUEST,
  CUSTOMER_UPDATE_SUCCESS,
  CUSTOMER_UPDATE_FAIL,
  CUSTOMER_DETAILS_REQUEST,
  CUSTOMER_DETAILS_SUCCESS,
  CUSTOMER_DETAILS_FAIL,
  CUSTOMER_DETAILS_RESET,
  CUSTOMER_LOGIN_RESET,
  CUSTOMER_UPDATE_RESET,
  CUSTOMER_LOGOUT,
  CUSTOMER_UPDATE_PROFILE_REQUEST,
  CUSTOMER_UPDATE_PROFILE_FAIL,
  CUSTOMER_UPDATE_PROFILE_SUCCESS,
  CUSTOMER_UPDATE_PROFILE_RESET,
  CUSTOMER_PROFILE_REQUEST,
  CUSTOMER_PROFILE_SUCCESS,
  CUSTOMER_PROFILE_FAIL,
} from '../constants/customerConstants';
import { PROJECT_MY_LIST_RESET, PROJECT_DETAILS_RESET } from '../constants/projectConstants';

export const customerRegisters =
  (fname, lname, email, contact, password, department, isActive, project) => async (dispatch, getState) => {
    try {
      dispatch({ type: CUSTOMER_REGISTER_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        '/api/customers',
        { fname, lname, email, contact, password, department, isActive, project },
        config
      );
      dispatch({ type: CUSTOMER_REGISTER_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: CUSTOMER_REGISTER_FAIL,
        payload: err.response && err.response.data.message ? err.response.data.message : err.message,
      });
    }
  };

export const customerlogin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: CUSTOMER_LOGIN_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post('/api/customers/clogin', { email, password }, config);

    dispatch({ type: CUSTOMER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem('customerInfo', JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: CUSTOMER_LOGIN_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

export const customerLogout = () => async (dispatch) => {
  localStorage.removeItem('customerInfo');
  localStorage.removeItem('project');
  dispatch({ type: CUSTOMER_LOGOUT });
  dispatch({ type: CUSTOMER_LOGIN_REQUEST });
  dispatch({ type: PROJECT_MY_LIST_RESET });
  dispatch({ type: PROJECT_DETAILS_RESET });
  dispatch({ type: CUSTOMER_UPDATE_PROFILE_RESET });
};

export const listCustomers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CUSTOMER_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/customers`, config);

    dispatch({ type: CUSTOMER_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: CUSTOMER_LIST_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

export const deleteCustomer = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CUSTOMER_DELETE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/customers/${id}`, config);
    dispatch({ type: CUSTOMER_DELETE_SUCCESS });
  } catch (err) {
    dispatch({
      type: CUSTOMER_DELETE_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

export const updateCustomer = (customer) => async (dispatch, getState) => {
  try {
    dispatch({ type: CUSTOMER_UPDATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.put(`/api/customers/${customer._id}`, customer, config);

    dispatch({ type: CUSTOMER_UPDATE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: CUSTOMER_UPDATE_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

// *This Action for Showing A data of customer details in project Screen of users*/

export const getCustomerDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CUSTOMER_DETAILS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/customers/${id}`, config);
    dispatch({ type: CUSTOMER_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: CUSTOMER_DETAILS_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

// *This Action for Showing A data of customer details in customer Profile Screen of customers*/
export const getCustomerProfileDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CUSTOMER_PROFILE_REQUEST });
    const {
      customerLogin: { customerInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${customerInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/customers/pr/${id}`, config);
    dispatch({ type: CUSTOMER_PROFILE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: CUSTOMER_PROFILE_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

export const updateCustomerProfile = (customer) => async (dispatch, getState) => {
  try {
    dispatch({ type: CUSTOMER_UPDATE_PROFILE_REQUEST });

    const {
      customerLogin: { customerInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${customerInfo.token}`,
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(`/api/customers/pr/profile`, customer, config);

    dispatch({ type: CUSTOMER_UPDATE_PROFILE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: CUSTOMER_UPDATE_PROFILE_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

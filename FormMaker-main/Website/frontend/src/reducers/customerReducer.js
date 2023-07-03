import {
  CUSTOMER_REGISTER_FAIL,
  CUSTOMER_REGISTER_SUCCESS,
  CUSTOMER_LOGIN_RESET,
  CUSTOMER_REGISTER_REQUEST,
  CUSTOMER_LOGIN_REQUEST,
  CUSTOMER_LOGIN_SUCCESS,
  CUSTOMER_LOGIN_FAIL,
  CUSTOMER_LIST_REQUEST,
  CUSTOMER_LIST_SUCCESS,
  CUSTOMER_LIST_FAIL,
  CUSTOMER_LIST_RESET,
  CUSTOMER_DELETE_SUCCESS,
  CUSTOMER_DELETE_REQUEST,
  CUSTOMER_DELETE_FAIL,
  CUSTOMER_UPDATE_REQUEST,
  CUSTOMER_UPDATE_SUCCESS,
  CUSTOMER_UPDATE_FAIL,
  CUSTOMER_UPDATE_RESET,
  CUSTOMER_DETAILS_REQUEST,
  CUSTOMER_DETAILS_SUCCESS,
  CUSTOMER_DETAILS_FAIL,
  CUSTOMER_DETAILS_RESET,
  CUSTOMER_LOGOUT,
  CUSTOMER_UPDATE_PROFILE_REQUEST,
  CUSTOMER_UPDATE_PROFILE_FAIL,
  CUSTOMER_UPDATE_PROFILE_SUCCESS,
  CUSTOMER_UPDATE_PROFILE_RESET,
  CUSTOMER_PROFILE_REQUEST,
  CUSTOMER_PROFILE_SUCCESS,
  CUSTOMER_PROFILE_FAIL,
  CUSTOMER_PROFILE_RESET,
} from '../constants/customerConstants';

export const customerLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOMER_LOGIN_REQUEST:
      return { loading: true };
    case CUSTOMER_LOGIN_SUCCESS:
      return { loading: false, customerInfo: action.payload };
    case CUSTOMER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case CUSTOMER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const customerRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOMER_REGISTER_REQUEST:
      return { loading: true };
    case CUSTOMER_REGISTER_SUCCESS:
      return { loading: false, customerInfo: action.payload };
    case CUSTOMER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const customerListReducer = (state = { customers: [] }, action) => {
  switch (action.type) {
    case CUSTOMER_LIST_REQUEST:
      return { loading: true, customers: [] };
    case CUSTOMER_LIST_SUCCESS:
      return { loading: false, customers: action.payload };
    case CUSTOMER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case CUSTOMER_LIST_RESET:
      return { customers: [] };
    default:
      return state;
  }
};

export const customerDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOMER_DELETE_REQUEST:
      return { loading: true };
    case CUSTOMER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case CUSTOMER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const customerUpdateReducer = (state = { customer: {} }, action) => {
  switch (action.type) {
    case CUSTOMER_UPDATE_REQUEST:
      return { loading: true };
    case CUSTOMER_UPDATE_SUCCESS:
      return { loading: false, customer: action.payload, success: true };
    case CUSTOMER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case CUSTOMER_UPDATE_RESET:
      return { customers: {} };
    default:
      return state;
  }
};

export const customerDetailsReducer = (state = { customer: {} }, action) => {
  switch (action.type) {
    case CUSTOMER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case CUSTOMER_DETAILS_SUCCESS:
      return { loading: false, customer: action.payload };
    case CUSTOMER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case CUSTOMER_DETAILS_RESET:
      return { customer: {} };
    default:
      return state;
  }
};

export const customerProfileReducer = (state = { customer: {} }, action) => {
  switch (action.type) {
    case CUSTOMER_PROFILE_REQUEST:
      return { ...state, loading: true };
    case CUSTOMER_PROFILE_SUCCESS:
      return { loading: false, customer: action.payload };
    case CUSTOMER_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case CUSTOMER_PROFILE_RESET:
      return { customer: {} };
    default:
      return state;
  }
};
export const customerUpdateProfileReducer = (state = { customer: {} }, action) => {
  switch (action.type) {
    case CUSTOMER_UPDATE_PROFILE_REQUEST:
      return { ...state, loading: true };
    case CUSTOMER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, customer: action.payload, success: true };
    case CUSTOMER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case CUSTOMER_UPDATE_PROFILE_RESET:
      return { customer: {} };
    default:
      return state;
  }
};

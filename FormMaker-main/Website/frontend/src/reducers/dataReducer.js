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
  DEPARTMENT_UPDATE_REQUEST,
  DEPARTMENT_UPDATE_SUCCESS,
  DEPARTMENT_UPDATE_RESET,
  DEPARTMENT_UPDATE_FAIL,
  ROLE_UPDATE_REQUEST,
  ROLE_UPDATE_SUCCESS,
  ROLE_UPDATE_FAIL,
  ROLE_UPDATE_RESET,
  DEPARTMENT_DETAILS_SUCCESS,
  ROLE_DETAILS_FAIL,
  DEPARTMENT_DETAILS_FAIL,
  DEPARTMENT_DETAILS_REQUEST,
  ROLE_DETAILS_REQUEST,
  ROLE_DETAILS_SUCCESS,
  DEPARTMENT_DETAILS_RESET,
  ROLE_DETAILS_RESET,
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

export const dataRoleReducer = (state = { roles: [] }, action) => {
  switch (action.type) {
    case ROLE_LIST_REQUEST:
      return { loading: true, roles: [] };
    case ROLE_LIST_SUCCESS:
      return { loading: false, roles: action.payload };
    case ROLE_LIST_FAIL:
      return { loading: false, error: action.payload };
    case ROLE_LIST_RESET:
      return { roles: [] };
    default:
      return state;
  }
};

export const dataDepartmentReducer = (state = { departments: [] }, action) => {
  switch (action.type) {
    case DEPARTMENT_LIST_REQUEST:
      return { loading: true, departments: [] };
    case DEPARTMENT_LIST_SUCCESS:
      return { loading: false, departments: action.payload };
    case DEPARTMENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    case DEPARTMENT_LIST_RESET:
      return { departments: [] };
    default:
      return state;
  }
};

// Requests For Adding new user Department
export const userDepartmentReducer = (state = {}, action) => {
  switch (action.type) {
    case DEPARTMENT_ADD_REQUEST:
      return { loading: true };
    case DEPARTMENT_ADD_SUCCESS:
      return { loading: false, departmentInfo: action.payload };
    case DEPARTMENT_ADD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Requests For Adding new user Role
export const userRoleReducer = (state = {}, action) => {
  switch (action.type) {
    case ROLE_ADD_REQUEST:
      return { loading: true };
    case ROLE_ADD_SUCCESS:
      return { loading: false, roleInfo: action.payload };
    case ROLE_ADD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const departmentDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DEPARTMENT_DELETE_REQUEST:
      return { loading: true };
    case DEPARTMENT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case DEPARTMENT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const roleDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ROLE_DELETE_REQUEST:
      return { loading: true };
    case ROLE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case ROLE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const roleUpdateReducer = (state = { role: {} }, action) => {
  switch (action.type) {
    case ROLE_UPDATE_REQUEST:
      return { loading: true };
    case ROLE_UPDATE_SUCCESS:
      return { loading: false, role: action.payload, success: true };
    case ROLE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case ROLE_UPDATE_RESET:
      return { roles: {} };
    default:
      return state;
  }
};

export const departmentUpdateReducer = (state = { department: {} }, action) => {
  switch (action.type) {
    case DEPARTMENT_UPDATE_REQUEST:
      return { loading: true };
    case DEPARTMENT_UPDATE_SUCCESS:
      return { loading: false, department: action.payload, success: true };
    case DEPARTMENT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case DEPARTMENT_UPDATE_RESET:
      return { departments: {} };
    default:
      return state;
  }
};

export const userRoleDetailsReducer = (state = { role: {} }, action) => {
  switch (action.type) {
    case ROLE_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ROLE_DETAILS_SUCCESS:
      return { loading: false, role: action.payload };
    case ROLE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case ROLE_DETAILS_RESET:
      return { roles: {} };
    default:
      return state;
  }
};

export const userDepartmentDetailsReducer = (state = { department: {} }, action) => {
  switch (action.type) {
    case DEPARTMENT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case DEPARTMENT_DETAILS_SUCCESS:
      return { loading: false, department: action.payload };
    case DEPARTMENT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case DEPARTMENT_DETAILS_RESET:
      return { departments: {} };
    default:
      return state;
  }
};

export const listStandardReducer = (state = { standards: [] }, action) => {
  switch (action.type) {
    case STANDARD_LIST_REQUEST:
      return { loading: true, standards: [] };
    case STANDARD_LIST_SUCCESS:
      return { loading: false, standards: action.payload };
    case STANDARD_LIST_FAIL:
      return { loading: false, error: action.payload };
    case STANDARD_LIST_RESET:
      return { standards: [] };
    default:
      return state;
  }
};

export const standardUpdateReducer = (state = { standard: {} }, action) => {
  switch (action.type) {
    case STANDARD_UPDATE_REQUEST:
      return { loading: true };
    case STANDARD_UPDATE_SUCCESS:
      return { loading: false, standard: action.payload, success: true };
    case STANDARD_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case STANDARD_UPDATE_RESET:
      return { standards: {} };
    default:
      return state;
  }
};

export const standardAddReducer = (state = {}, action) => {
  switch (action.type) {
    case STANDARD_ADD_REQUEST:
      return { loading: true };
    case STANDARD_ADD_SUCCESS:
      return { loading: false, standardInfo: action.payload };
    case STANDARD_ADD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const standardDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case STANDARD_DELETE_REQUEST:
      return { loading: true };
    case STANDARD_DELETE_SUCCESS:
      return { loading: false, success: true };
    case STANDARD_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const standardDetailsReducer = (state = { standard: {} }, action) => {
  switch (action.type) {
    case STANDARD_DETAILS_REQUEST:
      return { ...state, loading: true };
    case STANDARD_DETAILS_SUCCESS:
      return { loading: false, standard: action.payload };
    case STANDARD_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case STANDARD_DETAILS_RESET:
      return { standards: {} };
    default:
      return state;
  }
};

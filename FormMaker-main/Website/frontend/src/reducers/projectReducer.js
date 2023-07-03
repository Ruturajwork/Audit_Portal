import {
  PROJECT_ADD_FAIL,
  PROJECT_ADD_REQUEST,
  PROJECT_ADD_SUCCESS,
  PROJECT_DELETE_REQUEST,
  PROJECT_DELETE_SUCCESS,
  PROJECT_DELETE_FAIL,
  PROJECT_LIST_REQUEST,
  PROJECT_LIST_SUCCESS,
  PROJECT_LIST_FAIL,
  PROJECT_LIST_RESET,
  PROJECT_UPDATE_REQUEST,
  PROJECT_UPDATE_SUCCESS,
  PROJECT_UPDATE_FAIL,
  PROJECT_UPDATE_RESET,
  PROJECT_DETAILS_REQUEST,
  PROJECT_DETAILS_SUCCESS,
  PROJECT_DETAILS_RESET,
  PROJECT_DETAILS_FAIL,
  PROJECT_MY_LIST_REQUEST,
  PROJECT_MY_LIST_SUCCESS,
  PROJECT_MY_LIST_FAIL,
  PROJECT_MY_LIST_RESET,
  PROJECT_DETAIL_QUESTION_REQUEST,
  PROJECT_DETAIL_QUESTION_SUCCESS,
  PROJECT_DETAIL_QUESTION_RESET,
  PROJECT_DETAIL_QUESTION_FAIL,
  PROJECT_UPDATE_QUESTION_REQUEST,
  PROJECT_UPDATE_QUESTION_SUCCESS,
  PROJECT_UPDATE_QUESTION_FAIL,
  PROJECT_UPDATE_QUESTION_RESET,
  PROJECT_ADD_VERSION2_REQUEST,
  PROJECT_ADD_VERSION2_SUCCESS,
  PROJECT_ADD_VERSION2_FAIL,
  PROJECT_ADD_VERSION2_RESET,
  PROJECT_ADD_VERSION3_REQUEST,
  PROJECT_ADD_VERSION3_SUCCESS,
  PROJECT_ADD_VERSION3_FAIL,
} from '../constants/projectConstants';

// Requests For Register the user
export const projectCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PROJECT_ADD_REQUEST:
      return { loading: true };
    case PROJECT_ADD_SUCCESS:
      return { loading: false, projectInfo: action.payload };
    case PROJECT_ADD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Requests For getting all Projects data
export const projectListReducer = (state = { projects: [] }, action) => {
  switch (action.type) {
    case PROJECT_LIST_REQUEST:
      return { loading: true, projects: [] };
    case PROJECT_LIST_SUCCESS:
      return { loading: false, projects: action.payload };
    case PROJECT_LIST_FAIL:
      return { loading: false, error: action.payload };
    case PROJECT_LIST_RESET:
      return { projects: [] };
    default:
      return state;
  }
};
export const projectDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PROJECT_DELETE_REQUEST:
      return { loading: true };
    case PROJECT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PROJECT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const projectUpdateReducer = (state = { project: {} }, action) => {
  switch (action.type) {
    case PROJECT_UPDATE_REQUEST:
      return { loading: true };
    case PROJECT_UPDATE_SUCCESS:
      return { loading: false, project: action.payload, success: true };
    case PROJECT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PROJECT_UPDATE_RESET:
      return { projects: {} };
    default:
      return state;
  }
};

export const projectDetailsReducer = (state = { project: { version1: [], version2: [], version3: [] } }, action) => {
  switch (action.type) {
    case PROJECT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case PROJECT_DETAILS_SUCCESS:
      return { loading: false, project: action.payload };
    case PROJECT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case PROJECT_DETAILS_RESET:
      return { project: {} };
    default:
      return state;
  }
};

export const projectMyListReducer = (state = { projects: [] }, action) => {
  switch (action.type) {
    case PROJECT_MY_LIST_REQUEST:
      return { loading: true, projects: [] };
    case PROJECT_MY_LIST_SUCCESS:
      return { loading: false, projects: action.payload };
    case PROJECT_MY_LIST_FAIL:
      return { loading: false, error: action.payload };
    case PROJECT_MY_LIST_RESET:
      return { projects: [] };
    default:
      return state;
  }
};

/*
There is Problem from EditProjectQuestionScreen & UsersSingleProjectScreen
The PRoblem is to Maintain A state. So i am Solving the problem by duplication of state
basically 'getProjectcDetails' action and 'getProjectDetails' action are same,
or "projectDetailssReducer" reducer, "projectUpdateQuestionReducer" and "projectDetailsReducer" are also same
pleace check the both actions & reducers are requesting the same URL of backend
*/
export const projectDetailssReducer = (state = { projectData: { version1: [{ questions: {} }] } }, action) => {
  switch (action.type) {
    case PROJECT_DETAIL_QUESTION_REQUEST:
      return { ...state, loading: true };
    case PROJECT_DETAIL_QUESTION_SUCCESS:
      return { loading: false, projectData: action.payload };
    case PROJECT_DETAIL_QUESTION_FAIL:
      return { loading: false, error: action.payload };
    case PROJECT_DETAIL_QUESTION_RESET:
      return { projectData: {} };
    default:
      return state;
  }
};
//  =  version2: [{ questions: {} }], version3: [{ questions: {} }]
export const projectUpdateQuestionReducer = (state = { project: { version1: [{ questions: {} }] } }, action) => {
  switch (action.type) {
    case PROJECT_UPDATE_QUESTION_REQUEST:
      return { loading: true };
    case PROJECT_UPDATE_QUESTION_SUCCESS:
      return { loading: false, project: action.payload, success: true };
    case PROJECT_UPDATE_QUESTION_FAIL:
      return { loading: false, error: action.payload };
    case PROJECT_UPDATE_QUESTION_RESET:
      return { projects: {} };
    default:
      return state;
  }
};

// Requests For Register the user
export const projectCreateVersionReducer = (state = {}, action) => {
  switch (action.type) {
    case PROJECT_ADD_VERSION2_REQUEST:
      return { loading: true };
    case PROJECT_ADD_VERSION2_SUCCESS:
      return { loading: false, data: action.payload, success: true };
    case PROJECT_ADD_VERSION2_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const projectCreateVersion3Reducer = (state = {}, action) => {
  switch (action.type) {
    case PROJECT_ADD_VERSION3_REQUEST:
      return { loading: true };
    case PROJECT_ADD_VERSION3_SUCCESS:
      return { loading: false, data: action.payload, success: true };
    case PROJECT_ADD_VERSION3_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

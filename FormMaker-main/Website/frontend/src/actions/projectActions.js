import axios from 'axios';
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
  PROJECT_UPDATE_QUESTION_REQUEST,
  PROJECT_UPDATE_QUESTION_SUCCESS,
  PROJECT_UPDATE_QUESTION_FAIL,
  PROJECT_UPDATE_QUESTION_RESET,
  PROJECT_DETAIL_QUESTION_REQUEST,
  PROJECT_DETAIL_QUESTION_SUCCESS,
  PROJECT_DETAIL_QUESTION_RESET,
  PROJECT_DETAIL_QUESTION_FAIL,
  PROJECT_ADD_VERSION2_REQUEST,
  PROJECT_ADD_VERSION2_SUCCESS,
  PROJECT_ADD_VERSION2_FAIL,
  PROJECT_ADD_VERSION2_RESET,
  PROJECT_ADD_VERSION3_REQUEST,
  PROJECT_ADD_VERSION3_SUCCESS,
  PROJECT_ADD_VERSION3_FAIL,
} from '../constants/projectConstants';

export const createProject =
  (startsDate, endsDate, standard, projectName, status, description, users, customers) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: PROJECT_ADD_REQUEST });
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
        '/api/projects',
        {
          startsDate,
          endsDate,
          standard,
          projectName,
          status,
          description,
          users,
          customers,
        },
        config
      );

      dispatch({ type: PROJECT_ADD_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: PROJECT_ADD_FAIL,
        payload: err.response && err.response.data.message ? err.response.data.message : err.message,
      });
    }
  };

export const listProject = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PROJECT_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/projects`, config);

    dispatch({ type: PROJECT_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: PROJECT_LIST_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

export const updateProject = (project) => async (dispatch, getState) => {
  try {
    dispatch({ type: PROJECT_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(`/api/projects/project/${project._id}`, project, config);

    dispatch({ type: PROJECT_UPDATE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: PROJECT_UPDATE_FAIL,

      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

export const getProjectDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PROJECT_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/projects/project/${id}`, config);

    dispatch({ type: PROJECT_DETAILS_SUCCESS, payload: data });
    localStorage.setItem('project', JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: PROJECT_DETAILS_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

export const getProjectCDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PROJECT_DETAILS_REQUEST });
    const {
      customerLogin: { customerInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${customerInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/projects/cproject/${id}`, config);

    dispatch({ type: PROJECT_DETAILS_SUCCESS, payload: data });
    localStorage.setItem('project', JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: PROJECT_DETAILS_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};
export const deleteProject = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PROJECT_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/projects/project/${id}`, config);
    dispatch({ type: PROJECT_DELETE_SUCCESS });
  } catch (err) {
    dispatch({
      type: PROJECT_DELETE_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

export const listMyProjects = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PROJECT_MY_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.get(`/api/projects/myprojects`, config);

    dispatch({ type: PROJECT_MY_LIST_SUCCESS, payload: data });
    localStorage.removeItem('project');
  } catch (err) {
    dispatch({
      type: PROJECT_MY_LIST_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

export const listMyCProjects = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PROJECT_MY_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const {
      customerLogin: { customerInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${customerInfo.token}`,
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.get(`/api/projects/mycprojects`, config);

    dispatch({ type: PROJECT_MY_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: PROJECT_MY_LIST_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

export const updateProjectQuestions =
  (versionState, resultAndObservation, auditorRating, recomendation, projectId, proof) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: PROJECT_UPDATE_QUESTION_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.put(
        `/api/projects/project/data/${projectId}`,
        { versionState, resultAndObservation, auditorRating, recomendation, projectId, proof },
        config
      );

      dispatch({ type: PROJECT_UPDATE_QUESTION_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: PROJECT_UPDATE_QUESTION_FAIL,
        payload: err.response && err.response.data.message ? err.response.data.message : err.message,
      });
    }
  };

export const updateProjectV2Questions =
  (versionState, resultAndObservation, auditorRating, recomendation, projectId, proof) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: PROJECT_UPDATE_QUESTION_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.put(
        `/api/projects/project/data/v2/${projectId}`,
        { versionState, resultAndObservation, auditorRating, recomendation, projectId, proof },
        config
      );

      dispatch({ type: PROJECT_UPDATE_QUESTION_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: PROJECT_UPDATE_QUESTION_FAIL,
        payload: err.response && err.response.data.message ? err.response.data.message : err.message,
      });
    }
  };

export const updateProjectV3Questions =
  (versionState, resultAndObservation, auditorRating, recomendation, projectId, proof) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: PROJECT_UPDATE_QUESTION_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.put(
        `/api/projects/project/data/v3/${projectId}`,
        { versionState, resultAndObservation, auditorRating, recomendation, projectId, proof },
        config
      );

      dispatch({ type: PROJECT_UPDATE_QUESTION_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: PROJECT_UPDATE_QUESTION_FAIL,
        payload: err.response && err.response.data.message ? err.response.data.message : err.message,
      });
    }
  };

/*
There is Problem from EditProjectQuestionScreen & UsersSingleProjectScreen
The PRoblem is to Maintain A state. So i am Solving the problem by duplication of state
basically 'getProjectcDetails' action and 'getProjectDetails' action are same
pleace check the both actions are requestiong the same URL of backend
*/
export const getProjectcDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PROJECT_DETAIL_QUESTION_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/projects/project/${id}`, config);

    dispatch({ type: PROJECT_DETAIL_QUESTION_SUCCESS, payload: data });
    //  localStorage.setItem('project', JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: PROJECT_DETAIL_QUESTION_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

export const addProjectVersion2 = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PROJECT_ADD_VERSION2_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/projects/copy/v2/${id}`);
    dispatch({ type: PROJECT_ADD_VERSION2_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: PROJECT_ADD_VERSION2_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

export const addProjectVersion3 = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PROJECT_ADD_VERSION3_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/projects/copy/v3/${id}`);
    dispatch({ type: PROJECT_ADD_VERSION3_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: PROJECT_ADD_VERSION3_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

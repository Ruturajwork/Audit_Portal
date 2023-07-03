import axios from 'axios';
import {
  QUESTION_ADD_REQUEST,
  QUESTION_ADD_SUCCESS,
  QUESTION_ADD_FAIL,
  QUESTION_DELETE_REQUEST,
  QUESTION_DELETE_SUCCESS,
  QUESTION_DELETE_FAIL,
  QUESTION_LIST_REQUEST,
  QUESTION_LIST_SUCCESS,
  QUESTION_LIST_FAIL,
  QUESTION_LIST_RESET,
  QUESTION_UPDATE_REQUEST,
  QUESTION_UPDATE_SUCCESS,
  QUESTION_UPDATE_FAIL,
  QUESTION_UPDATE_RESET,
  QUESTION_DETAILS_REQUEST,
  QUESTION_DETAILS_SUCCESS,
  QUESTION_DETAILS_FAIL,
  QUESTION_DETAILS_RESET,
} from '../constants/questionConstants';

export const registerQuestion =
  (
    header,
    standard,
    subHeader1,
    subHeader2,
    subHeader3,
    subHeader4,
    subHeader5,
    question,
    areaofaudit,
    description,
    expectedProofs
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: QUESTION_ADD_REQUEST });
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
        '/api/questions',
        {
          header,
          standard,
          subHeader1,
          subHeader2,
          subHeader3,
          subHeader4,
          subHeader5,
          question,
          areaofaudit,
          description,
          expectedProofs,
        },

        config
      );

      dispatch({ type: QUESTION_ADD_SUCCESS, payload: data });
      // dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

      // localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (err) {
      dispatch({
        type: QUESTION_ADD_FAIL,
        payload: err.response && err.response.data.message ? err.response.data.message : err.message,
      });
    }
  };

//                     Geting All Questions Data

export const listQuestions = () => async (dispatch, getState) => {
  try {
    dispatch({ type: QUESTION_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/questions`, config);

    dispatch({ type: QUESTION_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: QUESTION_LIST_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

export const deleteQuestion = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: QUESTION_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/questions/question/${id}`, config);

    dispatch({ type: QUESTION_DELETE_SUCCESS });
  } catch (err) {
    dispatch({
      type: QUESTION_DELETE_FAIL,

      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

export const updateQuestion = (question) => async (dispatch, getState) => {
  try {
    dispatch({ type: QUESTION_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(`/api/questions/question/${question._id}`, question, config);

    dispatch({ type: QUESTION_UPDATE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: QUESTION_UPDATE_FAIL,

      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

export const getQuestionDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: QUESTION_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/questions/question/${id}`, config);

    dispatch({ type: QUESTION_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: QUESTION_DETAILS_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

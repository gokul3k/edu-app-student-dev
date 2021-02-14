import * as constants from "constants/examConstants";
import api from "api/api";
import * as Auth from "services/authService";

const getUpcommingExams = (limit = 10, offset = 0) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: 'UPCOMMING_EXAMS_REQUEST' })
    const response = await api.post('/getAvailableExams', { offset, limit }, {
      headers: {
        Authorization: `Bearer ${Auth.getCredentials()}`,
        'Content-Type': 'application/json',
      }
    });
    dispatch({
      type: 'ADD_UPCOMING_EXAMS',
      payload: response.data.response,
    });
  } catch (error) {
    dispatch({ type: 'UPCOMMING_EXAMS_FAILED' })

    console.log(error.data);
  }
};
const getExamWithID = (id) => {
  return async (dispatch) => {
    dispatch({ type: constants.GET_EXAM_REQUEST });
    try {
      const { data } = await api.post(
        "/getExamDetails",
        { examId: id },
        {
          headers: {
            Authorization: `Bearer ${Auth.getCredentials()}`,
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({ type: constants.GET_EXAM_SUCCESS, payload: data.response }); //TODO
    } catch (err) {
      dispatch({
        type: constants.GET_EXAM_FAIL,
        payload: err.message,
        status: 511,
      }); //TODO
    }
  };
};

const submitExam = (history, examId) => {
  return async (dispatch, getState) => {
    dispatch({ type: constants.SUBMIT_RESPONSE_REQUEST });

    try {
      const responseVal = new getState().response;
      const { data } = await api.post(
        "/submitExam",
        { examId, responses: responseVal.responses },
        {
          headers: {
            Authorization: `Bearer ${Auth.getCredentials()}`,
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({
        type: constants.SUBMIT_RESPONSE_SUCCESS,
        payload: data.response,
      }); //TODO
      history.replace('/exam/complete/' + examId)

    } catch (error) {
      console.log(error);
      console.log(error.response);
      dispatch({ type: constants.SUBMIT_RESPONSE_FAIL, payload: { error: error } }); //TODO
    }
  };
};

const updateResponse = (data) => {
  return {
    type: constants.UPDATE_RESPONSE,
    payload: data,
  };
};

const updateStatus = () => {
  return {
    type: "UPDATE_STATUS",
  };
};

const resetExam = () => {
  return { type: constants.EXAM_RESET };
};
const startExam = (data) => {
  return { type: "START_EXAM", payload: data };
};
const resetResponse = () => {
  return { type: constants.RESET_RESPONSE };
};
const clearResponse = () => {
  return { type: "CLEAR_RESPONSE" };
};

export { getUpcommingExams, getExamWithID, submitExam, updateResponse, resetExam, clearResponse, resetResponse, startExam, updateStatus };

import api from "api/api";
import {
  GET_EXAM_REQUEST,
  GET_EXAM_SUCCESS,
  GET_EXAM_FAIL,
  EXAM_SUBMIT_REQUEST,
  EXAM_SUBMIT_SUCCESS,
  EXAM_SUBMIT_FAIL,
  EXAM_RESET,
  GET_EXAM_DETAILS,
  GET_RESPONSE,
  UPDATE_RESPONSE,
  SUBMIT_RESPONSE_REQUEST,
  SUBMIT_RESPONSE_SUCCESS,
  SUBMIT_RESPONSE_FAIL,
} from "constants/examConstants";
import * as AuthServices from "services/authService";

const initialState = {
  loading: false,
  details: { Categories: [], },
  questions: [],
  instructions: [],
};
function upcommingExamReducer(state = { examloading: true }, action) {
  switch (action.type) {
    case "ADD_UPCOMING_EXAMS":
      // console.log(action.payload);
      return { ...state, upcomingExams: action.payload, examloading: false };

    case "UPCOMING_EXAMS_FAILED":
      // console.log(action.payload);
      return { examloading: false };
    case "UPCOMING_EXAMS_REQUEST":
      // console.log(action.payload);
      return { examloading: true };

    default:
      return state;
  }
}

function examReducer(state = initialState, action) {
  switch (action.type) {
    case GET_EXAM_REQUEST:
      return { loading: true, status: 0 };
    case GET_EXAM_SUCCESS:
      return {
        loading: false,
        details: action.payload.exam[0],
        instructions: action.payload.instructions,
        questions: action.payload.questions,
        status: 200,
      };
    case GET_EXAM_FAIL:
      // return {
      //   loading: false,
      //   error: action.payload,

      // };
      return initialState;
    case EXAM_RESET:
      return initialState;
    default:
      return state;
  }
}

function responseReducer(
  state = { loading: false, responses: {}, info: { started: false,practise:false }, type: {} },
  action
) {
  switch (action.type) {
    case GET_RESPONSE:
      return state;
    case "START_EXAM":
      return { ...state, info: action.payload };
    case UPDATE_RESPONSE:
      return {
        ...state,
        responses: {
          ...state.responses,
          [action.payload.index]: {
            ...state.responses[action.payload.id],
            ...action.payload,
          },
        },
      };
    case "UPDATE_STATUS":
      var flagged = 0;
      var answered = 0;
      var categ = {}
      Object.values(state.responses).map((val) => {
        if (val.flag) flagged++
        if (val.ans) {
          answered++
          if (val.type in categ) categ[val.type]++
          else categ[val.type] = 1
        }
      })
      return { ...state, info: { ...state.info, flagged: flagged, answered: answered }, type: categ }
    case SUBMIT_RESPONSE_REQUEST:
      return { ...state, loading: true };
    case SUBMIT_RESPONSE_SUCCESS:
      return {
        ...state,
        loading: false,
        status: 200,  
        result: action.payload
      };
    case SUBMIT_RESPONSE_FAIL:
      return { ...state, loading: false, error: action.payload.error };
    case "RESET_RESPONSE":
      return { loading: false, responses: {}, info: { started: false }, type: {} }
    case "CLEAR_RESPONSE":
      return { loading: false, responses: {}, info: { started: false }, type: {},...state}
    default:
      return state;
  }
}
export { examReducer, responseReducer, upcommingExamReducer };

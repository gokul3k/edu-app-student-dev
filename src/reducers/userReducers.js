import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  ADD_PROFILE_REG_DATA,
  USER_VERFIY_RESEND,
  USER_UPDATE_FAIL,
  ADD_PROFILE_REG_ADDRESS_DATA,
  ADD_PROFILE_REG_RES_ADDRESS_DATA,
  ADD_PROFILE_REG_SCHOOL_DATA,
  USER_PASSWORD_RESET_REQUEST,
  USER_PASSWORD_RESET_SUCCESS,
  USER_PASSWORD_RESET_COMPLETE,
  USER_PASSWORD_RESET_FAIL,
} from "../constants/userConstants";

function userSigninReducer(state = {}, action) {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true, status: 0 };
    case USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload, status: 200 };
    case USER_SIGNIN_FAIL:
      return {
        loading: false,
        error: action.payload,
        status: action.status,
      };
    case USER_PASSWORD_RESET_REQUEST:
      return { ploading: true, pstatus: 0 };
    case USER_PASSWORD_RESET_SUCCESS:
      return { ploading: false, pstatus: 200 };
    case USER_PASSWORD_RESET_FAIL:
      return { ploading: false, pstatus: 400 };
    case USER_PASSWORD_RESET_COMPLETE:
      return { ploading: true, pstatus: 0 };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
}

function userUpdateReducer(state = {}, action) {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true, status: 0 };
    case USER_UPDATE_SUCCESS:
      return { loading: false, userInfo: action.payload, status: 200 };
    case USER_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
        status: action.status,
      };
    default:
      return state;
  }
}

function userRegisterReducer(state = {}, action) {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
    case USER_VERFIY_RESEND:
      return { loading: true, userInfo: action.payload, status: 0 };
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
        status: action.status,
      };
    case USER_REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload,
        status: action.status,
      };
    default:
      return state;
  }
}

const initialState = {
  profileInfo: {},
  userInfo: {
    fullName: "",
    gender: "M",
    dob: "2000-10-01",
    regNumber: "",
  },
  profilePic: "",
  addressInfo: {
    residence: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipcode: "",
      phoneNo: "",
    },
    permanent: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipcode: "",
      phoneNo: "",
    },
  },
  academics: {
    schoolName10: "",
    cgpa10: "",
    board10: "",
    location10: "",
    markType10:"C",
    schoolName12: "",
    cgpa12: "",
    board12: "",
    location12: "",
    markType12:"C",
  },
  degree: {},
  certifications: {},
  certificationPic: [],
  upcomingExams: [],
  skills: [],
  aboutMe: '',
  experiences: []
};

const userProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PROFILE_RESET":
      return initialState
    case "ADD_PROFILE_INFO":
      return { ...state, profileInfo: action.payload };
    case ADD_PROFILE_REG_DATA:
      console.log(action.payload)
      return {
        ...state,
        userInfo: { ...state.userInfo, ...action.payload },
      };
    case 'SET_EXPERIENCE_DATA':
      return {
        ...state,
        skills: action.payload.skills, experiences: action.payload.experiences, aboutMe: action.payload.aboutMe
      };
    case ADD_PROFILE_REG_ADDRESS_DATA:
      return {
        ...state,
        addressInfo: {
          ...state.addressInfo,
          permanent: {
            ...state.addressInfo.permanent,
            ...action.payload,
          },
        },
      };
    case ADD_PROFILE_REG_RES_ADDRESS_DATA:
      return {
        ...state,
        addressInfo: {
          ...state.addressInfo,
          residence: {
            ...state.addressInfo.residence,
            ...action.payload,
          },
        },
      };
    case ADD_PROFILE_REG_SCHOOL_DATA:
      return {
        ...state,
        academics: { ...state.academics, ...action.payload },
      };
    case "ADD_PROFILE_PICTURE":
      console.log(action.payload);
      return {
        ...state,
        profilePic: action.payload,
      };
    case "ADD_PROFILE_REG_CERTIFICATE_DATA":
      console.log("Reducer value is ", action.payload);
      return {
        ...state,
        certifications: {
          ...state.certifications,
          [action.payload.id]: {
            ...state.certifications[action.payload.id],
            ...action.payload,
          },
        },
      };
    case "ADD_PROFILE_REG_COLLEGE_DATA":
      
      return {
        ...state,
        degree: {
          ...state.degree,
          [action.payload.id]: {
            ...state.degree[action.payload.id],
            ...action.payload,
          },
        },
      };
    case "ADD_PROFILE_DEGREE_CERTIFICATE":

      return {
        ...state,
        certificationPic: [...state.certificationPic, action.payload],
      };
    case "ADD_UPCOMING_EXAMS":
      // console.log(action.payload);
      return { ...state, upcomingExams: action.payload };
    case 'REMOVE_REG_COLLEGE_DATA':
      const tempData = state.degree;
      delete tempData[action.payload];
      return { ...state, degree: tempData };
      case 'REMOVE_REG_CERTIFICATE_DATA':
        const tempCer = state.certifications;
        delete tempCer[action.payload];
        return { ...state, certifications: tempCer };

    default:
      return state;
  }
};

export {
  userSigninReducer,
  userRegisterReducer,
  userUpdateReducer,
  userProfileReducer,
};

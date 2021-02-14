import Axios from 'axios';
import Cookie from 'js-cookie';
import api from '../api/api';
import { getCredentials } from '../services/authService';

import {
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    ADD_PROFILE_REG_DATA,
    ADD_PROFILE_REG_ADDRESS_DATA,
    ADD_PROFILE_REG_RES_ADDRESS_DATA,
    ADD_PROFILE_REG_SCHOOL_DATA,
    USER_VERFIY_RESEND,
    USER_REGISTER_FAIL,
    USER_PASSWORD_RESET_REQUEST,
    USER_PASSWORD_RESET_SUCCESS,
    USER_PASSWORD_RESET_FAIL,
    USER_PASSWORD_RESET_COMPLETE,
    USER_LOGOUT,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
} from '../constants/userConstants';
import { setCredentials, removeCredentials } from '../services/authService';
import { setUserInfo } from '../services/userService'
import clearStorage from 'services/clearStorage';

const BASE_URL = 'https://edu-app-server-beta.herokuapp.com';

const getUserInfo = () => async (dispatch, getState) => {
    try {
        dispatch({type:"PROFILE_RESET"})
        const url = BASE_URL + '/rest/v1/getProfile';
        const config = {
            url,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getCredentials()}`,
            },
        };

        const response = await Axios(config);
  
        dispatch({
            type: 'ADD_PROFILE_INFO',
            payload: response.data.response,
        });
    } catch (error) {
        console.log(error);
    }
};
const resetProfile = () => {
    return { type:"PROFILE_RESET" };
  };

const submitUserData = (history, setLoading,p) => {
    return async (dispatch, getState) => {

        try {
            const url = BASE_URL + '/rest/v1/addStudentInfo';
            const formData = new FormData();
            const {
                userInfo,
                addressInfo,
                academics,
                degree,
                certifications,
                profilePic,
                certificationPic,
                skills,
                aboutMe,
                experiences
            } = new getState().userProfile;
            formData.append('userInfo', JSON.stringify(userInfo));
            formData.append('addressInfo', JSON.stringify(addressInfo));
            formData.append('academics', JSON.stringify(academics));
            formData.append('degree', JSON.stringify(degree));
            formData.append('certifications', JSON.stringify(certifications));
            formData.append('profilePic', profilePic);
            certificationPic.forEach((certification) => {
                formData.append('certificates', certification);
            });
            formData.append('edit',p)
            skills.forEach((skill)=>{
                formData.append('skills',skill)
            })

            
            formData.append('aboutMe',aboutMe)

            // formData.append("skills",skills)
            formData.append("experiences",JSON.stringify(experiences))

            // experiences.forEach((experience)=>{
            //     formData.append('experiences',JSON.stringify(experience))
            // })

           

            const config = {
                method: 'POST',
                url,
                data: formData,
                headers: {
                    Authorization: `Bearer ${getCredentials()}`, //${getCredentials()}`,
                    'Content-Type': 'multipart/form-data',
                    Accept: 'application/json',
                },
            };

            const response = await Axios(config);
            setLoading(false)
            setUserInfo(null,null,true)
            history.replace('/home')
        } catch (error) {
            console.log(error);
            setLoading(false)
            console.log(error.response);
        }
    };
}

const update = ({ userId, name, email, password }) => async (
    dispatch,
    getState
) => {
    const {
        userSignin: { userInfo },
    } = getState();
    dispatch({
        type: USER_UPDATE_REQUEST,
        payload: { userId, name, email, password },
    });
    try {
        const { data } = await Axios.put(
            '/api/users/' + userId,
            { name, email, password },
            {
                headers: {
                    Authorization: 'Bearer ' + userInfo.token,
                },
            }
        );
        dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
        // Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
    }
};

const signin = (email, password, history) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
        const { data } = await api.post('/login/email', { email, password });
       
        Cookie.set('signRe', true);
        setCredentials(data.response);
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data, status: 200 });
        setUserInfo(email, null, data.isRegistered)
        if (data.isRegistered)
            history.replace('/')
        else history.replace('/register')
    } catch (error) {
        Cookie.set('signRe', false);
        const res = { ...error };
        removeCredentials()
        clearStorage()
        console.log('sign req error ', res);
        if (res.response)
            dispatch({
                type: USER_SIGNIN_FAIL,
                payload: res.response.data,
                status: res.response.status,
            });
        else
            dispatch({
                type: USER_SIGNIN_FAIL,
                payload: { error: 'Network/Connection Error' },
                status: 404,
            });
    }
};

const register = (email, password) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { email, password } });
    try {
        const data = await api.post(
            '/signup/email',
            { email, password },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
   
        if (data.status === 200) {
            Cookie.set('regRe', true);
            dispatch({
                type: USER_REGISTER_SUCCESS,
                payload: { email },
                status: 200,
            });
        } //TODO
        // Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
        const res = { ...error };
        Cookie.set('regRe', false);
        console.log('reg req error ', res);
        if (res.response)
            dispatch({
                type: USER_REGISTER_FAIL,
                payload: res.response.data,
                status: res.response.status,
            });
        else
            dispatch({
                type: USER_REGISTER_FAIL,
                payload: 'Not found',
                status: 404,
            });
    }
};

const resendEmail = (email) => async (dispatch) => {
   
    dispatch({ type: USER_VERFIY_RESEND, payload: { email } });
    try {
        const data = await api.post(
            '/resendVerification',
            { email },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        dispatch({ type: USER_REGISTER_SUCCESS, payload: { email } }); //TODO
    } catch (err) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: err.message,
            status: 511,
        }); //TODO
    }
};
const resetPassword = (email) => async (dispatch) => {
   
    dispatch({ type: USER_PASSWORD_RESET_REQUEST });
    try {
        const data = await api.post(
            '/forgotPassword',
            { email },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        dispatch({ type: USER_PASSWORD_RESET_SUCCESS }); //TODO
    } catch (err) {
        dispatch({
            type: USER_PASSWORD_RESET_FAIL,
            payload: 'Email not found',
            pstatus: 511,
        }); //TODO
    }
};
const passwordResetComplete = () => (dispatch) => {
    dispatch({ type: USER_PASSWORD_RESET_COMPLETE });
};
const logout = (history) => (dispatch) => {
    dispatch({ type: USER_LOGOUT });
    removeCredentials();
    clearStorage();
    history.replace('/signin');
};

const changeProfileRegInfo = (data) => {
    return {
        type: ADD_PROFILE_REG_DATA,
        payload: data,
    };
};

const changeProfileRegAddressInfo = (typ, data) => {
   
    return {
        type:
            typ === 'perm'
                ? ADD_PROFILE_REG_ADDRESS_DATA
                : ADD_PROFILE_REG_RES_ADDRESS_DATA,
        payload: data,
    };
};

const changeProfileSchoolInfo = (data) => {
    
    return {
        type: ADD_PROFILE_REG_SCHOOL_DATA,
        payload: data,
    };
};

const changeProfilePicture = (data) => {
  
    return {
        type: 'ADD_PROFILE_PICTURE',
        payload: data,
    };
};

const addDegreeDetails = (data) => {
    
    return {
        type: 'ADD_PROFILE_REG_COLLEGE_DATA',
        payload: data,
    };
};

const addCertificateDetails = (data) => {
    return {
        type: 'ADD_PROFILE_REG_CERTIFICATE_DATA',
        payload: data,
    };
};

const addCertificatePicture = (data) => {
    return {
        type: 'ADD_PROFILE_DEGREE_CERTIFICATE',
        payload: data,
    };
};

const removeCertificateDetail = (data) => {
    return {
        type: 'REMOVE_REG_CERTIFICATE_DATA',
        payload: data,
    };
};

const removeDegreeDetail = (data) => {
    return {
        type: 'REMOVE_REG_COLLEGE_DATA',
        payload: data,
    };
};
const setExperienceData = (data) => {
    return {
        type: 'SET_EXPERIENCE_DATA',
        payload: data,
    };
};

const getUpcommingExams = (limit = 10, offset = 0) => async (
    dispatch,
    getState
) => {
    try {
        const response = await api.post('/getAvailableExams', { offset, limit }, {
            headers: {
                Authorization: `Bearer ${getCredentials()}`,
                'Content-Type': 'application/json',
            }
        });
        dispatch({
            type: 'ADD_UPCOMING_EXAMS',
            payload: response.data.response,
        });
    } catch (error) {
        console.log(error.data);
    }
};

export {
    signin,
    register,
    logout,
    update,
    resendEmail,
    changeProfileRegInfo,
    changeProfileRegAddressInfo,
    changeProfileSchoolInfo,
    submitUserData,
    changeProfilePicture,
    addDegreeDetails,
    addCertificateDetails,
    addCertificatePicture,
    resetPassword,
    passwordResetComplete,
    removeDegreeDetail,
    removeCertificateDetail,
    getUserInfo,
    setExperienceData,
    resetProfile,
};

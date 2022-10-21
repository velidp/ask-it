import * as api from '../api';
import { AUTH, GET_NOTIFICATIONS, TOP_USERS, UPDATE_USER } from '../constants/actionTypes';


export const signin = (formData, navigate, setWrongPassword, setWrongEmail) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);

        dispatch({type: AUTH, data});

        navigate('/');
    } catch (error) {
        if(JSON.parse(JSON.stringify(error)).status === 400) {setWrongPassword(true)};
        if(JSON.parse(JSON.stringify(error)).status === 404) {setWrongEmail(true)};
        console.log(error);
    }
}

export const signup = (formData, navigate, setUserAlreadyExists) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);

        dispatch({type: AUTH, data});

        navigate('/');
    } catch (error) {
        if(JSON.parse(JSON.stringify(error)).status === 400) {setUserAlreadyExists(true)};
        console.log(error);
    }
}

export const updateUser = (id, formData, setWrongPassword, successfulUpdate) => async (dispatch) => {
    try {
        const { data } = await api.updateUser(id, formData);
        dispatch({type: UPDATE_USER, payload: data});
        successfulUpdate();
    } catch (error) {
        if(JSON.parse(JSON.stringify(error)).status === 400) { setWrongPassword(true) };
        console.log(error);
    }
}

export const topUsers = () => async (dispatch) => {

    try {
        const { data } = await api.topUsers();
        dispatch({type: TOP_USERS, payload: data}); 
    } catch (error) {
        console.log(error.message);
    }

}

export const getNotifications = (id) => async (dispatch) => {

    try {
        const { data } = await api.getNotifications(id);
        dispatch({type: GET_NOTIFICATIONS, payload: data}); 
    } catch (error) {
        console.log(error.message);
    }

}
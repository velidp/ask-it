import * as api from '../api';
import { GET_QUESTIONS, MY_QUESTIONS, HOT_QUESTIONS, LIKE_QUESTIONS, CREATE_QUESTIONS } from '../constants/actionTypes';

export const getQuestions = () => async (dispatch) => {

    try {
        const { data } = await api.getQuestions();
        dispatch({type: GET_QUESTIONS, payload: data}); 
    } catch (error) {
        console.log(error.message);
    }

}


export const myQuestions = (id) => async (dispatch) => {

    try {
        const { data } = await api.myQuestions(id);
        dispatch({type: MY_QUESTIONS, payload: data}); 
    } catch (error) {
        console.log(error.message);
    }

}

export const hotQuestions = () => async (dispatch) => {

    try {
        const { data } = await api.hotQuestions();
        dispatch({type: HOT_QUESTIONS, payload: data}); 
    } catch (error) {
        console.log(error.message);
    }

}

export const likeQuestion = (like) => async (dispatch) => {
    try {
        const { data } = await api.likeQuestion(like);
        dispatch({type: LIKE_QUESTIONS, payload: data}); 
    } catch (error) {
        console.log(error.message);
    }
}

export const createQuestion = (question) => async (dispatch) => {
    try {
        const { data } = await api.createQuestion(question);
        dispatch({type: CREATE_QUESTIONS, payload: data}); 
    } catch (error) {
        console.log(error.message);
    }
}
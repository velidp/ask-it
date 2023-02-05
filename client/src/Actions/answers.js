import * as api from '../Api';
import { DELETE_ANSWER, UPDATE_ANSWER, CREATE_ANSWER, LIKE_ANSWER } from '../Constants/actionTypes';

export const deleteAnswer = (id) => async (dispatch) => {

    try {
        await api.deleteAnswer(id);
        dispatch({type: DELETE_ANSWER, payload: id}); 
    } catch (error) {
        console.log(error.message);
    }

}

export const updateAnswer = (id, updatedAnswer) => async (dispatch) => {

    try {
        const { data } = await api.updateAnswer(id, updatedAnswer);
        dispatch({type: UPDATE_ANSWER, payload: data}); 
    } catch (error) {
        console.log(error.message);
    }

}

export const createAnswer = (answer) => async (dispatch) => {
    try {
        const { data } = await api.createAnswer(answer);

        dispatch({type: CREATE_ANSWER, payload: data});
    } catch (error) {
        console.log(error);
    }
}


export const likeAnswer = (like) => async (dispatch) => {
    try {
        const { data } = await api.likeAnswer(like);
        dispatch({type: LIKE_ANSWER, payload: data}); 
    } catch (error) {
        console.log(error.message);
    }
}
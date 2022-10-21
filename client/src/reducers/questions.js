import { GET_QUESTIONS, HOT_QUESTIONS, MY_QUESTIONS, LIKE_QUESTIONS, CREATE_QUESTIONS } from "../constants/actionTypes"; 

const defaultState = {
    myQuestions: [],
    newQuestions: [],
    hotQuestions: []
};

export default (questions = defaultState, action) => {
    switch (action.type) {
        case GET_QUESTIONS:
            return {...questions, newQuestions: action.payload};
        case MY_QUESTIONS:
            return {...questions, myQuestions: action.payload};
        case HOT_QUESTIONS:
            return {...questions, hotQuestions: action.payload};
        case LIKE_QUESTIONS:
            return questions;
        case CREATE_QUESTIONS:
            return {...questions, newQuestions: action.payload};
        default:
            return questions;
    }
}
import { DELETE_ANSWER, UPDATE_ANSWER, LIKE_ANSWER, CREATE_ANSWER } from '../Constants/actionTypes'; 



export default (answers = [], action) => {
    switch (action.type) {
        case DELETE_ANSWER:
            return action.payload;
        case UPDATE_ANSWER:
            return answers.map((answer) => answer.id === action.payload.id ? action.payload : answer);
        case CREATE_ANSWER:
            return [...answers, action.payload];
        case LIKE_ANSWER:
            return [...answers, action.payload];
        default:
            return answers;
    }
}
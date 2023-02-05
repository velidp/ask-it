import { AUTH, LOGOUT, UPDATE_USER, TOP_USERS, GET_NOTIFICATIONS } from '../Constants/actionTypes';

const defaultState = {
    authData: [],
    topusers: [],
    notifications: [],
};

const authReducer = (state = defaultState, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({...action?.data.result.rows[0], token: action?.data.token}));
            return {...state, authData: action?.data};
        case LOGOUT:
            localStorage.clear();
            return {...state, authData: null};
        case UPDATE_USER:
            localStorage.setItem('profile', JSON.stringify({...action?.payload.updatedUser.rows[0], token: action?.payload.token }));
            return {...state, authData: action?.data};
        case TOP_USERS:
            return {...state, topusers: action.payload};
        case GET_NOTIFICATIONS:
            return {...state, notifications: action.payload};
        default:
            return state;
    }
}



export default authReducer;
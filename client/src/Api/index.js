import axios from 'axios';

const API = axios.create({ baseURL: 'https://ask-it-server.herokuapp.com' });

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

export const getQuestions = () => API.get(`/questions/all-questions`);
export const myQuestions = (id) => API.get(`/questions/my-questions/${id}`);
export const hotQuestions = () => API.get(`/questions/hot-questions`);
export const likeQuestion = (like) => API.patch(`/questions/`, like);
export const createQuestion = (question) => API.post(`/questions/`, question);


export const deleteAnswer = (id) => API.delete(`/answer/${id}`);
export const updateAnswer = (id, updatedAnswer) => API.patch(`/answer/${id}`, updatedAnswer);
export const createAnswer = (newAnswer) => API.post(`/answer/`, newAnswer); 
export const likeAnswer = (like) => API.patch(`/answer/`, like);


export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
export const updateUser = (id, formData) => API.patch(`/user/${id}/update`, formData);
export const topUsers = () => API.get(`/user/top-users`);
export const getNotifications = (id) => API.get(`/user/${id}`);
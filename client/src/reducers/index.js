import { combineReducers } from 'redux';
import questions from './questions';
import auth from './auth';
import answers from './answers';

export default combineReducers({ questions, auth, answers });
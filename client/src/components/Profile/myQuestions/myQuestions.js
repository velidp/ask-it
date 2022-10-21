import React, { useEffect, useState } from 'react';
import ListOfQuestions from '../../listOfQuestions/listOfQuestions';
import { Paper } from '@mui/material';
import useStyles from './styles';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { myQuestions } from '../../../actions/questions';

function MyQuestions() {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const classes = useStyles();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(myQuestions(user.id));
    }, [dispatch]);

    const questions = useSelector((state) => state.questions.myQuestions);

    return (
        <Paper className={classes.container}>
            <ListOfQuestions typeOfList='myQuestions' questions={questions} heading='My questions' ></ListOfQuestions>
        </Paper>
    );
}

export default MyQuestions;

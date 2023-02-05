import React,  { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ListOfQuestions from '../listOfQuestions/listOfQuestions';
import { useDispatch } from 'react-redux';
import { getQuestions } from '../../actions/questions';
import { Paper } from '@mui/material';
import useStyles from './styles';


function Questions() {

    const dispatch = useDispatch();

    const classes = useStyles();

    useEffect(() => {
        dispatch(getQuestions());
    }, [dispatch]);


    const newquestions = useSelector((state) => state.questions.newQuestions);


  return (
    
        <Paper className={classes.container} elevation={3}>
            <ListOfQuestions typeOfList='hotQuestions' questions={newquestions} heading='All questions' ></ListOfQuestions>
        </Paper>

    );
}

export default Questions;

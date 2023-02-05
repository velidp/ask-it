import React, { useEffect, useState } from 'react';
import { Grid, Paper, TextField, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import useStyles from './styles';
import ListOfQuestions from '../ListOfQuestions/ListOfQuestions';
import ListOfUsers from '../ListOfQuestions/ListOfUsers';
import { useDispatch } from 'react-redux';
import { getQuestions, hotQuestions, createQuestion } from '../../Actions/Questions';


function Home() {

    const classes = useStyles();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const [inputValue, setInputValue] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(hotQuestions());
        dispatch(getQuestions());
    }, [dispatch]);


    const hotquestions = useSelector((state) => state.questions.hotQuestions);
    const newquestions = useSelector((state) => state.questions.newQuestions);

    const handleSubmit = (e) => {
        e.preventDefault();
        document.getElementById('askForm').reset();
        dispatch(createQuestion({creatorId: user.id, question: inputValue}));
        setTimeout(() => dispatch(getQuestions()), 500);
        setTimeout(() => dispatch(hotQuestions()), 500);
    }

    return (
            <>
                { user ?
                    <Paper className={classes.askContainer}>
                        <form id='askForm' onSubmit={handleSubmit}>
                            <Grid container direction='row' spacing={2}>
                                <Grid item xs={10}>
                                    <TextField onChange={(e) => {setInputValue(e.target.value)}} required fullWidth className={classes.inputAnswer} label='Ask something'></TextField>
                                </Grid>
                                <Grid item>
                                    <Button type='submit' className={classes.btn}>Post Question</Button>
                                </Grid>
                                
                            </Grid>
                        </form>
                    </Paper>
                : null}
                <Grid container spacing={1} className={classes.container}>

                    <Grid item >
                        <Paper className={classes.item} elevation={3}>
                            <ListOfQuestions typeOfList='newQuestions' questions={newquestions} heading='New questions' ></ListOfQuestions>
                        </Paper>
                    </Grid>
                    
                    <Grid item>
                        <Paper className={classes.item} elevation={3}>
                            <ListOfUsers></ListOfUsers>
                        </Paper>
                    </Grid>

                    <Grid item>
                        <Paper className={classes.item} elevation={3}>
                            <ListOfQuestions typeOfList='newQuestions' questions={hotquestions} heading='Hot questions' ></ListOfQuestions>
                        </Paper>
                    </Grid>
                </Grid>
            </>
    );
}

export default Home;

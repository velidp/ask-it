import React, { useState } from 'react';
import { Paper, Typography, Button, TextField, Avatar, Grid } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import useStyles from './styles';
import Answer from './answer/answer';
import { createAnswer } from '../../actions/answers';
import { useDispatch } from 'react-redux';
import { likeQuestion, myQuestions, getQuestions, hotQuestions } from '../../actions/questions';


function Question({question, typeOfList}) {

    const classes = useStyles();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const [showAnswers, setShowAnswer] = useState(false);

    const [inputValue, setInputValue] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createAnswer({answer: inputValue, creatorId: user.id, questionId: question.id}));
        
        switch (typeOfList) {
            case 'myQuestions':
                    setTimeout(() => dispatch(myQuestions(user.id)), 500);
                break;
            case 'newQuestions':
                    setTimeout(() => dispatch(getQuestions()), 500);
                    setTimeout(() => dispatch(hotQuestions()), 500);
                break;
            
            default:
                break;
        }
        setInputValue('');
        document.getElementById('form').reset();
    }

    const handleLike = () => {
        dispatch(likeQuestion({creatorId: user.id, questionId: question.id}));
        
        switch (typeOfList) {
            case 'myQuestions':
                    setTimeout(() => dispatch(myQuestions(user.id)), 500);
                break;
            case 'newQuestions':
                    setTimeout(() => dispatch(getQuestions()), 500);
                    setTimeout(() => dispatch(hotQuestions()), 500);
                break;
            
            default:
                break;
        }
    }

  
    return (
        <Paper elevation={3} className={classes.paper}>
            <Typography variant='h5'>{question.question}</Typography>

            <Grid className={classes.user} container direction='row'>
                <Avatar sx={{ bgcolor: '#34568B', height: '32px', width: '32px' }}>{question.first_name.charAt(0)}</Avatar>
                <Typography className={classes.fullName} variant='body2'>{question.first_name} {question.last_name}</Typography>
            </Grid>
            
            <Button disabled={user ? false : true} onClick={() => {handleLike()}} className={classes.btn}><ThumbUpIcon /> &nbsp; {question.count} </Button>
            
                    <Button onClick={() => setShowAnswer(!showAnswers)}>{ showAnswers ? 'Colapsse answers' : 'Show answers' }</Button>
                    { showAnswers ? 
                        <>
                            { user ?
                                <form onSubmit={handleSubmit} id={'form'}>
                                    <TextField required onChange={(e) => {setInputValue(e.target.value)}} className={classes.answerInput} label='Answer' fullWidth></TextField>
                                    <Button type='submit' className={classes.answerBtn}>Post Answer</Button>
                                </form>
                            : null }   

                        
                            <Typography color='GrayText' className={classes.answersHeading} variant='h6'>Answers: </Typography>
                            
                            {
                                question.answers.map((answer)=> (
                                    <Answer typeOfList={typeOfList} key={answer.id} answer={answer}></Answer>
                                ))
                            }
                        </> : null
                    }
                
            
        </Paper>
    );
}

export default Question;

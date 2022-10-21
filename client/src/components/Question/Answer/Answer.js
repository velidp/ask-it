import React, { useState } from 'react';
import { Typography, Button, Divider, TextField, Grid, Avatar } from '@mui/material';
import useStyles from './styles';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useDispatch } from 'react-redux';
import { deleteAnswer, updateAnswer } from '../../../actions/answers';
import { myQuestions, getQuestions, hotQuestions } from '../../../actions/questions';
import { likeAnswer } from '../../../actions/answers'

function Answer({ answer, typeOfList }) {

    const classes = useStyles();

    const dispatch = useDispatch();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const [showInput, setShowInput] = useState(false);

    const [inputValue, setInputValue] = useState(answer.answer);

    const handleSaveEdit = (id, answer) => {
        if(showInput) {
            setShowInput(false);
            dispatch(updateAnswer(id, { answer }));
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
        else {
            setShowInput(true);
        }
    }

    const handleDelete = () => {
        dispatch(deleteAnswer(answer.id)); 
        
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

    const handleLike = () => {
        dispatch(likeAnswer({creatorId: user.id, answerId: answer.id}));
        
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
        <div className={classes.container}>
            <Typography className={classes.answer} variant='h6'>{answer.answer}</Typography>
            
            <Grid className={classes.user} container direction='row'>
                <Avatar sx={{ bgcolor: '#34568B', height: '32px', width: '32px' }}>{answer.first_name.charAt(0)}</Avatar>
                <Typography className={classes.fullName} variant='body2'>{answer.first_name} {answer.last_name}</Typography>
            </Grid>
            
            <Button disabled={user ? false : true} onClick={() => {handleLike()}} className={classes.btn}><ThumbUpIcon /> &nbsp; {answer.count} </Button>
            
            { user !== null && user.id === answer.creator_id ?
                (<>
                    { showInput ? <TextField onChange={(e) => {setInputValue(e.target.value)}} value={inputValue} className={classes.answerUpdate} fullWidth label='Update answer'></TextField> : null}
                    <br></br>
                    <Button onClick={() => handleSaveEdit(answer.id, inputValue)} className={classes.btn} font='small' variant='outlined'>{showInput ? 'Save' : 'Edit'}</Button>
                    <Button onClick={handleDelete} className={classes.btn} font='small' variant='outlined'>Delete</Button>
                </> )
                : null 
            }

            <Divider/>
        </div>
    );
}

export default Answer;

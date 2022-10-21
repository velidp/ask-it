import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import Question from '../question/question';
import useStyles from './styles';
import LinearProgress from '@mui/material/LinearProgress';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import StarIcon from '@mui/icons-material/Star';

function ListOfQuestions({ heading, questions, typeOfList }) {

    const classes = useStyles();

    const [visible, setVisible] = useState(20);

    const [buttonDisable, setButtonDisable] = useState(false);

    const showMoreItems = () => {
        setVisible(prevValue => prevValue + 20);
        if(visible > questions.length) setButtonDisable(true);
    }

    return (
        <div className={classes.container}>
            <Typography className={classes.heading} variant='h5'>{ heading === 'New questions' ? <FiberNewIcon className={classes.icon}/> : <StarIcon className={classes.icon}/> }{heading}</Typography>

            {(() => {
                  if(!questions.length) { 
                    return (
                        <>
                            <LinearProgress />
                            <br></br>
                            <Typography color='GrayText' variant='h6'>No questions found</Typography>
                        </>
                    )
                  } else {
                      return (
                        questions.slice(0, visible).map((question)=> (
                            <Question typeOfList={typeOfList} key={question.id} question={question}></Question>
                            
                        ))
                
                    )
                    
                  }
            })()}

            {questions.length ? 
                <Button disabled={buttonDisable} onClick={showMoreItems} className={classes.btn}>Load more...</Button> 
            : null}
            { questions.length && buttonDisable ? <Typography style={{marginLeft: 10}} variant='body2'>No more questions</Typography> : null}
                
        </div>
    );
    }

export default ListOfQuestions;

import React, { useEffect, useState } from 'react';
import { Button, Typography, LinearProgress } from '@mui/material';
import useStyles from './styles';
import User from '../UserCard/UserCard';
import { useDispatch, useSelector } from 'react-redux';
import { topUsers } from '../../Actions/Auth';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

function ListOfUsers() {

    const [visible, setVisible] = useState(20);

    const [buttonDisable, setButtonDisable] = useState(false);

    const classes = useStyles();

    const dispatch = useDispatch();

    useEffect(() => { dispatch(topUsers()) } , [dispatch]);

    const topusers = useSelector((state) => state.auth.topusers);

    const showMoreItems = () => {
        setVisible(prevValue => prevValue + 20);
        if(visible > topusers.length) setButtonDisable(true);
    }

    return (
           <div>
                <Typography className={classes.heading} variant='h5'><EmojiEventsIcon className={classes.icon}/>Most active users</Typography>
                
                {(() => {
                    if(!topusers.length) { 
                        return (
                            <>
                                <LinearProgress />
                                <br></br>
                                <Typography color='GrayText' variant='h6'>No users found</Typography>
                            </>
                        )
                    } else {
                        return (
                            
                            topusers.slice(0, visible).map((user) => (
                                <User user={user} key={user.id}></User>
                            ))
                    
                        )
                        
                    }
                })()}

                {topusers.length ? 
                    <Button disabled={buttonDisable} onClick={showMoreItems} className={classes.btn}>Load more...</Button> 
                : null}
                { topusers.length && buttonDisable ? <Typography style={{marginLeft: 10}} variant='body2'>No more users</Typography> : null}
                
            </div>
        );
    }

export default ListOfUsers;

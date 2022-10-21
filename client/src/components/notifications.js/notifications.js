import React, { useEffect, useState } from 'react';
import { getNotifications } from '../../actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import Notification from './notification/notification';
import { Typography, Paper } from '@mui/material';
import useStyles from './notification/styles';


function Notifications() {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const notifications = useSelector((state) => state.auth.notifications);

    const classes = useStyles();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getNotifications(user.id));
    }, [dispatch]);



    return (
        
        <div>
            { notifications.length ?
                notifications.slice(0).reverse().map((notification, index)=> (
                    <Notification key={index} notification={notification}></Notification>
                )) : <Paper className={classes.paper}><Typography className={classes.notification}>No notifications</Typography></Paper>
            }
        </div>
    );
}

export default Notifications;

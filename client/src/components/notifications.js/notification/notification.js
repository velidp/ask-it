import React from 'react';
import { Paper, Typography } from '@mui/material'
import useStyles from './styles';

function Notification({notification}) {

    const classes = useStyles();

    return (
        <Paper className={classes.paper} elevation={3}>
            <Typography className={classes.notification} variant='h6'>
                To your question "{notification.question}" user {notification.first_name} {notification.last_name} answered "{notification.answer}".
            </Typography>
        </Paper>
    );
}

export default Notification;

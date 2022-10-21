import { Avatar, Typography, Paper, Grid } from '@mui/material';
import React from 'react';
import useStyles from './styles';

function User({user}) {

  const classes = useStyles();

  return (
      <Paper className={classes.paper} elevatin={3}>
        <Grid container direction='row'>
          
          <Avatar sx={{ bgcolor: '#34568B' }} className={classes.avatar}>{user.first_name.charAt(0)}</Avatar>
          
          <Grid item>
            <Typography noWrap variant='h6'>{user.first_name} {user.last_name}</Typography>
            <Typography noWrap>{user.email}</Typography>
            <Typography>Number of answers: {user.count}</Typography>
          </Grid>
        </Grid>
      </Paper>
  );
}

export default User;

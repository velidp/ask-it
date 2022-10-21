import { Avatar, Paper, Typography, Button, Grid, Link } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import Form from './form/form';
import { useNavigate } from 'react-router-dom';



function Profile({setUserUpdate, userUpdate}) {

  const [showForm, setShowForm] = useState(false);

  const classes = useStyles();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  useEffect(() => {setUser(JSON.parse(localStorage.getItem('profile')))}, [userUpdate]);

  const navigate = useNavigate();


  if(user) {
    return (
      <>
        <Paper elevation={3} className={classes.container}>

          <Grid container direction='column' justifyContent='flex-start' alignItems='center'>
            <Avatar className={classes.avatar}></Avatar>
            <Typography className={classes.info} lineHeight={2} variant='h5'>{user.first_name} {user.last_name}</Typography>
            
            <Typography className={classes.info} color='GrayText' lineHeight={2} variant='h6'>{user.email}</Typography>
            <Button onClick={() => navigate('/my-questions')} className={classes.btn}>My questions</Button>
            <Button onClick={() => setShowForm(!showForm)} className={classes.btn}>Update profile</Button>
          </Grid>
          
        </Paper>
        {showForm ? <Form setUserUpdate={setUserUpdate} userUpdate={userUpdate} setShowForm={setShowForm}></Form> : null}
      </>
    )
  }
  else {
    return(
        <Typography variant='h6' className={classes.redirection}>You are not logged in. Go to: &nbsp; <Link className={classes.link} onClick={() => {navigate('/auth')}}>Login Page</Link></Typography>
    )
  }
}

export default Profile;

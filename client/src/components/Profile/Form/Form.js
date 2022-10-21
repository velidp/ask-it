import React, { useState } from 'react';
import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../actions/auth';

function Form({ setShowForm, setUserUpdate, userUpdate }) {

    const classes = useStyles();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const [formData, setFormData] = useState({ firstName: user.first_name, lastName: user.last_name, email: user.email, currentPassword: '', newPassword: '', confPassword: ''});

    const dispatch = useDispatch();

    const [wrongPassword, setWrongPassword] = useState(false);

    const[firstNameValue, setFirstNameValue] = useState(user.first_name);

    const[lastNameValue, setLastNameValue] = useState(user.last_name);

    const successfulUpdate = () => {
        setShowForm(false);
        setUser(JSON.parse(localStorage.getItem('profile')));
        setUserUpdate(!userUpdate);
    }
 
    const handleSubmit = (e) => {

        e.preventDefault();

        if(formData.newPassword === formData.confPassword) {
            setWrongPassword(false);
            dispatch(updateUser(user.id, formData, setWrongPassword, successfulUpdate));
        }

    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    return (
        <Paper elevation={3} className={classes.container}>
            <form onSubmit={handleSubmit}>
                <Grid container direction='column'>
                    <TextField required onChange={(e) => {handleChange(e); setFirstNameValue(e.target.value)}} value={firstNameValue} name='firstName' className={classes.input} label='First Name' autoFocus></TextField>
                    <TextField required onChange={(e) => {handleChange(e); setLastNameValue(e.target.value)}} value={lastNameValue} name='lastName' className={classes.input} label='Last Name'></TextField>
                    <TextField required onChange={handleChange} name='currentPassword' className={classes.input} type='password' label='Current password'></TextField>
                    {wrongPassword ? <Typography className={classes.wrongPass} variant='caption'>Wrong password !</Typography> : null}
                    <TextField onChange={handleChange} name='newPassword' className={classes.input} type='password' label='New password'></TextField>
                    <TextField onChange={handleChange} name='confPassword'  className={classes.input} type='password' label='Confirm password'></TextField>
                    {(formData.newPassword !== formData.confPassword) ? <Typography className={classes.wrongPass} variant='caption'>Passwords must match !</Typography> : null}          
                    <Grid container direction='row'>
                        <Button type='submit' className={classes.btn}>Save</Button>
                        <Button onClick={() => setShowForm(false)} className={classes.btn}>Cancel</Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
}

export default Form;

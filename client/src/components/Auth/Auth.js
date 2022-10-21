import React, { useState } from 'react';
import { Paper, Button, Grid, Avatar, TextField, Typography, Link } from '@mui/material';
import useStyles from './styles';
import LockIcon from '@mui/icons-material/Lock';
import { signin, signup} from '../../actions/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: ''};

function Auth() {

    const classes = useStyles();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const [isSignUp, setIsSignUp] = useState(false);

    const [userAlreadyExists, setUserAlreadyExists] = useState(false);
    
    const [wrongPassword, setWrongPassword] = useState(false);

    const [wrongEmail, setWrongEmail] = useState(false);

    const [validEmail, setValidEmail] = useState(true);

    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [passwordsLength, setPasswordsLength] = useState(true);

    const [formData, setFormData] = useState(initialState);

    const dispatch = useDispatch();

    const navigate = useNavigate();
    
    const handleSubmit = (e) => {

        e.preventDefault();

        
        setPasswordsMatch(formData.password === formData.confirmPassword);
       
        setPasswordsLength(formData.password.length > 4);

        setValidEmail(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(formData.email));

        
        if(isSignUp){
            dispatch(signup(formData, navigate, setUserAlreadyExists));
        } 
        else {
            dispatch(signin(formData, navigate, setWrongPassword, setWrongEmail));
        }

    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const switchMode = () => {
        document.getElementById('form').reset();
        setWrongPassword(false);
        setPasswordsMatch(true);
        setUserAlreadyExists(false);
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    };


    if(!user){
        return (
            <div className={classes.mainDiv}>
                <Paper elevation={3} className={classes.paper}>

                    <Grid className={classes.grid} container direction='column' spacing={2}>

                        <Grid item >
                            <Avatar>
                                <LockIcon/>
                            </Avatar>
                        </Grid>

                        <form id='form' className={classes.form} onSubmit={handleSubmit}>
                            <Grid className={classes.grid} container direction='column' spacing={2}>
                                
                                { isSignUp && (
                                    <Grid className={classes.gridInner} container direction='row' spacing={2}>
                                        <Grid className={classes.grid2} item>
                                            <TextField onChange={handleChange} required name='firstName' className={classes.text2} label='First Name' autoFocus />
                                        </Grid>

                                        <Grid item>
                                            <TextField onChange={handleChange} required name='lastName' className={classes.text2} label='Last Name' />
                                        </Grid>
                                    </Grid>
                                )}

                                <Grid item>
                                    <TextField onChange={handleChange} required name='email' autoFocus className={classes.text} label='Email Adress'/>
                                    {isSignUp && userAlreadyExists && passwordsMatch ? <Typography className={classes.wrongPass} variant='caption'>User already exist !</Typography> : null}
                                    {!isSignUp && wrongEmail ? <Typography className={classes.wrongPass} variant='caption'>User does not exist</Typography> : null}
                                    {isSignUp && !validEmail ? <Typography className={classes.wrongPass} variant='caption'>Email is not valid</Typography> : null}
                                    
                                </Grid>

                                <Grid item>
                                    <TextField onChange={handleChange} required name='password' className={classes.text} type='password' label='Password'/>
                                    {!isSignUp && wrongPassword ? <Typography className={classes.wrongPass} variant='caption'>Wrong Password</Typography> : null}
                                    {isSignUp && !passwordsLength ? <Typography className={classes.wrongPass} variant='caption'>Minimal 5 characters</Typography> : null}
                                </Grid>

                                { isSignUp && (
                                    <Grid item>
                                        <TextField onChange={handleChange} required name='confirmPassword' className={classes.text} type='password' label='Repeat Password' />
                                        {isSignUp && !passwordsMatch ? <Typography className={classes.wrongPass} variant='caption'>Passwords must match !</Typography> : null}
                                    </Grid>
                                )}

                            </Grid>

                            <Grid item className={classes.buttons}>
                                <Button className={classes.btn} fullWidth type='submit' variant='contained'>{isSignUp ? 'Sign Up' : 'Sign In'}</Button>
                            </Grid>

                            <Grid item className={classes.buttons}>
                                <Button fullWidth onClick={switchMode}>{isSignUp ? `Already have an account? Sign In` : `Don't have an account? Sign Up` }</Button>
                            </Grid>
                        </form>
                    </Grid>
                
                </Paper>
            </div>
    
        )
    }
    else {
        return(
            <Typography variant='h6' className={classes.redirection}>You are already logged in. Go to &nbsp; <Link className={classes.link} onClick={() => {navigate('/')}}>Home Page</Link></Typography>
        )
    }
}

export default Auth;

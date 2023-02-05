import React, { useState, useEffect, useRef } from 'react';
import { AppBar, Box, Toolbar, Typography, Button, Grid, Avatar, Popover } from '@mui/material';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import Notifications from '../notifications.js/notifications';


function Header({userUpdate}) {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const [openNotifications, setOpenNotifications] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);

  const containerRef = useRef();

  useEffect(() => {setUser(JSON.parse(localStorage.getItem('profile')))}, [userUpdate]);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
 

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/auth');
    setUser(null);
  } 

  const handleClose = () => {
    setOpenNotifications(false);
    setAnchorEl(null);
  };

  const notificationButtonClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenNotifications(true);
  }

  useEffect(() => {
    const token = user?.token;

    if(token) {
        const decodedToken = decode(token); 

        if(decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));

  }, [location]);

  return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar sx={{ bgcolor: '#34568B' }} position='static'>
            <Toolbar>
              
                <QuestionAnswerIcon style={{cursor: 'pointer'}} onClick={() => navigate('/')} sx={{ mr: 2 }} />
                <Typography style={{cursor: 'pointer', marginRight: 10}} onClick={() => navigate('/')} variant='h6' component='div'>Ask It</Typography>  
                
                <Grid sx={{ flexGrow: 1 }}>
                  {/*<Button style={{ marginLeft: 40 }} onClick={() => navigate('/questions')} color='inherit'>Questions</Button>*/}
                </Grid>

                {(() => {
                  if(user && location.pathname !== '/auth') { 
                    return (
                      <div>
                          <Grid spacing={2} container direction='row'>
                              <Grid item>
                                <CircleNotificationsIcon style={{cursor: 'pointer', marginTop: 5, width: 32, height: 32}} onClick={notificationButtonClick}/>
                              </Grid>


                              <Popover
                                open={openNotifications}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorReference='none'
                                container={containerRef.current}
                                style={{ marginTop: 70, marginRight: 40, display: 'flex', justifyContent: 'right' }}
                              >
                                <Notifications></Notifications>
                              </Popover>


                              <Grid style={{cursor: 'pointer'}} item>
                                  <Avatar onClick={() => navigate('/profile')} alt={user.first_name}>{user.first_name.charAt(0)}</Avatar>
                              </Grid>

                              <Grid item style={{marginTop: 8, maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis'}}>
                                  <Typography onClick={() => navigate('/profile')} style={{cursor: 'pointer'}} variant='body'>{user.first_name}</Typography>
                              </Grid>

                              <Grid item>
                                  <Button color='inherit' onClick={logout}>Logout</Button>
                              </Grid>
                              
                          </Grid>
                      </div>
                    )
                  }
                  else if(location.pathname === '/auth') { return null }
                  else if(!user) { return (<Button color='inherit' onClick={() => navigate('/auth')}>Login</Button>)}
                })()}

            </Toolbar>
        </AppBar>
    </Box>
  );
}

export default Header;

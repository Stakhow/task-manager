import React from 'react';
import { AppBar, Button, Toolbar, Typography, Box } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {logout} from "../../redux/auth";
import {showNotification} from "../../redux/notification";

const Header = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { isAuth, isAdmin } = useSelector(({ auth }) => auth);

  const logoutHandle = () => {
    dispatch(logout());
    dispatch(showNotification({
      message: 'Вы успешно разлогинились',
      severity: 'success',
      show: true,
    }));
  };

  return (
    <AppBar>
      <Toolbar>
        <Box display={'flex'} style={{ flexGrow: 1 }}>
          <Typography variant="h6">
            Task Manager
          </Typography>
          {
            isAdmin && <Typography variant="h6" color={"textPrimary"} style={{marginLeft: 10}}>
              Hello, Admin!)
            </Typography>
          }
        </Box>

        {!isAuth && pathname !== '/login' ?
          <Button
            color="inherit"
            variant="outlined"
            component={Link}
            to={"/login"}
          >
            Login
          </Button>
          :
          isAuth ?
          <Button
            color="inherit"
            variant="outlined"
            onClick={logoutHandle}
          >
            Logout
          </Button> : null
        }

        {pathname !== '/' && (
          <Button color="inherit" variant="outlined" component={Link} to={'/'}>
            Tasks
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;

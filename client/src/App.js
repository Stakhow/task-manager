import React from 'react';
import './App.css';
import { Container, Box, Checkbox, FormControlLabel } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Login from './components/Login';
import Tasks from './components/Tasks';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Header from './components/Header';
import CreateTask from './components/CreateTask';
import Notification from './components/Notification';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#e0e0e0',
    minHeight: '100vh',
  },
  list: {
    backgroundColor: theme.palette.background.paper,
  },
  footerBar: {
    backgroundColor: theme.palette.background.paper,
    height: 'auto',
    minHeight: 'auto',
    boxShadow: '0 -5px 5px #ccc',
  },
}));

function App() {
  const classes = useStyles();
  const AdminEditedHelper = withStyles(theme => ({
    root: {
      color: theme.palette.secondary.main,
      '&$checked': {
        color: theme.palette.secondary.main,
      },
    },
    checked: false,
    disabled: false,
  }))(props => <Checkbox color="default" {...props} />);

  return (
    <Box
      className={`App ${classes.root}`}
      flexGrow={1}
      display={'flex'}
      flexDirection={'column'}
    >
      <Router history={createBrowserHistory()}>
          <Header />
          <Switch>
            <Route exact path="/">
              <Container
                maxWidth="sm"
                style={{
                  paddingTop: 64,
                  paddingBottom: 30,
                  backgroundColor: '#fff',
                  flexGrow: 1,
                }}
              >
                <Tasks />
                <CreateTask />
              </Container>
              <footer className={classes.footerBar}>
                <Container maxWidth={false}>
                  <Box py={2}>
                    <FormControlLabel
                      control={<Checkbox readOnly checked={false} />}
                      label="- задача не выполнена;"
                    />
                    <FormControlLabel
                      control={<AdminEditedHelper readOnly={true} />}
                      label="- задача не выполнена, отредактирована админом;"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox readOnly color={'primary'} checked={true} />
                      }
                      label="- задача выполнена;"
                    />
                    <FormControlLabel
                      control={<Checkbox readOnly checked={true} />}
                      label="- задача отредактирована админом и выполнена;"
                    />
                  </Box>
                </Container>
              </footer>
            </Route>

            <Route path="/login" component={Login} />
          </Switch>
          <Notification />
      </Router>
    </Box>
  );
}

export default App;

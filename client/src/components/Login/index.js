import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField, Button, Paper, Box, Container } from '@material-ui/core';
import { login } from '../../redux/auth';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {showNotification} from "../../redux/notification";

const validationSchema = yup.object({
  username: yup
    .string('Введите имя')
    .required('Поле является обязательным для заполнения'),
  password: yup.string().required('Неверный логин или пароль'),
});

const Login = () => {
  const dispatch = useDispatch();
  const { isAuth, error, success, message } = useSelector(({ auth }) => auth);

  useEffect(() => {
    if (success) {
      dispatch(showNotification({
        message, severity: 'success'
      }))
    } else if (error) {
      dispatch(showNotification({
        message, severity: 'error'
      }))
    }

  }, [error, success, dispatch, message]);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      dispatch(login(values));
    },
  });

  return (
    <>
      {isAuth ? (
        <Redirect to="/" />
      ) : (
        <Container maxWidth={'sm'}>
          <Paper variant="outlined">
            <Box p={2}>
              <h2>Login</h2>
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  fullWidth
                  id="username"
                  name="username"
                  label="Username"
                  type="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.username && Boolean(formik.errors.username)
                  }
                  helperText={formik.touched.username && formik.errors.username}
                />
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />

                <Box mt={3}>
                  <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                  >
                    Submit
                  </Button>
                </Box>
              </form>
            </Box>
          </Paper>
        </Container>
      )}
    </>
  );
};

export default Login;

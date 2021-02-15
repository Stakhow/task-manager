import React from 'react';
import { useFormik } from 'formik';
import { TextField, Button, Paper, Box, Typography } from '@material-ui/core';
import { validationTaskSchema } from '../../utils';

const TaskForm = ({ isEdit, taskData, handler, title }) => {

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      text: '',
      ...taskData,
    },
    validationSchema: validationTaskSchema,
    onSubmit: (values, { resetForm }) => {
      handler(values);
      resetForm();
    },
  });

  return (
    <>
      <Paper variant="outlined">
        <Box p={2}>
          <Typography variant={'h5'} children={title} />
          <form onSubmit={formik.handleSubmit}>
            {isEdit ? (
              <TextField
                fullWidth
                id="text"
                name="text"
                label="Text"
                value={formik.values.text}
                onChange={formik.handleChange}
                error={formik.touched.text && Boolean(formik.errors.text)}
                helperText={formik.touched.text && formik.errors.text}
              />
            ) : (
              <>
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
                  id="email"
                  name="email"
                  label="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                  fullWidth
                  id="text"
                  name="text"
                  label="Text"
                  value={formik.values.text}
                  onChange={formik.handleChange}
                  error={formik.touched.text && Boolean(formik.errors.text)}
                  helperText={formik.touched.text && formik.errors.text}
                />
              </>
            )}

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
    </>
  );
};

export default TaskForm;

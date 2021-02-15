import React, { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  List,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '@material-ui/lab/Pagination';
import { getTasks, resetLoadStatus } from '../../redux/tasks';
import TaskItem from '../TaskItem';
import EditTask from '../EditTask';
import { editTask } from '../../redux/tasks';
import { showNotification } from '../../redux/notification';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const Tasks = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { isAdmin, token } = useSelector(({ auth }) => auth);

  const {
    tasks,
    loading,
    statuses,
    pages,
    error,
    success,
    message,
  } = useSelector(({ tasks }) => tasks);
  const [sort, setSort] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');
  const [page, setPage] = useState(1);

  const [edit, setEdit] = useState(false);
  const [editableTask, setEditableTask] = useState(null);

  useEffect(() => {
    dispatch(
      getTasks({
        sort_field: sort,
        sort_direction: sortDirection,
        page: page,
      }),
    );
  }, [dispatch, sort, sortDirection, page]);

  useEffect(() => {
    if (success) {
      dispatch(
        showNotification({
          message,
          severity: 'success',
          show: true,
        }),
      );
      setEdit(false);
    } else if (error) {
      dispatch(
        showNotification({
          message,
          severity: 'error',
          show: true,
        }),
      );
      setEdit(false);
    }

    dispatch(resetLoadStatus());
  }, [error, success, dispatch, message]);

  const handleSort = event => setSort(event.target.value);

  const handleSortDirection = event => setSortDirection(event.target.value);

  const handlePage = (_, page) => setPage(page);

  return (
    <>
      <FormControl className={classes.formControl} disabled={loading}>
        <InputLabel id="sort-by">Sort by</InputLabel>
        <Select
          labelId="sort-by"
          id="sort-by-select"
          value={sort}
          onChange={handleSort}
        >
          <MenuItem value={'id'}>Id</MenuItem>
          <MenuItem value={'username'}>Username</MenuItem>
          <MenuItem value={'email'}>Email</MenuItem>
          <MenuItem value={'status'}>Status</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={classes.formControl} disabled={loading}>
        <InputLabel id="sort-direction">Sort Direction</InputLabel>
        <Select
          labelId="sort-direction"
          id="sort-direction-select"
          value={sortDirection}
          onChange={handleSortDirection}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value={'asc'}>asc</MenuItem>
          <MenuItem value={'desc'}>desc</MenuItem>
        </Select>
      </FormControl>

      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          p={4}
          children={<CircularProgress size={50} />}
        />
      ) : tasks.length ? (
        <>
          <List component="nav" aria-label="secondary mailbox folders">
            {tasks.map(i => (
              <TaskItem
                key={i.id}
                data={i}
                isAdmin={isAdmin}
                statuses={statuses}
                sendUpdate={t => dispatch(editTask({ ...t, token }))}
                getEditableTask={t => {
                  setEdit(true);
                  setEditableTask({ ...t, token });
                }}
              />
            ))}
          </List>
          <Box
            py={2}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Pagination page={page} count={pages} onChange={handlePage} />
          </Box>

          <EditTask
            task={editableTask}
            show={edit}
            hide={() => setEdit(false)}
          />
        </>
      ) : (
        <Box my={3} display={'flex'} justifyContent={'center'}>
          <Typography variant={'h4'}>Not Found</Typography>
        </Box>
      )}
    </>
  );
};

export default Tasks;

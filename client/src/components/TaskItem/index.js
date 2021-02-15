import React, { useState } from 'react';
import {
  Box,
  Checkbox,
  IconButton,
  ListItem,
  Typography,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  listItem: {
    margin: '5px auto',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
}));

const TaskItem = ({ data, isAdmin, getEditableTask, statuses, sendUpdate }) => {
  const status = data.status;
  const { undone, done, undoneEdited, doneEdited } = statuses;
  const isChecked = status === done || status === doneEdited;

  const classes = useStyles();
  const [checked, setChecked] = useState(isChecked);
  const [edit, setEdit] = useState(false);

  const CheckBox = withStyles(theme => {
    const color =
      status === doneEdited || status === undoneEdited
        ? theme.palette.secondary.main
        : status === done
        ? theme.palette.primary.main
        : theme.palette.text.secondary;

    return {
      root: {
        color: color,
        '&$disabled': {
          opacity: '0.5',
          color: color,
        },
      },
      disabled: {}
    };
  })(props => <Checkbox color="default" {...props} />);

  const handleEdit = () => {

    getEditableTask({...data, status: checked ? doneEdited : undoneEdited});
    setEdit(!edit);
  };

  const handleChange = e => {
    setChecked(!checked);

    let statusVal = '';



    if (status === doneEdited || status === undoneEdited) {
      statusVal = e.target.checked ? doneEdited : undoneEdited;
    } else {
      statusVal = e.target.checked ? done : undone;
    }

    sendUpdate({
      ...data,
      status: statusVal,
    });
  };

  return (
    <ListItem key={data.id} button={isAdmin} className={classes.listItem}>
      <Box flexGrow={1}>
        <Typography variant={'body1'}>
          <b>Username</b>: {data.username}
        </Typography>
        <Typography variant={'body1'}>
          <b>Email</b>: {data.email}
        </Typography>
        <Typography variant={'body1'}>
          <b>Text</b>: {data.text}
        </Typography>
      </Box>
      <CheckBox
        disabled={!isAdmin}
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />

      {isAdmin && (
        <IconButton aria-label="edit" onClick={handleEdit}>
          <EditIcon />
        </IconButton>
      )}
    </ListItem>
  );
};

export default TaskItem;

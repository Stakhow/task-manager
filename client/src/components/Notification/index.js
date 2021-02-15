import React, { useEffect, useState } from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { resetNotification } from './../../redux/notification';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Notification = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { message, severity, show } = useSelector(
    ({ notification }) => notification,
  );

  useEffect(() => {
    setOpen(show);
  }, [show]);

  const closeHandler = () => {
    setOpen(false);
    dispatch(resetNotification());
  };

  return (
    <>
      {open && (
        <Snackbar open={open} autoHideDuration={5000} onClose={closeHandler}>
          <Alert severity={severity}>{message}</Alert>
        </Snackbar>
      )}
    </>
  );
};

export default Notification;

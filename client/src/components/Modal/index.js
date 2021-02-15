import React from 'react';
import { Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  modal: {
    position: 'absolute',
    width: 400,
    maxWidth: `calc(100% - 40px)`,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  },
}));

const ModalWindow = ({ data, show, closeModal }) => {
  const classes = useStyles();

  return (
    <Modal
      open={show}
      onClose={closeModal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={classes.modal}>{data}</div>
    </Modal>
  );
};

export default ModalWindow;

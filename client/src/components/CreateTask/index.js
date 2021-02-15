import React, { useEffect, useState } from 'react';
import { createTask } from '../../redux/tasks';
import ModalWindow from '../Modal';
import TaskForm from '../TaskForm';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch, useSelector } from 'react-redux';
import {showNotification} from "../../redux/notification";

const CreateTask = () => {
  const [showModal, setShowModal] = useState(false);
  const { error, success, message } = useSelector(({ tasks }) => tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      dispatch(showNotification({
        message,
        severity: 'success',
        show: true,
      }));
    } else if (error) {
      dispatch(showNotification({
        message,
        severity: 'error',
        show: true,
      }))
    }

  }, [error, success, dispatch, message]);


  return (
    <>
      <Fab
        color="secondary"
        aria-label="add"
        onClick={() => setShowModal(true)}
      >
        <AddIcon />
      </Fab>

      <ModalWindow
        data={
          <TaskForm
            title={'Create Task'}
            handler={v => {
              dispatch(createTask(v));
              setShowModal(false);
            }}
          />
        }
        show={showModal}
        closeModal={() => setShowModal(false)}
      />
    </>
  );
};

export default CreateTask;

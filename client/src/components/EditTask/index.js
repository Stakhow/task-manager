import React from 'react';
import { editTask } from '../../redux/tasks';
import ModalWindow from '../Modal';
import TaskForm from '../TaskForm';
import { useDispatch } from 'react-redux';

const EditTask = ({ task, show, hide }) => {
  const dispatch = useDispatch();

  return (
    <ModalWindow
      data={
        <TaskForm
          isEdit={true}
          taskData={task}
          title="Edit Task"
          handler={v => dispatch(editTask(v))}
        />
      }
      show={show}
      closeModal={hide}
    />
  );
};

export default EditTask;

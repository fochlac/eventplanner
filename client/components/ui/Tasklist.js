import React from 'react';
import { connect } from 'react-redux';
import Tasklist from './tasklist/Tasklist.jsx';
import {} from '../actions.js';

const mapStateToProps = (state, ownProps) => {
    const task = state.tasks[ownProps.taskId],
      taskFiles = task.files.map(id => state.files[id]),
      taskSubtasks = task.tasks.map(id => state.tasks[id]),
      taskPolls = task.polls.map(id => state.polls[id]).filter(poll => poll.active),
      taskDataAvailabe = taskFiles.length + taskSubtasks.length + taskPolls.length;

    return {
        files: taskFiles,
        polls: taskPolls,
        task: task,
        subtasks: taskSubtasks,
        userId: state.user.id,
        render: taskDataAvailabe
    };
};

export default connect(mapStateToProps, {})(Tasklist);
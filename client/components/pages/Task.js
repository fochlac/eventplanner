import React from 'react';
import { connect } from 'react-redux';
import Task from './task/Task.jsx';
import {markItemsSeen} from '../actions.js';

const mapStateToProps = (state, ownProps) => {

    return {
        id: ownProps.id,
        tasks: state.tasks,
        notifications: state.notifications,
        polls: state.polls,
        files: state.files,
        userId: state.user.id
    }
};

export default connect(mapStateToProps, {markItemsSeen})(Task);
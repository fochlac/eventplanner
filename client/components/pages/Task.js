import React from 'react';
import { connect } from 'react-redux';
import Task from './task/Task.jsx';
import {markItemsSeen} from '../actions.js';

const mapStateToProps = (state, ownProps) => {
    const task = state.tasks[ownProps.id],
      newOnly = ownProps.filters && ownProps.filters.includes('new'),
      typeFilters = ownProps.filters.filter(filter => (filter !== 'new')),
      filteredItems = (task && task.items) ? task.items.filter(item => {
        if (newOnly && !state[item.type + 's'][item.id].virgin) {
          return false;
        }
        if (typeFilters.length && !typeFilters.includes(item.type + 's')) {
          return false;
        }
        if (item.type === 'notification') {
          return false;
        }
        return true;
      }) : [];

    return {
        id: ownProps.id,
        tasks: state.tasks,
        items: filteredItems
    }
};

export default connect(mapStateToProps, {markItemsSeen})(Task);


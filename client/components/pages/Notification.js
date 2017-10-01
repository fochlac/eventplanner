import React from 'react';
import { connect } from 'react-redux';
import Notification from './notification/Notification.jsx';
import {markItemsSeen} from '../actions.js';

const mapStateToProps = (state, ownProps) => {
    return {
        id: ownProps.id,
        notifications: state.notifications
    }
};

export default connect(mapStateToProps, {markItemsSeen})(Notification);
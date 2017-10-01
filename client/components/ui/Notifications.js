import React from 'react';
import { connect } from 'react-redux';
import Notifications from './notifications/Notifications.jsx';
import {hideNotification} from '../actions.js';

const mapStateToProps = (state, ownProps) => {

    return {
        notificationIds: ownProps.notes.filter(id => state.notifications[id].active),
        notifications: ownProps.notes.map(id => state.notifications[id]).filter(notification => notification.active)
    };
}

export default connect(mapStateToProps, {hideNotification})(Notifications);
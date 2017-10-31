import React from 'react';
import { connect } from 'react-redux';
import ParticipationBar from './participationBar/ParticipationBar.jsx';
import {} from '../actions.js';

const mapStateToProps = (state, ownProps) => {
    const event = state.events[ownProps.eventId];

    return {
        userState: (event.participating.includes(state.user.id) ? 1
            : event.interested.includes(state.user.id) ? 2
            : event.invited.includes(state.user.id) ? 3
            : event.applicant.includes(state.user.id) ? 4
            : 5)
    };
};

export default connect(mapStateToProps, {})(ParticipationBar);
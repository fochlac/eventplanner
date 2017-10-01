import React from 'react';
import { connect } from 'react-redux';
import ParticipationBar from './participationBar/ParticipationBar.jsx';
import {} from '../actions.js';

const mapStateToProps = (state, ownProps) => {
    const event = state.events[ownProps.eventId];

    return {
        userState: (event.participating.includes(this.props.userId) ? 1 
            : event.interested.includes(this.props.userId) ? 2
            : event.invited.includes(this.props.userId) ? 3
            : event.applicant.includes(this.props.userId) ? 4)
    };
};

export default connect(mapStateToProps, {})(ParticipationBar);
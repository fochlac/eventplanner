import React from 'react';
import { connect } from 'react-redux';
import Poll from './poll/Poll.jsx';
import {addVotes, editVotes, showPollResults, addPollOption, deletePollOption, loadPoll} from '../actions.js';

const mapStateToProps = (state, ownProps) => {
    return {
        poll: state.polls[ownProps.id],
        pollId: ownProps.id,
        users: state.users,
        user: state.user,
        voted: (state.polls[ownProps.id] ? state.polls[ownProps.id].users.includes(state.user.id) : false),
        voteCount: (state.polls[ownProps.id] ? state.polls[ownProps.id].users.length : 0)
    };
}

export default connect(mapStateToProps, {addVotes, editVotes, showPollResults, addPollOption, deletePollOption, loadPoll})(Poll);
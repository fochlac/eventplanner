import React from 'react';
import { connect } from 'react-redux';
import Poll from './poll/Poll.jsx';
import {markItemsSeen} from '../actions.js';

const mapStateToProps = (state, ownProps) => {
    return {
        id: ownProps.id,
        polls: state.polls
    }
};

export default connect(mapStateToProps, {markItemsSeen})(Poll);
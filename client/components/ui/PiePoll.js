import React from 'react';
import { connect } from 'react-redux';
import PiePoll from './piePoll/PiePoll.jsx';

const mapStateToProps = (state, ownProps) => {

    return {
        poll: state.polls[ownProps.id]
    };
}

export default connect(mapStateToProps, {})(PiePoll);
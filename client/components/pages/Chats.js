
import React from 'react';
import { connect } from 'react-redux';
import Chats from './chats/Chats.jsx';
import {markItemsSeen} from '../actions.js';

const mapStateToProps = (state, ownProps) => {
    return {
        chats: state.chats,
        currentChat: ownProps.id
    }
};

export default connect(mapStateToProps, {markItemsSeen})(Chats);
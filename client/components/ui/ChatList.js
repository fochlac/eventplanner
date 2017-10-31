import React from 'react';
import { connect } from 'react-redux';
import ChatList from './chatlist/ChatList.jsx';
import {} from '../actions.js';

const mapStateToProps = (state, ownProps) => {
    return {
    	self: state.user.id,
        chats: state.chats,
        users: state.users
    };
}

export default connect(mapStateToProps, {})(ChatList);
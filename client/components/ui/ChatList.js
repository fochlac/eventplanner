import React from 'react';
import { connect } from 'react-redux';
import ChatList from './chatlist/ChatList.jsx';
import {} from '../actions.js';

const mapStateToProps = (state, ownProps) => {
    return {
    	self: state.user.id,
        chats: state.chats.map(chat => (chat.parent ? Object.assign({}, chat, {name: state[chat.parent.type + 's'][chat.parent.id].name}) : chat)),
        users: state.users
    };
}

export default connect(mapStateToProps, {})(ChatList);
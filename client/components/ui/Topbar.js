import React from 'react';
import { connect } from 'react-redux';
import Topbar from './topbar/Topbar.jsx';
import {} from '../actions.js';

const mapStateToProps = (state, ownProps) => ({
  user: state.users[state.user.id],
  newItems: state.items.filter(item => item.virgin).length,
  newMessages: state.messages.filter(message => message.virgin).length
});

export default connect(mapStateToProps, {})(Topbar);
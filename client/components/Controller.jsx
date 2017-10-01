import React from 'react';
import { connect } from 'react-redux';
import App from './root/AppRoot.jsx';

const mapStateToProps = (state, ownProps) => ({
  login: state.user.login,
  user: state.users[state.user.id]
});

export default connect(mapStateToProps, {})(App);
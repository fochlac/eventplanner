import React from 'react';
import { connect } from 'react-redux';
import Dashboard from './dashboard/Dashboard.jsx';
import {markItemsSeen} from '../actions.js';

const mapStateToProps = (state, ownProps) => ({
  options: state
});

export default connect(mapStateToProps, {markItemsSeen})(Dashboard);
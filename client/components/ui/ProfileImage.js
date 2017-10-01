import React from 'react';
import { connect } from 'react-redux';
import ProfileImage from './profileImage/ProfileImage.jsx';

const mapStateToProps = (state, ownProps) => {

    return {
        user: state.users[ownProps.id ? ownProps.id : state.user.id]
    };
}

export default connect(mapStateToProps, {})(ProfileImage);
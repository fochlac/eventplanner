import React from 'react';
import { connect } from 'react-redux';
import Post from './post/Post.jsx';
import {loadMoreComments, hidePost, newComment} from '../actions.js';

const mapStateToProps = (state, ownProps) => {
    const item = state[ownProps.type + 's'][ownProps.id]

    if (!item) {
        console.log(`Error loading post of type ${ownProps.type} with id ${ownProps.id}.`)
        return {
            error: true
        };
    }

    return {
        post: item,
        comments: state.comments,
        notifications: state.notifications,
        files: state.files,
        polls: state.polls,
        tasks: state.tasks,
        children: ownProps.children,
        users: state.users,
        user: state.user,
        type: ownProps.type,
        id: ownProps.id,
        additionalOptions: ownProps.options ? ownProps.options : {}
    };
}

export default connect(mapStateToProps, {loadMoreComments, hidePost, newComment})(Post);
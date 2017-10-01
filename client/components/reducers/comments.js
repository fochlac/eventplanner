const comments = (state = {}, action) => {
    switch (action.type) {
        case 'CREATED_COMMENT':
            return {...state,
                [action.commentId]: {
                    user: action.user,
                    content: action.content
                }
            };

        default:
            return state
    }
}

export default comments;
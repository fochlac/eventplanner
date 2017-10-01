const polls = (state = [], action) => {
    switch (action.type) {
        case 'CREATED_COMMENT':
            if (action.itemType === 'file')

            return Object.assign(
                {},
                state,
                {
                    [action.itemId]: {
                        ...state[action.itemId],
                        commentCount: state[action.itemId].commentCount + 1,
                        comments: [action.commentId, ...state[action.itemId].comments]
                    }
                }
            );
        default:
            return state
    }
}

export default polls;
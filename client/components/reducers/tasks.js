const tasks = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_TASK':
            const tasklist = Array.isArray(action.tasks) ? action.tasks : [action.tasks];
            return Object.assign(
                {},
                state,
                action.tasks.reduce((acc, task) => acc[task.id] = {
                    warning: task.warning,
                    deadline: task.deadline,
                    message: task.message,
                    event: task.event,
                    comments: task.comment,
                    completed: false
                })
            );

        case 'CREATED_COMMENT':
            if (action.itemType === 'task')

            return Object.assign(
                {},
                state,
                {[action.itemId]: {...state[action.itemId], commentCount: state[action.itemId].commentCount + 1, comments: [action.commentId, ...state[action.itemId].comments]}}
            );

        case 'TASK_COMPLETE':
            return {...state, [action.id]: {...state[action.id], completed: true}};

        default:
            return state;
    }
}

export default tasks
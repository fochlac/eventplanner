const messages = (state = [], action) => {
    switch (action.type) {
        case 'ADD_MESSAGE':
            return [
                ...state,
                {
                    sender: action.sender,
                    timestamp: action.timestamp,
                    message: action.message,
                    media: action.media,
                    virgin: action.virgin ? action.virgin : true
                }
            ];

        case 'MESSAGES_SEEN':
            return state.map(message =>
                (action.sender === undefined || message.sender === action.sender)
                ? {...message, virgin: false}
                : message
            );

        default:
            return state
    }
}

export default messages
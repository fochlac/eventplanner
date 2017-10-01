const items = (state = [], action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            return [
                ...state,
                {
                    id: action.id,
                    type: action.itemType,
                    virgin: action.virgin ? action.virgin : true
                }
            ];

        case 'ITEMS_SEEN':
            return state.map(item => ({...item, virgin: false}));

        default:
            return state
    }
}

export default items
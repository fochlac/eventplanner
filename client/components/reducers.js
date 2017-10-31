import { combineReducers } from 'redux';
import chats from './reducers/chats.js';
import items from './reducers/items.js';
import events from './reducers/events.js';
import user from './reducers/user.js';
import tasks from './reducers/tasks.js';
import users from './reducers/users.js';
import comments from './reducers/comments.js';
import files from './reducers/files.js';
import polls from './reducers/polls.js';
import notifications from './reducers/notifications.js';

const reducers = combineReducers({
    chats,
    items,
    events,
    user,
    tasks,
    users,
    comments,
    files,
	notifications,
	polls
});

export default reducers;
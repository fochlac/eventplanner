import {Api} from './root/Api.js';

export const addItem = item => ({
  type: 'ADD_ITEM',
  id: item.id,
  itemType: item.type,
  virgin: item.virgin
});

export const markItemsSeen = () => ({
  type: 'ITEMS_SEEN',
});

export const addMessage = message => ({
  type: 'ADD_MESSAGE',
  virgin: item.virgin
});

export const markMessagesSeen = () => ({
  type: 'MESSAGES_SEEN',
});

export const login = () => ({
  type: 'LOGIN',
});

export const logout = () => ({
  type: 'LOGOUT',
});

export const completeTask = id => ({
  type: 'TASK_COMPLETE',
  id
});

export const createdComment = (props, id) => ({
  type: 'CREATED_COMMENT',
  itemId: props.id,
  itemType: props.type,
  commentId: id,
  content: props.comment.content,
  user: props.comment.user
});

export const addVotes = (props, id) => ({
  type: 'ADD_VOTES',
  user: props.comment.user
});

export const editVotes = (props, id) => ({
  type: 'EDIT_VOTES',
  user: props.comment.user
});

export const showPollResults = (props, id) => ({
  type: 'SHOW_POLL_RESULTS',
  user: props.comment.user
});

export const addPollOption = (props, id) => ({
  type: 'ADD_POLL_OPTION',
  user: props.comment.user
});

export const deletePollOption = (props, id) => ({
  type: 'DELETE_POLL_OPTION',
  user: user
});

export const loadPoll = (props, id) => ({
  type: 'LOAD_POLL',
  user: user
});

export const createComment = props => ({
  type: 'CREATE_COMMENT',
  itemId: props.id,
  itemType: props.type
});

export const hideNotification = id => ({
  type: 'HIDE_NOTIFICATION',
  id
});

export const newComment = props => {
    return dispatch => {
        dispatch(createComment(props));

        return Api.createComment(props)
            .then(res => res.json(), err => console.log(err))
            .then(json => dispatch(createdComment(props, json.id)))
    };
};

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers.js';

export function configureStore(initialState = {}) {
  const store = createStore(
    reducers,
    initialState,
    applyMiddleware(thunkMiddleware)
  )
  return store;
};

let now = Date.now(),
    day = 3600000 * 24,
    tomorrow = now + day,
    tomorrow2 = now + day * 2,
    tomorrow3 = now + day * 3,
    yesterday = now - day;

export const store = configureStore({
    user: {
        login: true,
        id: 0
    },
    items: [
        {
            id: 0,
            type: 'task',
            virgin: false
        },{
            id: 0,
            type: 'poll',
            virgin: false
        },{
            id: 1,
            type: 'poll',
            virgin: true
        },{
            id: 1,
            type: 'task',
            virgin: true
        },{
            id: 0,
            type: 'file',
            virgin: true
        },{
            id: 1,
            type: 'file',
            virgin: true
        },{
            id: 1,
            type: 'notification',
            virgin: true
        }
    ],
    chats: [
        {
            id: 0,
            users: [0,1],
            name: undefined,
            virgin: true,
            messages: [{
                user: 2,
                timestamp: 1504111317669,
                message: 'Ask Bilbo about "The Ring"! It rocks...',
                virgin: false
            }, {
                user: 0,
                timestamp: 1504131312669,
                message: 'Chillin in Rivendell *DealWithIt*',
                virgin: true
            }],
            parent: undefined
        },{
            id: 1,
            users: [0,2],
            name: 'Defeat Sauron',
            virgin: true,
            messages: [{
                user: 2,
                timestamp: 1504131317669,
                message: 'Run! You fools ...',
                virgin: true
            },{
                user: 2,
                timestamp: 1504131317669,
                message: 'Look, daddy`s back. And hes got a level up!',
                virgin: true
            }],
            parent: {type: 'event', id: 0}
        },{
            id: 2,
            users: [0,2],
            name: 'Get to Rivendell',
            virgin: false,
            messages: [{
                user: 0,
                timestamp: 1504131112669,
                message: 'BRING THE RING!!!!',
                virgin: false
            }, {
                user: 0,
                timestamp: 1504131012669,
                message: 'Cant wait to see you in Rivendell *#MissingYou#*',
                virgin: false
            }],
            parent: {type: 'task', id: 0}
        }
    ],
    events: {
        0: {
            id: 0,
            name: 'Defeat Sauron',
            description: 'Duh, we will think of something. We might just take some eagles and fly over to morder. Or we could use a giant catapult. Or we just use the ring ourselves. Whatever, we will find a way. Or not.',
            subtitle: 'Well, destroy his ring...',
            headerImage: '/static/images/test2.jpg',
            tasks: [0, 1],
            notifications: [],
            comments: [],
            participating: [],
            interested: [],
            applicant: [],
            invited: [0, 1, 2],
            warning: now,
            date: {
                start: tomorrow,
                end: tomorrow2
            },
            creation: yesterday,
            polls: [0],
            files: []
        }
    },
    tasks: {
        0: {
            id: 0,
            warning: now,
            deadline: tomorrow2,
            creation: yesterday,
            name: 'Get to Rivendell.',
            description: 'Get to Rivendell. Meet Elrond, talk to Humans, Elves and Dwarves and decide about what to do about the damned ring.',
            event: 0,
            completed: false,
            comments: [0],
            commentCount: 1,
            virgin: true,
            files: [0, 1],
            polls: [1],
            tasks: [2],
            notifications: [1],
            items: [
                {
                    id: 2,
                    type: 'task'
                },{
                    id: 2,
                    type: 'poll'
                },{
                    id: 1,
                    type: 'notification'
                },{
                    id: 1,
                    type: 'file'
                },{
                    id: 0,
                    type: 'file'
                }
            ]
        },
        1: {
            id: 1,
            event: 0,
            warning: yesterday,
            deadline: now,
            creation: yesterday,
            name: 'Throw the Ring into Mount Doom.',
            description: 'Walk to the east across the mountains, follow the river, sneak past ork armies and break the black gate. Finally climb onto Mount Doom and destroy the damned Ring.',
            completed: false,
            comments: [],
            commentCount: 0,
            virgin: true,
            files: [],
            polls: [],
            tasks: [],
            notifications: []
        },
        2: {
            id: 2,
            event: 0,
            warning: tomorrow2,
            deadline: tomorrow3,
            creation: yesterday,
            name: 'Sneak into Bree.',
            description: 'Human city west of the Shire. Traditionally a place to rest weary feets, be wary of trolls.',
            completed: false,
            comments: [],
            commentCount: 0,
            virgin: true,
            files: [],
            polls: [2],
            tasks: [],
            notifications: []
        }
    },
    users: {
        0: {
            id: 0,
            name: 'Frodo',
            comments: [],
            creation: yesterday,
            events: [0],
            profileImage: '/static/images/frodo.jpg'
        },
        1: {
            id: 1,
            name: 'Bilbo',
            comments: [0],
            creation: yesterday,
            events: [0],
            profileImage: '/static/images/bilbo.jpg'
        },
        2: {
            id: 2,
            name: 'Gandalf',
            comments: [],
            creation: yesterday,
            events: [0],
            profileImage: '/static/images/gandalf.jpg'
        }
    },
    files: {
        0: {
            id: 0,
            name: 'Karte Auenland',
            description: 'Eine detailierte Karte des Auenlands. Gezeichnet von Samweis Gamdschie.',
            comments: [],
            url: 'https://www.fochlac.com/files/map.jpg',
            commentCount: 0,
            event: 0,
            creation: yesterday,
            virgin: true
        },
        1: {
            id: 1,
            name: 'Einladung',
            description: 'Eine Einladung zu Bilbo und Frodo Beutlins Geburtstagsfeier.',
            comments: [],
            url: 'https://www.fochlac.com/files/map.jpg',
            commentCount: 0,
            event: 0,
            creation: yesterday,
            virgin: true
        }
    },
    notifications: {
        1: {
            id: 1,
            description: 'Achtung, schwarze Reiter gesichtet, bitte vorsichtig reisen!',
            comments: [],
            commentCount: 0,
            event: 0,
            warning: yesterday,
            deadline: now,
            creation: yesterday,
            virgin: true,
            active: true
        }
    },
    comments:{
        0: {
            id: 0,
            user: 1,
            content: 'BRING THE RING!!! MYYY PRECIOUS...',
            creation: yesterday,
            virgin: true
        }
    },
    polls: {
        0: {
            id: 0,
            name: 'Who do we take along?',
            description: 'Who do we want to send to mordor?',
            event: 0,
            options: [{
                name: 'Gandalf',
                users: [1,2]
            }, {
                name: 'Elrond',
                users: []
            }, {
                name: 'Legolas',
                users: [1]
            }, {
                name: 'Gimli',
                users: [2]
            }, {
                name: 'Frodo',
                users: [2, 1]
            }],
            comments: [0],
            commentCount: 1,
            virgin: true,
            active: true,
            multiple: true,
            showResults: true,
            allowEditResults: true,
            users: [1,2],
            creation: yesterday,
            warning: now,
            deadline: tomorrow3
        },
        1: {
            id: 1,
            name: 'How do we get there?',
            event: 0,
            options: [{
                name: 'Using Eagles',
                users: [1,2]
            }, {
                name: 'Walking',
                users: []
            }],
            comments: [],
            commentCount: 0,
            virgin: true,
            active: true,
            multiple: false,
            showResults: false,
            allowDisplayResults: true,
            allowEditResults: false,
            users: [1,2],
            creation: yesterday,
            warning: tomorrow,
            deadline: tomorrow2
        },
        2: {
            id: 2,
            name: 'How do we get there?',
            description: 'How do we want to go to Bree? We could use ponies or simply walk through mirkwood',
            event: 0,
            options: [{
                name: 'Using horses',
                users: [1,0]
            }],
            comments: [0],
            commentCount: 0,
            virgin: true,
            active: true,
            multiple: false,
            showResults: false,
            allowDisplayResults: true,
            allowEditResults: false,
            users: [1,0,2],
            creation: yesterday,
            warning: tomorrow,
            deadline: tomorrow2
        }
    }
});
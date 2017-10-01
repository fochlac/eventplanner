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
    messages: [
        {
            sender: 'Gandalf',
            timestamp: 1504131317669,
            message: 'Run! You fools ...',
            virgin: true
        },{
            sender: 'Gandalf',
            timestamp: 1504111317669,
            message: 'Ask Bilbo about "The Ring"! It rocks...',
            virgin: false
        }, {
            sender: 'Frodo',
            timestamp: 1504131312669,
            message: 'Chillin in Rivendell *DealWithIt*',
            media: '/images/1231234/chillin.jpg',
            virgin: true
        }, {
            sender: 'Frodo',
            timestamp: 1504131112669,
            message: 'BRING THE RING!!!!',
            media: '/images/1231234/chillin.jpg',
            virgin: false
        }, {
            sender: 'Frodo',
            timestamp: 1504131012669,
            message: 'Cant wait to see you in Rivendell *MissingYou*',
            media: '/images/1231234/chillin.jpg',
            virgin: false
        }
    ],
    events: {
        0: {
            id: 0,
            name: 'Defeat Sauron',
            tasks: [0, 1],
            notes: [],
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
            polls: []
        }
    },
    tasks: {
        0: {
            id: 0,
            warning: now,
            deadline: tomorrow2,
            creation: yesterday,
            shortDescription: 'Get to Rivendell.',
            description: 'Get to Rivendell. Meet Elrond, talk to Humans, Elves and Dwarves and decide about what to do about the damned ring.',
            event: 0,
            completed: false,
            comments: [0],
            commentCount: 1,
            virgin: true,
            files: [0, 1],
            polls: [2],
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
            shortDescription: 'Throw the Ring into Mount Doom.',
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
            shortDescription: 'Sneak into Bree.',
            description: 'Human city west of the Shire. Traditionally a place to rest weary feets, be wary of trolls.',
            completed: false,
            comments: [],
            commentCount: 0,
            virgin: true,
            files: [],
            polls: [],
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
            events: [0]
        },
        1: {
            id: 1,
            name: 'Bilbo',
            comments: [],
            creation: yesterday,
            events: [0]
        },
        2: {
            id: 2,
            name: 'Gandalf',
            comments: [],
            creation: yesterday,
            events: [0]
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
            title: 'Who do we take along?',
            description: 'Who do we want to send to mordor?',
            event: 0,
            options: [{
                title: 'Gandalf',
                users: [1,2]
            }, {
                title: 'Elrond',
                users: []
            }, {
                title: 'Legolas',
                users: [1]
            }, {
                title: 'Gimli',
                users: [2]
            }, {
                title: 'Frodo',
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
            title: 'How do we get there?',
            event: 0,
            options: [{
                title: 'Using Eagles',
                users: [1,2]
            }, {
                title: 'Walking',
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
            title: 'How do we get there?',
            description: 'How do we want to go to Bree? We could use ponies or simply walk through mirkwood',
            event: 0,
            options: [{
                title: 'Using horses',
                users: [1,0]
            }, {
                title: 'Walking',
                users: [1]
            }],
            comments: [0],
            commentCount: 0,
            virgin: true,
            active: true,
            multiple: false,
            showResults: false,
            allowDisplayResults: true,
            allowEditResults: false,
            users: [1,0],
            creation: yesterday,
            warning: tomorrow,
            deadline: tomorrow2
        }
    }
});
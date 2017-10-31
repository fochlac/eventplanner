import React from 'react';
import { Link } from 'react-router-dom';
import ProfileImage from '../ProfileImage.js';
import {formatTimeShort} from '../../scripts/date.js';
import './chatlist.less';

export default class ChatList extends React.Component {
    constructor(props) {
        super();
    }

    renderImage(chat) {
        const chatUsers = chat.users.filter(user => user !== this.props.self);
        
        return (<div className={'image' + ((chatUsers.length === 1) ? '' : ' multiple')}>
                {
                    (chatUsers.length === 1) 
                    ? <ProfileImage id={chatUsers[0]} /> 
                    : chatUsers.slice(0,4).map(userid => <ProfileImage id={userid} key={userid}/>)
                }
            </div>);
    }

    render() {
        const chats = this.props.chats,
            users = this.props.users;

        return (
            <ul className="chatList">
                {
                    chats.map(chat => {
                        let userlist = chat.users.filter(id => id !== this.props.self).map(id => users[id].name).join(',\n');

                        return (<Link to={'/chat/' + chat.id} key={chat.id} ><li className="fa">
                            {this.renderImage(chat)}
                            <div className="content">
                                {
                                    chat.parent
                                    ? <p className={'chattitle' + (chat.virgin ? ' virgin' : '')} title={userlist}>{chat.name}</p>
                                    : <p className={'chattitle' + (chat.virgin ? ' virgin' : '')} title={userlist}>{userlist}</p>
                                }
                                <p className="subtitle"><span className="time">{formatTimeShort(chat.messages[0].timestamp)}</span> {chat.messages[0].message}</p>
                            </div>
                        </li></Link>);
                    })
                }
            </ul>
        )
    }
}
import React from 'react';
import { Link } from 'react-router-dom';
import Message from './Message.jsx';
import './chat.less';

export default class Chat extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        const chat = this.props.chat;
        return (
            <div className="chat">
                <div className="chatbar">
                    <span>
                        {
                            chat.name 
                            ? chat.name 
                            : (chat.users.slice(0,3)
                                .filter(id => id !== this.props.user.id)
                                .map(id => this.props.users[id].name).join(', ') 
                            + ((chat.users.length > 3) ? ', ...' : ''))
                        }
                    </span>
                    <Link to="/chats">Zurück</Link>
                </div>
                {
                    chat.messages.reduce((acc, item, index) => {
                        if ( index > 0 && item.user === chat.messages[index-1].user && item.timestamp - chat.messages[index-1].timestamp < 15000) {
                            acc[acc.length - 1].push(item);
                        } else {
                            acc.push([item]);
                        }

                        return acc;
                    }, []).map((messageGroup, index) => 
                        <div key={'group' + index} className={'messageGroup' + ((messageGroup[0].user === this.props.user.id) ? ' own' : '')}>
                            {
                                messageGroup.map((message, index) => <Message key={'msg' + index} message={message} />)
                            }
                        </div>
                    )
                }
            </div>
        )
    }
}
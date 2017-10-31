import React from 'react';
import {Redirect} from 'react-router-dom';
import Chat from '../../ui/Chat.js';
import ChatList from '../../ui/ChatList.js';
import './chats.less';


export default class Chats extends React.Component {
    constructor(props) {
        super();
        this.state = {
            currentChat: props.currentChat
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            currentChat: nextProps.currentChat
        });
    }

    render() {
        const chat = this.props.chats[this.state.currentChat];

        return (
            <div className={chat ? 'chats detail' : 'chats'}>
                <div className="listFrame">
                    <ChatList />
                </div>
                <div className="chatFrame">
                    {
                        chat ? <Chat id={this.state.currentChat} /> : null
                    }
                </div>
            </div>
        );
    }
}
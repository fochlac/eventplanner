import React from 'react';
import { Link } from 'react-router-dom';
import ProfileImage from '../ProfileImage.js';
import './topbar.less';

export default class Topbar extends React.Component {
    constructor(props) {
        super();

        this.state = {
            showMenu: false
        }
    }

    toggleMenu(state) {
        this.setState({showMenu: (state !== undefined) ? state : !this.state.showMenu});
    }

    render() {
        const now = Date.now(),
            urgentEvents = 0;

        return (
            <div className="topbar">
                <Link to="/user" className="profile">
                <ProfileImage />
                </Link>
                <ul className="quicklinks">
                    <li>
                        <Link to="/calendar">
                            <span className="fa fa-2x fa-calendar" />
                        </Link>
                            {
                                urgentEvents
                                ? <span className="counter" >{urgentEvents}</span>
                                : null
                            }
                    </li>
                    <li>
                        <Link to="/">
                            <span className="fa fa-2x fa-exclamation-circle" />
                            {
                                this.props.newItems
                                ? <span className="counter" >{this.props.newItems}</span>
                                : null
                            }
                        </Link>
                    </li>
                    <li>
                        <Link to="/chats">
                            <span className="fa fa-2x fa-comments-o" />
                            {
                                this.props.newMessages
                                ? <span className="counter" >{this.props.newMessages}</span>
                                : null
                            }
                        </Link>
                    </li>
                </ul>
                <div className="verticalSpacer"></div>
                <span className="fa fa-2x fa-bars menu" onClick={() => this.toggleMenu()} />
                <ul className={'expanderMenu' + (this.state.showMenu ? '' : ' minimized')}>
                    <Link to="/createEvent">
                        <li className="menuItem">
                            <span className="fa fa-lg fa-plus"></span>
                            <span>Neues Event</span>
                        </li>
                    </Link>
                    <Link to="/settings">
                        <li className="menuItem">
                            <span className="fa fa-lg fa-cog"></span>
                            <span>Einstellungen</span>
                        </li>
                    </Link>
                    <Link to="/logout">
                        <li className="menuItem">
                            <span className="fa fa-lg fa-sign-out"></span>
                            <span>Abmelden</span>
                        </li>
                    </Link>
                </ul>
            </div>
        );
    }
}

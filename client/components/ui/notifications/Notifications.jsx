import React from 'react';
import { Link } from 'react-router-dom';
import './Notifications.less';

export default class Post extends React.Component {
    constructor(props) {
        super();

        this.state = {
        }
    }

    render() {
        const notification = this.props.notification;

        return (
            <ul className="notificationList">
                {this.props.notifications.map((notification, index) => {
                    const id = this.props.notificationIds[index];

                    return (<li className="notification" title={notification.description} key={id}>
                        <Link to={'/notification/' + id}>
                            <p>{notification.description}</p>
                        </Link>
                        <span className="fa fa-eye-slash actionCursor push-right" onClick={() => this.props.hideNotification(id)}></span>
                    </li>);                    
                })}
            </ul>
        );
    }
}
import React from 'react';
import { Link } from 'react-router-dom';
import Notifications from '../Notifications.js';

export default class Post extends React.Component {
    constructor(props) {
        super();

        this.state = {
        }
    }

    render() {
        return (
            <Link className="notification" to={'/notification/' + this.props.id}>
                <span className="fa fa-2x fa-exclamation-circle"></span>
                <div className="spacer"></div>
                <p>{this.props.notification.description}</p>
            </Link>
        );
    }
}
import React from 'react';
import { Link } from 'react-router-dom';
import ProfileImage from '../ProfileImage.js';
import {formatDateTime} from '../../scripts/date.js';

export default class Chat extends React.Component {
    constructor(props) {
        super();
    }

    render() {
    	const msg = this.props.message;

        return (
        	<div className="message">
        		<ProfileImage id={msg.user} />
        		<div className="content" title={formatDateTime(msg.timestamp)}>{msg.message}</div>
        	</div>
        )
    }
}
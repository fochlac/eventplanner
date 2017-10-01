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
        const file = this.props.file;

        return (
            <div className="file">
                <a className="fa-stack downloadIcon" href={file.url} download>
                    <i className="fa fa-file-text-o fa-stack-1x fa-lg"></i>
                    <i className="fa fa-download fa-stack-1x fa-lg"></i>
                </a>
                <div className="spacer"></div>
                <div className="fileInfo">
                    <h4>{file.name}</h4>
                    <p>{file.description}</p>
                </div>
            </div>
        );
    }
}
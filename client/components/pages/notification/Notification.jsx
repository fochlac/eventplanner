import React from 'react';
import {Redirect} from 'react-router-dom';
import Post from '../../ui/Post.js';


export default class Notification extends React.Component {
    constructor(props) {
        super();
    }


    render() {
        if (!this.props.notifications[this.props.id]) {
            return  <Redirect to="/"/>;
        }

        return (
            <div className="dashboard">
                <Post id={this.props.id} type="notification" options={{maxComments: 50}} />
            </div>
        );
    }
}
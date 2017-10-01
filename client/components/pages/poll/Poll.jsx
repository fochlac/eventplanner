import React from 'react';
import {Redirect} from 'react-router-dom';
import Post from '../../ui/Post.js';
import PollElement from '../../ui/Poll.js';


export default class Poll extends React.Component {
    constructor(props) {
        super();
    }


    render() {
        if (!this.props.polls[this.props.id]) {
            return  <Redirect to="/"/>;
        }

        return (
            <div className="dashboard">
                <Post id={this.props.id} type="poll" options={{maxComments: 50}}>
                    <PollElement id={this.props.id} />
                </Post>
            </div>
        );
    }
}
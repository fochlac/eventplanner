import React from 'react';
import { Link } from 'react-router-dom';
import './post.less';

export default class Post extends React.Component {
    constructor(props) {
        super();

        this.state = {
            maxComments: 2,
            input: ''
        }
    }

    handleInput(value) {
        this.setState({input: value});
    }

    submit() {
        if (!this.state.input.length) {
            return;
        }

        this.props.submit(this.state.input);
        this.setState({input: ''});
        this.textarea.value = '';
    }

    render() {
        return (
            <div className="addComment">
                <textarea className={this.state.input.length ? 'big' : ''} onChange={(evt) => this.handleInput(evt.target.value)} ref={(elem) => this.textarea = elem}></textarea>
                <button onClick={() => this.submit()}>Absenden</button>
            </div>
        )
    }
}
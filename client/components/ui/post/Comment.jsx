import React from 'react';
import { Link } from 'react-router-dom';
import './post.less';
import ProfileImage from '../ProfileImage.js';

export default class Post extends React.Component {
    constructor(props) {
        super();

        this.state = {
            showAll: false,
            contentMaxLength: 100
        }
    }

    showAll() {
        this.setState({showAll: true});
    }

    render() {
        let user;

        if (this.props.loading) {
            return (
                <div className="comment">
                    <span className="fa-stack">
                        <i className="fa fa-circle fa-stack-2x"></i>
                        <i className="fa fa-user fa-stack-1x fa-inverse"></i>
                    </span>
                    <div className="body">
                        <p>&#9868;&#9869;&#9868;&#9870;&#9868;&#9869;&#9871;&#9868;&#9870;&#9868;&#9869;&#9871;&#9868;&#9869;</p>
                        <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
                    </div>
                </div>
            );
        }

        return (
            <div className="comment">
                <Link className="profile" to={'/user/' + this.props.options.user}>
                    <ProfileImage id={this.props.options.user} />
                </Link>
                <div className="body">
                    <span>{this.props.options.content.slice(0, (this.state.showAll ? undefined : this.state.contentMaxLength))}</span>
                    {
                        (this.props.options.content.length > this.state.contentMaxLength && !this.state.showAll)
                        ? <a className="expander inline" onClick={() => this.showAll()}>Mehr ...</a>
                        : null
                    }
                </div>
            </div>
        )
    }
}
import React from 'react';
import { Link } from 'react-router-dom';
import Comment from './Comment.jsx';
import AddComment from './AddComment.jsx';
import Task from './Task.jsx';
import Notification from './Notification.jsx';
import File from './File.jsx';
import Poll from './Poll.jsx';
import Menu from './Menu.jsx';
import './post.less';

export default class Post extends React.Component {
    constructor(props) {
        super();

        if (!props.error) {
            this.state = {
                maxComments: props.additionalOptions.maxComments ? props.additionalOptions.maxComments : 2,
                showMenu: false
            }
        }
    }

    showMoreComments() {
        const post = this.props.post,
            comments = this.props.comments;

        if (post.commentCount > comments.length && comments.length < this.state.maxComments + 5) {
            this.props.loadMoreComments({id: post.id, type: post.type});
        }
        this.setState({maxComments: this.state.maxComments + 5});
    }

    render() {
        const post = this.props.post,
            menu = (this.props.additionalOptions && this.props.additionalOptions.menu) ? this.props.additionalOptions.menu : undefined;

        let body;

        if (this.props.error) {
            return null;
        }

        if (this.props.children) {
            body = this.props.children;
        } else {
            switch(this.props.type) {
                case 'task':
                    body = <Task task={post}
                    notifications={this.props.notifications}
                    files={this.props.files}
                    polls={this.props.polls}
                    tasks={this.props.tasks}
                    id={this.props.id} />;
                    break;
                case 'file':
                    body = <File file={post} />;
                    break;
                case 'poll':
                    body = <Poll id={this.props.id} poll={post} users={this.props.users} userId={this.props.user.id} />;
                    break;
                case 'notification':
                    body = <Notification notification={post} id={this.props.id}/>;
                    break;
            }
        }

        return (
            <div className="post" id={'post_' + this.props.type + this.props.id}>
                <div className="postHeader">
                    <h3 className="breadcrumb">
                        <Link to={'/event/' + post.event}>
                            {this.props.event.name}
                        </Link>
                        {
                            post.parent
                            ? <Link to={`/${post.parent.type}/${post.parent.id}`}>
                                {this.props[post.parent.type + 's'][post.parent.id].name}
                            </Link>
                            : null
                        }
                    </h3>
                    <Menu menu={menu} />
                </div>
                <div className="postBody">
                    {body}
                </div>
                <div className="postComments">
                    {post.comments.slice(0, this.state.maxComments).map(id => <Comment key={id} users={this.props.users} options={this.props.comments[id]} />)}
                    {
                        post.commentsLoading
                        ? <Comment loading={true} />
                        : null
                    }
                    {
                        (post.commentCount > this.state.maxComments)
                        ? <a className="expander" onClick={() => this.showMoreComments()}><span className="fa fa-caret-down"></span>Mehr</a>
                        : null
                    }
                    <AddComment submit={(comment) => this.props.newComment({id: this.props.id, type: this.props.type, comment: {user: this.props.user.id, content: comment}})} user={this.props.user} />
                </div>
            </div>
        )
    }
}
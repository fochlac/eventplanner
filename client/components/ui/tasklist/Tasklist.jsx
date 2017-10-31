import React from 'react';
import {Link} from 'react-router-dom';
import Notifications from '../Notifications.js';


export default class Tasklist extends React.Component {
  constructor(props) {
    super();
  }


  createLink(type, id, content) {
    const cb = this.props.callback
    if (cb && cb[type]) {
      return <h4 className="actionCursor" onClick={() => cb[type](id)}>{content}</h4>
    } else {
      return <Link to={'/' + type + '/' + id}><h4 className="actionCursor">{content}</h4></Link>
    }
  }

  render() {
    const task = this.props.task,
      now = Date.now();

    if (!this.props.render) {
      return  null;
    }

    return (
      <div className="taskData">
        {
          (task.notifications.length)
          ? <Notifications notes={task.notifications} />
          : null
        }
        <div>
          {this.props.subtasks.length
            ? <div className="taskElements">
              <ul className="taskElementsList">
                {this.props.subtasks.map((subtask, index) => (<li key={index} className="taskHead">
                  <i className="fa fa-clipboard"></i>
                  {this.createLink('task', subtask.id, subtask.name)}
                  <i className={(subtask.complete ? 'fa-check-square-o' : 'fa-square-o') + ' fa push-right'}></i>
                  <i className={(subtask.completed ? 'green' : (now > subtask.deadline) ? 'red' : (now > subtask.warning) ? 'yellow' : 'green') + ' fa fa-circle'}></i>
                </li>))}
              </ul>
            </div>
            : null}
          {this.props.files.length
            ? <div className="taskElements">
              <ul className="taskElementsList">
                {this.props.files.map((file, index) => (<li key={index} className="taskHead">
                  <i className="fa fa-file"></i>
                  {this.createLink('file', file.id, file.name)}
                  <a href={file.url} download className="push-right">
                    <i className="fa-download fa"></i>
                  </a>
                </li>))}
              </ul>
            </div>
            : null}
          {this.props.polls.length
            ? <div className="taskElements">
              <ul className="taskElementsList">
                {this.props.polls.map((poll, index) => (<li key={index} className="taskHead">
                  <i className="fa fa-pie-chart"></i>
                  {this.createLink('poll', poll.id, poll.name)}
                  <i className={(poll.users.includes(this.props.userId) ? 'fa-check' : 'fa-question') + ' fa push-right'}></i>
                </li>))}
              </ul>
            </div>
            : null}
        </div>
      </div>
    );
  }
}
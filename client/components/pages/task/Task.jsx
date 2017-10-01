import React from 'react';
import {Link} from 'react-router-dom';
import Post from '../../ui/Post.js';
import Notifications from '../../ui/Notifications.js';
import './Task.less';


export default class Task extends React.Component {
  constructor(props) {
    super();

    this.state = {
        detailForItem: undefined
    }
  }

  show(id) {
    document.getElementById(id).scrollIntoView();
  }

  menu() {
    return {
      items: [{
        name: 'Element hinzufügen',
        submenu: [
          {
            name: 'Aufgabe anlegen',
            action: () => this.createElement('task'),
            symbol: 'fa-clipboard'
          },{
            name: 'Umfrage anlegen',
            action: () => this.createElement('poll'),
            symbol: 'fa-pie-chart'
          },{
            name: 'Datei hinzufügen',
            action: () => this.createElement('file'),
            symbol: 'fa-file'
          },{
            name: 'Benachrichtigung hinzufügen',
            action: () => this.createElement('task'),
            symbol: 'fa-exclamation'
          }
        ]
      },{
        name: 'Aufgabe bearbeiten',
        action: () => this.editTask(),
        symbol: 'fa-pencil'
      },{
        name: 'Aufgabe zuweisen',
        action: () => this.assignTask()
      },{
        name: 'Aufgabe löschen',
        action: () => this.deleteTask(),
        symbol: 'fa-trash'
      }]
    };
  }

  render() {
    const task = this.props.tasks[this.props.id],
      newOnly = this.props.filters && this.props.filters.includes('new'),
      typeFilters = this.props.filters.filter(filter => (filter !== 'new')),
      filteredItems = (task && task.items) ? task.items.filter(item => {
        if (newOnly && !item.virgin) {
          return false;
        }
        if (typeFilters.length && !typeFilters.includes(item.type + 's')) {
          return false;
        }
        if (item.type === 'notification') {
          return false;
        }
        return true;
      }) : [],
      now = Date.now(),
      taskStatus = task.completed ? 'green' : (now > task.deadline) ? 'red' : (now > task.warning) ? 'yellow' : 'green',
      taskNotes = task.notifications.map(id => this.props.notifications[id]).filter(note => note.active),
      taskFiles = task.files.map(id => this.props.files[id]),
      taskSubtasks = task.tasks.map(id => this.props.tasks[id]),
      taskPolls = task.polls.map(id => this.props.polls[id]).filter(poll => poll.active),
      taskDataAvailabe = taskNotes.length + taskFiles.length + taskSubtasks.length + taskPolls.length,
      taskLink = '/task/' + this.props.id,
      subtasksCompleted = taskSubtasks.every(task => task.completed);

    if (!task) {
      return  <Redirect to="/"/>;
    }

    return (
      <div className="dashboard">
        <Post id={this.props.id} type="task" options={{maxComments: 5, menu: this.menu()}}>
          <div className="task full">
            <div className="taskHead">
              <h3>{task.shortDescription}</h3>
              <i className={(task.complete ? 'fa-check-square-o' : 'fa-square-o') + ' fa push-right'}></i>
              <i className={taskStatus + ' fa fa-circle'}></i>
            </div>
            {
              (task.description.length)
              ? <div className="taskDescription">
                {task.description}
              </div>
              : null
            }
            {
              (taskDataAvailabe)
              ? <div className="taskData">
                {
                  (taskNotes.length)
                  ? <Notifications notes={task.notifications} />
                  : null
                }
                <div className="">
                  {taskSubtasks.length
                    ? <div className="taskElements">
                      <ul className="taskElementsList">
                        {taskSubtasks.map((subtask, index) => (<li key={index} className="taskHead">
                          <i className="fa fa-clipboard"></i>
                          <h4 className="actionCursor" onClick={() => this.show('post_task' + subtask.id)}>{subtask.shortDescription}</h4>
                          <i className={(subtask.complete ? 'fa-check-square-o' : 'fa-square-o') + ' fa push-right'}></i>
                          <i className={(subtask.completed ? 'green' : (now > subtask.deadline) ? 'red' : (now > subtask.warning) ? 'yellow' : 'green') + ' fa fa-circle'}></i>
                        </li>))}
                      </ul>
                    </div>
                    : null}
                  {taskFiles.length
                    ? <div className="taskElements">
                      <ul className="taskElementsList">
                        {taskFiles.map((file, index) => (<li key={index} className="taskHead">
                          <i className="fa fa-file"></i>
                          <h4 className="actionCursor"  onClick={() => this.show('post_file' + file.id)}>{file.name}</h4>
                          <a href={file.url} download className="push-right">
                            <i className="fa-download fa"></i>
                          </a>
                        </li>))}
                      </ul>
                    </div>
                    : null}
                  {taskPolls.length
                    ? <div className="taskElements">
                      <ul className="taskElementsList">
                        {taskPolls.map((poll, index) => (<li key={index} className="taskHead actionCursor" onClick={() => this.show('post_poll' + poll.id)}>
                          <i className="fa fa-pie-chart"></i>
                          <h4>{poll.title}</h4>
                          <i className={(poll.users.includes(this.props.userId) ? 'fa-check' : 'fa-question') + ' fa push-right'}></i>
                        </li>))}
                      </ul>
                    </div>
                    : null}
                </div>
              </div>
              : null
            }

          </div>
        </Post>
        {filteredItems.map((item, index) => <Post key={index} id={item.id} type={item.type} />)}
      </div>
    );
  }
}
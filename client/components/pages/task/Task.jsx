import React from 'react';
import {Link} from 'react-router-dom';
import Post from '../../ui/Post.js';
import Notifications from '../../ui/Notifications.js';
import Tasklist from '../../ui/Tasklist.js';
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
      taskSubtasks = task.tasks.map(id => this.props.tasks[id]),
      taskLink = '/task/' + this.props.id,
      subtasksCompleted = taskSubtasks.every(task => task.completed),
      now = Date.now(),
      taskStatus = task.completed ? 'green' : (now > task.deadline) ? 'red' : (now > task.warning) ? 'yellow' : 'green';

    if (!task) {
      return  <Redirect to="/"/>;
    }

    return (
      <div className="dashboard">
        <Post id={this.props.id} type="task" options={{maxComments: 5, menu: this.menu()}}>
          <div className="task full">
            <div className="taskHead">
              <h3>{task.name}</h3>
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
            <Tasklist taskId={this.props.id} />
          </div>
        </Post>
        {this.props.items.map((item, index) => <Post key={index} id={item.id} type={item.type} />)}
      </div>
    );
  }
}
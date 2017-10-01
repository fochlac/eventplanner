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
        const task = this.props.task,
            now = Date.now(),
            taskStatus = task.completed ? 'green' : (now > task.deadline) ? 'red' : (now > task.warning) ? 'yellow' : 'green',
            taskNotes = task.notifications.map(id => this.props.notifications[id]).filter(note => note.active),
            taskFiles = task.files.map(id => this.props.files[id]),
            newFiles = taskFiles.filter(file => file.virgin),
            taskSubtasks = task.tasks.map(id => this.props.tasks[id]),
            newSubtasks = taskSubtasks.filter(task => task.virgin),
            taskPolls = task.polls.map(id => this.props.polls[id]).filter(poll => poll.active),
            newPolls = taskPolls.filter(poll => poll.virgin),
            taskDataAvailabe = taskNotes.length + taskFiles.length + taskSubtasks.length + taskPolls.length,
            taskLink = '/task/' + this.props.id;

        return (
            <div className="task">
                <div className="taskHead">
                    <Link to={'/task/' + this.props.id}><h3>{task.shortDescription}</h3></Link>
                    <i className={(task.complete ? 'fa-check-square-o' : 'fa-square-o') + ' fa push-right'}></i>
                    <i className={taskStatus + ' fa fa-circle'}></i>
                </div>
                {
                    (newFiles.length + newSubtasks.length + newPolls.length)
                    ? <ul className="newItemList">
                        <li className="newTag"><span className="fa fa-exclamation newIcon"></span>Neu:</li>
                        {newFiles.length ? <li className="item"><Link to={taskLink + '?filter=tasks&filter=new'}><span>{newFiles.length} Datei{newFiles.length > 1 ? 'n' : ''}</span></Link></li> : null}
                        {newSubtasks.length ? <li className="item"><Link to={taskLink + '?filter=files&filter=new'}><span>{newSubtasks.length} Aufgabe{newSubtasks.length > 1 ? 'n' : ''}</span></Link></li> : null}
                        {newPolls.length ? <li className="item"><Link to={taskLink + '?filter=polls&filter=new'}><span>{newPolls.length} Umfrage{newPolls.length > 1 ? 'n' : ''}</span></Link></li> : null}
                    </ul>
                    : null
                }
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
                        <ul className="taskInfo">
                            {taskSubtasks.length ? <li><Link to={taskLink + '?filter=tasks'}><span>Teilaufgaben:</span><span>{taskSubtasks.filter(task => task.completed).length + ' / ' + taskSubtasks.length}</span></Link></li> : null}
                            {taskFiles.length ? <li><Link to={taskLink + '?filter=files'}><span>Dateien:</span><span>{taskFiles.length}</span></Link></li> : null}
                            {taskPolls.length ? <li><Link to={taskLink + '?filter=polls'}><span>Aktive Umfragen:</span><span>{taskPolls.length}</span></Link></li> : null}
                        </ul>
                    </div>
                    : null
                }

            </div>
        );
    }
}
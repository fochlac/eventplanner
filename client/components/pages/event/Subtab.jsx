import React from 'react';
import { Link } from 'react-router-dom';
import Tasklist from '../../ui/Tasklist.js';
import Piechart from '../../ui/PiePoll.js';

export default class Post extends React.Component {
  constructor(props) {
    super();

    this.state = {
      taskExpanded: -1,
      pollExpanded: -1
    }
  }

  expand(type, id) {

    this.setState({[type + 'Expanded']: id});
  }

  renderFile(fileId) {
    let file = this.props.options.files[fileId];

    return (
      <li className="subtabRow" key={'file' + file.id}>
        <i className="fa fa-file"></i>
        <Link to={'/file/' + file.id} className="fileLink"><h4 className={'actionCursor' + (file.virgin ? ' virgin' : '')}>{file.name}</h4></Link>
        <a href={file.url} download className="push-right">
          <i className="fa-download fa"></i>
        </a>
      </li>
    );
  }


  renderPoll(id) {
    let poll = this.props.options.polls[id];

    return (
      <li className="subtabCol" key={'poll' + poll.id}>
        <div className="flexrow head">
          <i className="fa fa-pie-chart"></i>
          <Link to={'/poll/' + poll.id} className="fileLink"><p className={'actionCursor' + (poll.virgin ? ' virgin' : '')}>{poll.name}</p></Link>
          {
            (this.state.pollExpanded !== poll.id)
            ? <i className="fa fa-caret-down fa-lg push-right pointer" onClick={() => this.expand('poll', poll.id)}></i>
            : <i className="fa fa-caret-up fa-lg push-right pointer" onClick={() => this.expand('poll', -1)}></i>
          }
        </div>
          {
            (this.state.pollExpanded === poll.id)
            ? <Piechart id={poll.id} />
            : null
          }
      </li>
    );
  }

  render() {
    const evt = this.props.options.event;

    switch(this.props.type) {
      case 'tasks':
        return (
          <ul className="subtabContent">
            {
              evt.tasks.map(taskId => {
                let task = this.props.options.tasks[taskId],
                  subelements = task.files.length + task.polls.length + task.tasks.length;

                return (
                  <li className="subtabCol" key={task.id}>
                    <div className="head">
                      <Link to={'/task/' + task.id} className={task.virgin ? 'virgin' : ''}>{task.name}</Link>
                      {
                        (!subelements)
                        ? null
                        : (this.state.taskExpanded !== task.id)
                          ? <i className="fa fa-caret-down fa-lg push-right pointer" onClick={() => this.expand('task', task.id)}></i>
                          : <i className="fa fa-caret-up fa-lg push-right pointer" onClick={() => this.expand('task', -1)}></i>
                      }
                    </div>
                    {
                      (this.state.taskExpanded === task.id)
                      ? <Tasklist taskId={task.id} />
                      : null
                    }
                  </li>
                )
              })
            }
          </ul>
        )
      case 'files':
        let subtaskFiles = evt.tasks.map(id => this.props.options.tasks[id]).filter(task => task.files.length);

        return(
          <ul className="subtabContent">
            {
              evt.files.map(this.renderFile.bind(this))
            }
            {
              subtaskFiles.map(task => [
                (<li className="head subtabRow" key={'task' + task.id}>
                  <p>{task.name}</p>
                </li>),
                ...task.files.map(this.renderFile.bind(this))
              ])
            }
          </ul>
        )
      case 'polls':
        let subtaskPolls = evt.tasks.map(id => this.props.options.tasks[id]).filter(task => task.polls.length);

        return(
          <ul className="subtabContent">
            {
              evt.polls.map(id => this.renderPoll(id))
            }
            {
              subtaskPolls.map(task => [
                (<li className="head subtabRow" key={'task' + task.id}>
                  <p>{task.name}</p>
                </li>),
                ...task.polls.map(this.renderPoll.bind(this))
              ])
            }
          </ul>
        )
    }

    return null;
  }
}
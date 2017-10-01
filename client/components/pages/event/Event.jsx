import React from 'react';
import {Link} from 'react-router-dom';
import Post from '../../ui/Post.js';
import Notifications from '../../ui/Notifications.js';
import ParticipationBar from '../../ui/ParticipationBar.js';
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
    const evt = this.props.events[this.props.id],
      now = Date.now();

    if (!evt) {
      return  <Redirect to="/"/>;
    }

    return (
      <div className="event">
        <div className="eventHeader">
          <div className="row">
            <div className="col"></div>
            <div className="col"></div>
          </div>
          <ParticipationBar eventId={this.props.id} />
        </div>
        <div className="eventBody">
          
        </div>
      </div>
    );
  }
}
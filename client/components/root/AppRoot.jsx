import React from 'react';
import {
      BrowserRouter as Router,
      Route,
      Redirect,
      Switch
    } from 'react-router-dom';

import Login from '../pages/Login.jsx';
import DefaultPage from '../root/DefaultPage.jsx';
import Dashboard from '../pages/Dashboard.js';
import Notification from '../pages/Notification.js';
import Poll from '../pages/Poll.js';
import Task from '../pages/Task.js';
import Event from '../pages/Event.js';
import Chats from '../pages/Chats.js';
import './BaseStyle.less';

export default class App extends React.Component {
    constructor(props) {
        super();

        this.state = {
        }
    }

    getFilters(location) {
        const match = location.search.match(/filter=([^&]*)/g);

        return match ? match.map(match => match.replace('filter=', '')) : [];
    }

    render() {
        return (<Router>
                {!this.props.login
                    ?
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Login} />
                        <Redirect to="/login" />
                    </Switch>
                    :
                    <Switch>
                        {!this.props.login ? <Redirect to="/login" /> : null}
                        <Route exact path="/" render={() => <DefaultPage><Dashboard/></DefaultPage>} />
                        <Route exact path="/notification/:id" render={({match}) => <DefaultPage><Notification id={match.params.id}/></DefaultPage>} />
                        <Route exact path="/poll/:id" render={({match}) => <DefaultPage><Poll id={match.params.id}/></DefaultPage>} />
                        <Route exact path="/task/:id" render={({match, location}) => <DefaultPage><Task id={match.params.id} filters={this.getFilters(location)}/></DefaultPage>} />
                        <Route exact path="/event/:id" render={({match, location}) => <DefaultPage><Event id={match.params.id} /></DefaultPage>} />
                        <Route exact path="/chats/:id" render={({match, location}) => <DefaultPage><Chats id={match.params.id} /></DefaultPage>} />
                        <Route exact path="/chats" render={({match, location}) => <DefaultPage><Chats id={false} /></DefaultPage>} />
                        <Redirect to="/" />
                    </Switch>
                }
        </Router>)
    }
}
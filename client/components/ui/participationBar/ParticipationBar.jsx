import React from 'react';
import { Link } from 'react-router-dom';
import './ParticipationBar.less';

export default class ParticipationBar extends React.Component {
    constructor(props) {
        super();

        this.state = {
            showMenu: false
        }
    }

    toggleMenu(state) {
        this.setState({showMenu: (state !== undefined) ? state : !this.state.showMenu});
    }

    render() {
        const now = Date.now(),
            urgentEvents = 0;

        return (
            <div className="participationBar">

            </div>
        );
    }
}

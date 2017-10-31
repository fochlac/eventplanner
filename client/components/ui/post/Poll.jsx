import React from 'react';
import { Link } from 'react-router-dom';
import ProfileImage from '../ProfileImage.js';

export default class Poll extends React.Component {
    constructor(props) {
        super();

        this.state = {
            contentMaxLength: 100
        }
    }

    render() {
        const poll = this.props.poll,
            voteCount = poll.users.length,
            voted = poll.users.includes(this.props.userId);

        return (
            <div className="tinyPoll">
                <div className="pollHead">
                    <Link to={'/poll/' + this.props.id}><h3>{(!voted ? 'Neue Umfrage: ' : '') + poll.name}</h3></Link>
                    {
                        (poll.description && poll.description.length)
                        ? <span>{poll.description.slice(0, (this.state.showAll ? undefined : this.state.contentMaxLength))}</span>
                        : null
                    }
                    {
                        (poll.description && poll.description.length > this.state.contentMaxLength && !this.state.showAll)
                        ? <a className="expander inline" onClick={() => this.showAll()}>Mehr ...</a>
                        : null
                    }
                </div>
                {
                    voted || poll.showResults
                    ? <table className="pollBody">
                        <tbody>
                            {poll.options.map((option, index) => {
                                return (
                                    <tr key={index} className="pollListItem">
                                        <td>
                                            <h5 className="inlineBlock">{option.name}</h5>
                                        </td>
                                        <td className="resultWrapper">
                                            <span className="resultBar" style={{width: 'calc(' + Math.floor(option.users.length / voteCount * 100) + '% - 20px)'}} ></span>
                                            {
                                                option.users.length
                                                ? <span className="resultValue" data-users={option.users.map(id => this.props.users[id].name).join('\n')}>{option.users.length}</span>
                                                : null
                                            }
                                            {
                                                option.users.length && option.users.includes(this.props.userId)
                                                ? <span className="votingMarker">
                                                    <ProfileImage />
                                                </span>
                                                : null
                                            }
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    : null
                }
            </div>
        );
    }
}
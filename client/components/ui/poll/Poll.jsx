import React from 'react';
import { Link } from 'react-router-dom';
import './poll.less';

export default class Post extends React.Component {
    constructor(props) {
        super();

        this.state = {
            showAll: false,
            contentMaxLength: 100,
            showAllOptions: false,
            selectedOptions: props.poll.options.reduce((acc, option, index) => {
                if (option.users.includes(props.user.id)) {
                    acc.push(index)
                }
                return acc;
            }, []),
            showResults: props.voted || props.poll.showResults,
            editable: !props.voted && props.poll.active
        }
    }

    showAll() {
        this.setState({showAll: true});
    }

    toggleSelection(index, checked) {
        let newArr, arrIndex;
        if (this.props.poll.multiple) {
            newArr = this.state.selectedOptions.concat([]);
            arrIndex = newArr.indexOf(index);

            if (checked) {
                newArr.push(index);
            } else if (arrIndex === -1) {
                return;
            } else {
                newArr.splice(arrIndex, 1)
            }
            this.setState({selectedOptions: newArr});
        } else {
            this.setState({selectedOptions: [index]})
        }
    }

    showResults() {
        this.setState({showResults: true});
        this.props.showPollResults();
    }

    submit() {
        if (this.state.selectedOptions.length === 0) {
            return;
        }
        this.setState({voting: true});
        this.props.addVotes(this.props.pollId, this.state.selection);
    }

    editResults() {
        if (this.state.selectedOptions.length === 0) {
            return;
        }
        this.setState({voting: true});
        this.props.editVotes(this.props.pollId, this.state.selection);
    }

    render() {
        const poll = this.props.poll;
        return (
            <div className="poll">
                <div className="pollHead">
                    <Link to={'/poll/' + this.props.id}><h3>{poll.title}</h3></Link>
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
                <ul className="pollBody">
                    {
                        poll.options.map((option, index) => {
                            return (
                                <li key={index} className="pollListItem">
                                    <input onClick={evt => this.toggleSelection(index, evt.target.checked)} type={poll.multiple ? 'checkbox' : 'radio'} name={'pollVotes' + this.props.pollId} id={this.props.pollId + '-option-' + index} checked={option.users.includes(this.props.user.id) ? 'checked' : null} disabled={this.state.editable ? null : 'disabled'}/>
                                    <label htmlFor={this.props.pollId + '-option-' + index}>
                                        <h5 className="inlineBlock">{option.title}</h5>
                                    </label>
                                    {
                                        (this.state.showResults)
                                        ? (<div className="resultWrapper">
                                                <span className="resultBar" style={{width: 'calc(' + Math.floor(option.users.length / this.props.voteCount * 90) + '% - 20px)'}} ></span>
                                                {
                                                    option.users.length
                                                    ? <span className="resultValue" data-users={option.users.map(id => this.props.users[id].name).join('\n')}>{option.users.length}</span>
                                                    : null
                                                }
                                            </div>)
                                        : null
                                    }
                                </li>
                            )
                        })
                    }
                </ul>
                <div className="pollFooter">
                    {
                        (!this.state.showResults && poll.allowDisplayResults)
                        ? <button onClick={() => this.showResults()} >Ergebnis anzeigen</button>
                        : null
                    }
                    {
                        (poll.voted && poll.allowEditResults)
                        ? <button onClick={() => this.editResults()} >Auswahl ändern</button>
                        : null
                    }
                    {
                        (!this.props.voted || this.state.voting)
                        ? <button onClick={() => this.submit()} >Abschicken</button>
                        : null
                    }
                </div>
            </div>
        )
    }
}
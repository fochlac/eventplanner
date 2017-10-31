import React from 'react';
import './PiePoll.less';
import Piechart from '../../snippets/Piechart.jsx';

export default class PiePoll extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        const poll = this.props.poll,
            colors = ['#c40002', '#f9d239', '#17380b', '#ddd'],
            sortedOptions = poll.options.sort((a,b) => b.users.length - a.users.length),
            data = sortedOptions.reduce((acc, opt, index) => {
                if (index < 3) {
                    opt.color = colors[index];
                    opt.value = opt.users.length;
                    acc.push(opt);
                } else {
                    if (acc[3]) {
                        acc[3].value += opt.users.length;
                    } else {
                        acc[3] = {
                            color: colors[3],
                            value: opt.users.length
                        };
                    }
                }
                return acc;
            }, []),
            total = data.reduce((acc, entry) => acc + entry.value, 0);

        return (
            <div className="piechart">
                <Piechart data={data} options={{size: (data.length > 2) ? 75 : 50}} />
                <ul className="legend">
                    {
                        data.map((opt, index) => <li key={index}><i className="fa fa-square" style={{color: colors[index]}}></i>{((index !== 3) ? opt.name : 'Rest') + ' (' + opt.value + ' von ' + total + ' Stimmen)'}</li>)
                    }
                </ul>
            </div>
        );
    }
}
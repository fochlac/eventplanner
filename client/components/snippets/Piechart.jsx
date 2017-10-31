import React from 'react';

export default class Piechart extends React.Component {
    constructor(props) {
        super();
        this.state = {
            sum: props.data.reduce((acc, entry) => acc + entry.value, 0),
            circ: Math.ceil(props.options.size / 2 * Math.PI),
        }
        this.h = Math.random()
        // props:
        // data: [{color, value}]
        // options: {size, background}
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            sum: nextProps.data.reduce((acc, entry) => acc + entry.value, 0),
            circ: Math.ceil(nextProps.options.size / 2 * Math.PI)
        });
    }

    getColor() {
        let r, g, b, i, f, p, q, t,
            s = 0.5,
            v = 0.95;

        this.h += 0.618033988749895;
        this.h %= 1;

        i = Math.floor(this.h * 6);
        f = this.h * 6 - i;
        p = v * (1 - s);
        q = v * (1 - f * s);
        t = v * (1 - (1 - f) * s);

        switch (i % 6) {
            case 0: r = v, g = t, b = p; break;
            case 1: r = q, g = v, b = p; break;
            case 2: r = p, g = v, b = t; break;
            case 3: r = p, g = q, b = v; break;
            case 4: r = t, g = p, b = v; break;
            case 5: r = v, g = p, b = q; break;
        }

      return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
    }


    render() {
        const data = this.props.data,
            opts = this.props.options,
            total = data.reduce((acc, entry) => acc + entry.value, 0);

        let currentSum = 0;

        return (<svg className="chart" width={opts.size} height={opts.size} style={{'borderRadius': '50%', 'transform': 'rotate(-90deg)', 'minHeight': opts.size + 'px', 'minWidth': opts.size + 'px'}}>
            {
                data.map((entry, index) => {
                    currentSum += entry.value;

                    return (<circle
                        key={index}
                        className="pie"
                        r={opts.size / 4}
                        cx={opts.size / 2}
                        cy={opts.size / 2}
                        style={{
                            'stroke': (entry.color ? entry.color : this.getColor()),
                            'strokeWidth': opts.size/2,
                            'fill': 'transparent',
                            'strokeDasharray': (currentSum / this.state.sum * this.state.circ) + ' ' + this.state.circ
                        }}></circle>);
                }).reverse()
            }
        </svg>);
    }
}
import React from 'react';
import Post from '../../ui/Post.js';


export default class Login extends React.Component {
    constructor(props) {
        super();
    }

    componentDidMount() {
        this.props.markItemsSeen();
    }
    shouldComponentUpdate(nextProps) {
        const oldItems = this.props.options.items,
            newItems = nextProps.options.items;

        return !(
            oldItems.length === newItems.length
            && oldItems.map(item => item.id+item.type).toString() === newItems.map(item => item.id+item.type).toString()
        );
    }

    componentDidUpdate() {
        this.props.markItemsSeen();
    }

    menu() {
        return {
          items: [{
            title: 'Beitrag verbergen',
            action: () => this.hidePost(),
            symbol: 'fa-eye-slash'
          }]
        };
  }

    render() {
        return (
            <div className="dashboard">
                {this.props.options.items.map((item, index) =>
                    <Post key={index} id={item.id} type={item.type} options={{menu: this.menu()}} />
                )}
            </div>
        );
    }
}
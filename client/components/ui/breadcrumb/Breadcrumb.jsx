import React from 'react';
import { Link } from 'react-router-dom';
import './breadcrumb.less';

export default class Breadcrumb extends React.Component {
    constructor(props) {
        super();
    }

    render() {

        return (
            <span className="breadcump">
                {
                    this.props.breadcrumb.map((crumb, index) => <Link className={(index < this.props.breadcrumb.length - 1) ? 'insertSpacer' : ''} key={index} to={crumb.url}>{crumb.name}</Link>)
                }
            </span>
        );
    }
}
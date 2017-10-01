import React from 'react';

export default class ProfileImage extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        const user = this.props.user;

        if (user.profileImage) {
            return (<div className="imageWrapper profileImage">
                <img src="this.props.user.profileImage " title={user.name} />
            </div>);

        } else {
            return (<div title={user.name}>
                    <span className="fa-stack">
                        <i className="fa fa-circle fa-stack-2x"></i>
                        <i className="fa fa-user fa-stack-1x fa-inverse"></i>
                    </span>
                </div>);
        }
    }
}
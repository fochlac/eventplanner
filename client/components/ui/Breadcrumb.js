import React from 'react';
import { connect } from 'react-redux';
import Breadcrumb from './breadcrumb/Breadcrumb.jsx';


const mapStateToProps = (state, ownProps) => {
	let item = ownProps, 
		breadcrumb = [],
		obj;

	while (item.parent) {
		obj = state[item.parent.type + 's'][item.parent.id];
		breadcrumb.push({
			url: `/${item.parent.type}/${item.parent.id}`,
			name: obj.name
		});
		item = obj;
	}

    return {
        breadcrumb: breadcrumb.reverse()
    };
};

export default connect(mapStateToProps, {})(Breadcrumb);
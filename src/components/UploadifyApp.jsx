var React = require('react');

module.exports = React.createClass({
	render: function() {
		return (
			<div>
				<a href="/">
					<h1>UploadifyApp</h1>
				</a>
				{this.props.children}
			</div>
		);
	}
});
var React = require('react');
var ReactDOM = require('react-dom');
var store = require('../../js/store');
var dispatcher = require('../../js/dispatcher');

module.exports = React.createClass({

	_postComment: function() {
		console.log(this.refs.commentInput.value);
		dispatcher.dispatch('postComment', { imageId: this.props.params.imageId, comment: this.refs.commentInput.value });
	},

	getInitialState: function() {
		return {
			images: []
		};
	},

	componentDidMount: function() {
		var that = this;

		store.imagesDataProperty
		    .takeWhile(this.isMounted.bind(this))
			.onValue(function(data) {
				that.setState({
					images: data
				});
			});
	},

	render: function() {

		var currentImageId = this.props.params.imageId;
		var currentImage = _.find(this.state.images, { imageId: currentImageId });
		console.log(currentImage);


		if (!currentImage) {
			return (
				<div></div>
			);
		} else return (
			<div>
				<img src={'/uploads/' + currentImage.filename} />
					<p>
						Share this link: <input type="text"  readOnly={true} name="link" size={document.location.href.length} value={document.location.href} />
					</p>
				<div>
					<h2> Comments </h2>
					<input ref="commentInput" type="text" name="Post comment" />
					<input type="button" value="Submit" onClick={this._postComment} />
					{
						_.map(currentImage.comments, function(comment, index) {
							return (
								<p key={index}>{comment}</p>
							);
						})
					}
				</div>
			</div>
		);
	}
})
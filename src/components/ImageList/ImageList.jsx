var React = require('react');
var _ = require('lodash');
var store = require('../../js/store');
module.exports = React.createClass({

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
		var images = this.state.images;
		console.log(images);
		return (
			<div>
				<div>
					<a href="/#/home/upload">
						<button className="upload">Upload</button>
					</a>
				</div>
				<div>
					<h2>All images</h2>
					{
						_.map(images, function(image, index) {
							return (
								<div key={index} className="img">
									<a href={"/#/home/image/" + image.imageId}>
										<img src={"/uploads/" + image.filename} />
									</a>
								</div>
							);
						})
					}
				</div>
			</div>
		);
	}
});
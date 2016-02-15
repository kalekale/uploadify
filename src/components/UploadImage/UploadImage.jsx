var React = require('react');
var $ = require('jquery');
module.exports = React.createClass({

	getInitialState: function() {
	    return {
	      data_uri: null,
	    };
	  },

	  handleSubmit: function(e) {
	    e.preventDefault();
	  },

	  handleFile: function(e) {
	    var self = this;
	    var reader = new FileReader();
	    var file = e.target.files[0];

	    reader.onload = function(upload) {
	      self.setState({
	        data_uri: upload.target.result,
	      });
	    }

	    reader.readAsDataURL(file);
	  },


	render: function() {
		return (
			<div>
				<form action="/api/images/upload"
					  method="POST"
					  encType="multipart/form-data">
					<input type="file" name="newImage" onChange={this.handleFile} />
					{ this.state.data_uri ? <input type="submit" value="Upload Image" /> : null }
				</form>
				<div className="preview-img">
					<img src={this.state.data_uri} />
				</div>
			</div>
		);
	}
})
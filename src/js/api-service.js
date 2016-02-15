var _ = require('lodash');
var $ = require('jquery');

function getImages() {
	return $.getJSON('/api/images');
}

function addComment(data) {
	console.log('data', data);
	return $.ajax({
  		type: "POST",
  		url: '/api/images/comment/' + data.imageId,
  		data: JSON.stringify({
  			comment: data.comment,
  		}),
  		contentType: 'application/json'
	});
}

module.exports = {
	getImages: getImages,
	addComment: addComment
};
var Bacon = require('baconjs');
var _ = require('lodash');
var apiService = require('./api-service');
var dispatcher = require('./dispatcher');

var rawImagesDataProperty = Bacon.fromPromise(apiService.getImages()).toProperty();

var imagesDataProperty = dispatcher.actionStreamByAction('postComment')
    .map('.data')
	.flatMapLatest(function(data) {
		return Bacon.fromPromise(apiService.addComment(data));
	})
	.flatMapLatest(function() {
		return Bacon.fromPromise(apiService.getImages());
	})
	.merge(rawImagesDataProperty.changes().take(1))
	.toProperty();

imagesDataProperty.onValue();

module.exports = {
	imagesDataProperty: imagesDataProperty
};
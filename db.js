var Promise = require('bluebird');
var mongojs = require('mongojs');

var db = mongojs('mongodb://localhost:27017/uploadify', ['images']);
Promise.promisifyAll(db['images']);

module.exports = db;
var React = require('react');
var ReactDOM =require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var hashHistory = require('react-router').hashHistory;
var Redirect = require('react-router').Redirect;
var IndexRoute = require('react-router').IndexRoute;

var UploadifyApp = require('../components/UploadifyApp.jsx');
var ImageList = require('../components/ImageList/ImageList.jsx');
var ImageView = require('../components/ImageView/ImageView.jsx');
var UploadImage = require('../components/UploadImage/UploadImage.jsx');

var routes = (
		  		<Router history={hashHistory}>
		  		<Redirect from='/' to='/home' />
    				<Route path="/home" component={UploadifyApp}>
    					<IndexRoute component={ImageList} />
    					<Route path='/home/upload' component={UploadImage} />
    					<Route path='/home/image/:imageId' component={ImageView} />
    				</Route>
  		  		</Router>
	);

ReactDOM.render(routes, document.getElementById('app'));


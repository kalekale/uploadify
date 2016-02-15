var Bacon = require('baconjs');

var actionStream = new Bacon.Bus();

function dispatch(action, data) {
	actionStream.push({ action: action,
						data: data });
}

function actionStreamByAction(actionName) {
	return actionStream.filter(function(event) {
		return event.action === actionName;
	});
}

module.exports = {
	actionStreamByAction: actionStreamByAction,
	dispatch: dispatch
};
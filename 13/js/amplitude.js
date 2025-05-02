var _lastRequestNumber = 0;
var _currentRequestNumber = 0;
var parser;
var result;
var basedEventProperty;
var errorProperty;
var deviceProperty;
var progressProperty;
var normalProperty;
var indexedDB_Available;

function sendEventWithUserProperties(eventName, eventProperty, userProperties) {
	console.log("sendEventWithUserProperties: " + eventName);
	var requestNumber = _currentRequestNumber++;
	sendEventLogic(eventName, requestNumber, eventProperty, userProperties);
}

function sendEvent(eventName, eventProperty) {
	console.log("sendEvent: " + eventName);
	var requestNumber = _currentRequestNumber++;
	sendEventLogic(eventName, requestNumber, eventProperty);
}

function sendEventLogic(eventName, requestNumber, eventProperty, userProperties){
	if (clientId !== "") {
		if (_lastRequestNumber !== requestNumber){
			setTimeout(function() {
				sendEventLogic(eventName, requestNumber, eventProperty, userProperties);
			}, 100);
		} else {
			var myBody =
				{
					"events":[
						{
							"user_properties": userProperties || {},
							"event_properties": eventProperty || {},
							"session_id": currentSessionId,
							"user_id": clientId,
							"app_version": app_version,
							"platform":"HTML",
							"event_type": eventName,
						}
					]
				}

			fetch('https://better-space-api.herokuapp.com/api/game/httpApi', {
				method: 'POST',
				headers: {
					'Accept': '*/*',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(myBody)
			})
				.then(response => _lastRequestNumber++)
				.then(response => console.log("event successfully sent: " + eventName));
			//.then(response => response.json())
			//.then(response => console.log(JSON.stringify(response)));
		}
	}

	else {
		setTimeout(function() {
			sendEventLogic(eventName, requestNumber, eventProperty, userProperties);
		}, 100);
	}
}

function initializeBasedEventProperty() {
	parser = new UAParser(navigator.userAgent);
	result = parser.getResult();
	console.log("Result: " + result);

	return {
		"Link_Open": window.location.href,
		"Browser": result && result.browser ? result.browser.name : "unknown",
		"Browser_Version": result && result.browser ? result.browser.version : "unknown",
		"Operating_System": result && result.os ? result.os.name : "unknown",
		"Operating_System_Version": result && result.os ? result.os.version : "unknown",
		"WebGL_Available": !!(window.WebGLRenderingContext && (document.createElement("canvas").getContext("webgl") || document.createElement("canvas").getContext("experimental-webgl"))),
		"WebGL_Version": (document.createElement("canvas").getContext("webgl2") !== null) ? 'WebGL2' : 'WebGL1',
		"IndexedDB_Available": indexedDB_Available,
		"DeviceType": deviceProperty,
		"is_mobile": checkIfMobile(),
	};
}

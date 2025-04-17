// const channel = new BroadcastChannel('app-data');
// var eventListeners = [];

// function signWithDiscord(redirectUri, callback){
// 	removeEventListener();
	
// 	const eventListener = event => {
// 		channel.removeEventListener('message', eventListener); 
// 		callback(event.data);
//     };
	
// 	this.eventListeners.push(eventListener); 
// 	channel.addEventListener ('message', eventListener);

// 	var uri = "https://discord.com/api/oauth2/authorize?client_id=1092513317169414235&redirect_uri=" + redirectUri + "&response_type=code&scope=identify%20guilds%20email";
// 	var disc_window = window.open(uri);
// }

// function authWithDiscord(){
// 	removeEventListener();
	
// 	const eventListener = event => {
// 		channel.removeEventListener('message', eventListener); 
//     };
	
// 	this.eventListeners.push(eventListener); 
// 	channel.addEventListener ('message', eventListener);
	
// 	var port = window.location.port;
// 	var port_string = port ? "%3A" + port : "";
// 	var redirect_uri = "http%3A%2F%2F" + window.location.hostname + port_string  +"%2Fdiscord_wait.html";
// 	var uri = "https://discord.com/api/oauth2/authorize?client_id=1092513317169414235&redirect_uri=" + redirect_uri + "&response_type=code&scope=identify%20guilds%20email";
// 	var disc_window = window.open(uri);
// }

// function removeEventListener() {
//   // Iterate through all stored event listeners to remove them
//   this.eventListeners.forEach((listener) => {
//       channel.removeEventListener('message', listener); 
//   });
//   // Do not forget to clear listeners array
//   this.eventListeners = [];
// }


//const channel = new BroadcastChannel('app-data');
var eventListeners = [];

function signWithDiscord(redirectUri, callback){
	removeEventListeners();
	
	const eventListener = event => {
		console.log(event.origin);
		console.log(event.data);
		if (!event.origin.includes('megamod.io'))
			return;

		try {
			const obj = JSON.parse(event.data);
			if (obj.actionType === 'discord_code'){
					callback(obj.code);
					window.removeEventListener('message', eventListener);
			}
		}
		catch (ex) {

		}
		//channel.removeEventListener('message', eventListener);
		// // Перевіряємо, чи походить подія від потрібної вкладки
		// if (event.origin === "https://domain.com") {
		//   // Обробляємо отримані дані
		//   console.log("Отримано дані від другої вкладки:", event.data);
		// }
		
    };
	
	this.eventListeners.push(eventListener); 
	//channel.addEventListener ('message', eventListener);

	// Слухаємо подію message
	window.addEventListener('message', eventListener);

	var uri = "https://discord.com/api/oauth2/authorize?client_id=1092513317169414235&redirect_uri=" + redirectUri + "&response_type=code&scope=identify%20guilds%20email";
	var disc_window = window.open(uri);
	console.log(disc_window);
}

// function authWithDiscord(){
// 	removeEventListener();
	
// 	const eventListener = event => {
// 		channel.removeEventListener('message', eventListener); 
//     };
	
// 	this.eventListeners.push(eventListener); 
// 	channel.addEventListener ('message', eventListener);
	
// 	var port = window.location.port;
// 	var port_string = port ? "%3A" + port : "";
// 	var redirect_uri = "http%3A%2F%2F" + window.location.hostname + port_string  +"%2Fdiscord_wait.html";
// 	var uri = "https://discord.com/api/oauth2/authorize?client_id=1092513317169414235&redirect_uri=" + redirect_uri + "&response_type=code&scope=identify%20guilds%20email";
// 	var disc_window = window.open(uri);
// }

function removeEventListeners() {
  // Iterate through all stored event listeners to remove them
  this.eventListeners.forEach((listener) => {
      window.removeEventListener('message', listener); 
  });
  // Do not forget to clear listeners array
  this.eventListeners = [];
}

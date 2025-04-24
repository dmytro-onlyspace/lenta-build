// const channel = new BroadcastChannel('app-data');
// var code = GetCode();
// channel.postMessage(code);
// window.close();

// function GetCode(){
// 	const params = new URLSearchParams(window.location.search);
// 	if (params.has("code")){
// 		return params.get("code");
// 	}
// 	return null;
// }



//const channel = new BroadcastChannel('app-data');
var discordCode = GetCode();
const data = 
{
	code: discordCode,
	actionType: "discord_code",
};
//channel.postMessage(code);

const openerTab = window.opener;
console.log(openerTab);

if (openerTab && !openerTab.closed) {// && openerTab.location.href === "https://subdomain.domain.com") {
  openerTab.postMessage(JSON.stringify(data));//, "https://subdomain.domain.com");
}

//window.close();

function GetCode(){
	const params = new URLSearchParams(window.location.search);
	if (params.has("code")){
		return params.get("code");
	}
	return null;
}

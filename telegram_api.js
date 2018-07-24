var telegram = require('telegram-bot-api');
var util = require('util');

var api = new telegram({
	token: '677533469:AAHiQzexNX2SUcQzppc1Tgh1KLxVvQKUz_4'
});

api.sendMessage({
	chat_id: 5547999570957,
	text: 'This is my kind message to you'
})
.then(function(data)
{
	console.log(util.inspect(data, false, null));
})
.catch(function(err)
{
	console.log(err);
});

// {
// 	token: '123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11',
// 	http_proxy: {
// 		host: 'proxy.example.com',
// 		port: 8080,
// 		username: 'mylogin',
// 		password: 'mypassword'
// 	},
// 	updates: {
// 		enabled: true,
// 		get_interval: 2000
// 	}
// }

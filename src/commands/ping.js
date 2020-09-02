module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(message, args, client) {
		message.channel.send('Pong! Tu ping es de `' + client.ws.ping + ' ms`');
	},
};
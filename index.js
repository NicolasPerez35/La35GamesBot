const fs = require('fs');
const Discord = require('discord.js');


const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

const config = require('./src/json/config.json');

client.once('ready', () => {
    console.log('Bot encenido');
});


for (const file of commandFiles) {
    const command = require(`./src/commands/${file}`);
    client.commands.set(command.name, command);
}


client.on('message', message => {

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);

    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    if (command.args && !args.length) {
        return message.channel.send(`No pusiste los argumentos necesarios, ${message.author}!`);
    }

    try {
        command.execute(message, args, client);
    } catch (error) {
        console.error(error);
        message.reply('error al ejecutar ese comando!');
    }


});

client.login(config.token);